/**
 * Remark plugin to find mermaid codeblocks and invoke mermaid using puppeteer.
 *
 * Heavily based on https://github.com/mermaidjs/mermaid.cli/blob/master/index.js
 *
 * The goal is to run processing async and report meaningful errors when there are issues with the markup
 *
 */
import {visit} from "unist-util-visit"
import path, {resolve} from "path"
import crypto from "crypto";
import fs from "fs";
import puppeteer from "puppeteer";

// puppeteer seems to set a load of listeners on process, so increase the limit
process.setMaxListeners(100)

const OUTDIR = ".cache/mermaid";
const PLUGIN_NAME = 'remark-mermaid';

function format_error(file, error, line) {
    // remove stack trace and indent the mermaid message
    const mermaid_message = error.message.split(" at ")[0].split("\n").filter(line => line.trim().length).map(line => "    " + line).join("\n")
    const rel = path.relative(process.cwd(), file)
    // should appear with hyperlink in jetbrains console
    return `Mermaid error:\n${mermaid_message}\nat ${rel}:${line}\n`
}

async function render(definition) {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage();

    try {
        const html = `
            <!doctype html>
            <html lang="en">
              <body>
                <div id="container"></div>
              </body>
            </html>
        `;

        await page.setContent(html)
        // assumes we have mermaid installed
        await page.addScriptTag({path: "./node_modules/mermaid/dist/mermaid.min.js"})
        return await page.evaluate(async ({definition}) => {
            // run the mermaid magic "client side"
            window.mermaid.initialize({})
            return new Promise((resolve, reject) => {
                try {
                    window.mermaid.mermaidAPI.render("container", definition, (svgCode) => {
                        resolve(svgCode)
                    })
                } catch (e) {
                    reject(e)
                }
            })
        }, {definition} /* pass in the mermaid source */)
    } finally {
        await page.close()
        await browser.close()
    }
}

async function renderToFile(source, destination) {
    const unique = crypto.createHmac('sha1', PLUGIN_NAME).update(source).digest('hex');
    const svgFilename = `${unique}.svg`;
    const svgPath = path.join(destination, svgFilename);

    if (!fs.existsSync(svgPath)) {
        const svg = await render(source)
        fs.writeFileSync(svgPath, svg);
    }

    return [svgFilename, unique];
}


export default function remarkMermaid() {
    fs.mkdirSync(OUTDIR, {recursive: true})
    return async (tree, vFile) => {
        const filename = vFile.history[0];

        // we want to run async and then mutate the tree at the end, so we build an array of
        // promises that we'll then resolve with Promise.all
        const promises = []

        visit(tree, 'code', (node, index, parent) => {
            if (node.lang === "mermaid") {
                const source = node.value;
                // push a new promise
                promises.push(renderToFile(source, OUTDIR).then(([file, unique]) => {
                    const fullPath = resolve(OUTDIR + "/" + file)
                    const relative = path.relative(filename, fullPath).replace(/\\/g, '/').substr(3);

                    // result of the promise on success
                    return {
                        parent,
                        index,
                        replace: {
                            type: "jsx",
                            value: `<img src={mermaid_${unique}} alt="mermaid-image"/>`
                        },
                        import: {
                            type: "import",
                            value: `import mermaid_${unique} from "${relative}"`
                        }
                    }
                }).catch(error => {
                    // result of the promise on error (includes line number of code block)
                    return ({error, line: node.position.start.line});
                }))
            }
        })

        const result = await Promise.all(promises)

        const success = result.filter(r => !r.error) // get the successful renders
        const imports = success.map(r => r.import) // gather imports

        for (const {parent, index, replace} of success) {
            parent.children[index] = replace; // mutate the codeblock nodes
        }

        // report any errors
        const errors = result.map(({error, line}) => error && {error, line}).filter(r => r) // get index of error and filter successes
        for (const {error, line} of errors) {
            console.log(format_error(filename, error, line))
        }

        // insert the imports
        tree.children.splice(0, 0, ...imports)
    }
}
