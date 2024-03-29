import path from "path"

/////////////////////
// Set of utilities for working with mdast in remark plugins, in particular creation of the new rather complex jsx node types

/**
 * Returns either a plain text value or an identifier in estree format if the val name starts with '@'. This is to simplify
 * creation of elements where some attributes are text and some are identifiers, eg:
 *
 *    <img src={myimg} alt="alt text"/>
 *
 * In this example, myimg is an identifier and "alt text" is a plain text attribute, so you would pass "@myimg" to get the desired result.
 *
 * @param val The identifier or plain text value. Identifiers should be of the form "@<name>"
 * @returns node Either the simple string or full mdxJsxAttributeValueExpression node
 */
function createValue(val) {
    if (!val.startsWith("@")) {
        return val
    }
    const symbol = val.substr(1)
    return {
        type: "mdxJsxAttributeValueExpression",
        value: symbol,
        data: {
            estree: {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: symbol
                        }
                    }
                ],
                sourceType: "module"
            }
        }
    }
}

/**
 * Create a jsx node
 * @param name Element name
 * @param attributes Name/value pairs, where value can be plain string or identifier (see above)
 * @returns
 */
export function createElement(name, attributes = {}, children = []) {
    return {
        type: "mdxJsxFlowElement",
        name,
        children,
        attributes: Object.entries(attributes).map(([name, value]) => ({
            type: "mdxJsxAttribute",
            name,
            value: createValue(value)
        }))
    }
}

/**
 * Create an import
 *
 * @param name Identifier that can be used later in the jsx
 * @param value The literal path to import from
 * @returns node The full mdxjsEsm node for the import
 */
export function createImport(name, value, localName) {
    return {
        type: "mdxjsEsm",
        value: localName ? `import {${name} as ${localName} from "${value}"` : `import ${name} from "${value}"`,
        data: {
            estree: {
                sourceType: "module",
                type: "Program",
                body: [
                    {
                        type: "ImportDeclaration",
                        specifiers: [
                            {
                                type: localName ? "ImportSpecifier" : "ImportDefaultSpecifier",
                                imported: localName ? {
                                    type: "Identifier",
                                    name
                                } : undefined,
                                local: {
                                    type: "Identifier",
                                    name: localName || name
                                }
                            }
                        ],
                        source: {
                            type: "Literal",
                            value,
                            raw: `"${value}"`
                        }
                    }
                ]
            }
        }
    }
}

/**
 * Create one or more exports
 * @param nvps Name/value pairs
 * @returns node The full mdxjsEsm node containing the exports
 */
export function createExports(nvps) {
    return {
        type: "mdxjsEsm",
        data: {
            estree: {
                sourceType: "module",
                type: "Program",
                body: nvps.map(({name, value}) => ({
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name
                                },
                                init: {
                                    type: "Literal",
                                    value: value
                                }
                            }
                        ],
                        kind: "const"
                    },
                    specifiers: []
                }))
            }
        }
    }
}

/**
 * A utility function that can handle promises generated by handling nodes in the MDX tree and then process them after the
 * tree has been fully "visited". This is partly here because the visit util isn't async...
 *
 * @param prefix
 * @param sourcePath
 * @returns object Object containing methods that can be called
 */
export function handler(prefix, sourcePath) {
    function format_error(error, line) {
        // remove stack trace and indent the cause message
        const message = error.message
            .split(" at ")[0]
            .split("\n")
            .filter(line => line.trim().length)
            .map(line => "    " + line)
            .join("\n")
        const rel = path.relative(process.cwd(), sourcePath)
        // should appear with hyperlink in jetbrains console
        return `${prefix} error:\n${message}\nat ${rel}:${line}\n`
    }

    const promises = []

    return {
        img(node, parent, index, promise) {
            promises.push(
                promise
                    .then(({unique, relative}) => {
                        // result of the promise on success
                        return {
                            parent,
                            index,
                            replace: createElement("img", {
                                className: "bg-light",
                                src: `@${prefix}_${unique}`,
                                alt: `${prefix}-image`
                            }),
                            import: createImport(`${prefix}_${unique}`, relative)
                        }
                    })
                    .catch(error => {
                        // result of the promise on error (includes line number of source)
                        return {error, line: node.position.start.line}
                    })
            )
        },
        component(node, parent, index, promise, wrapperClass = undefined) {
            promises.push(
                promise
                    .then(({unique, relative}) => {
                        // default without wrapper
                        let componentElement = createElement(`${prefix}_${unique}`)
                        if (wrapperClass) {
                            componentElement = createElement(
                                "div",
                                {
                                    className: wrapperClass
                                },
                                [componentElement] // add actual component as child of wrapper
                            )
                        }
                        return {
                            parent,
                            index,
                            insert: componentElement,
                            import: createImport(`${prefix}_${unique}`, relative)
                        }
                    })
                    .catch(error => {
                        // result of the promise on error (includes line number of source)
                        return {error, line: node.position.start.line}
                    })
            )
        },
        async finalize(tree) {
            const result = await Promise.all(promises)

            const success = result.filter(r => !r.error) // get the successful renders
            const imports = success.map(r => r.import) // gather imports

            // keep a count of the inserts done per parent to avoid insert 'drift'
            const insert_counts = Object.fromEntries(success.map(({parent}) => [parent, 0]))

            for (const {parent, index, replace, insert} of success) {
                if (replace) {
                    parent.children[index + insert_counts[parent]] = replace // mutate the nodes
                } else {
                    // must be insert
                    parent.children.splice(index + insert_counts[parent], 0, insert)
                    insert_counts[parent]++
                }
            }

            // report any errors
            const errors = result.map(({error, line}) => error && {error, line}).filter(r => r) // get index of error and filter successes
            for (const {error, line} of errors) {
                console.log(format_error(error, line))
            }

            // insert the imports
            tree.children.splice(0, 0, ...imports)

            return tree
        }
    }
}
