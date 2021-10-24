import {visit} from "unist-util-visit"
import crypto from "crypto";
import path, {resolve} from "path";
import fs from "fs";

const OUTDIR = ".cache/codeblock";
const PLUGIN_NAME = 'remark-codeblock';

function render(source, destination) {
    const unique = crypto.createHmac('sha1', PLUGIN_NAME).update(source).digest('hex');
    const jsxFilename = `${unique}.jsx`;
    const jsxPath = path.join(destination, jsxFilename);

    if (!fs.existsSync(jsxPath)) {
        // Write temporary file
        fs.writeFileSync(jsxPath, source);
    }

    return [jsxFilename, unique];
}

export default function remarkCodeblock() {
    fs.mkdirSync(OUTDIR, {recursive: true})
    return (tree, vFile) => {
        const importAST = []
        visit(tree, 'code', (node, index, parent) => {
            if (node.meta === "demo") {
                delete node.meta

                const source = node.value
                const [file, unique] = render(source, OUTDIR)
                const fullPath = resolve(OUTDIR + "/" + file)
                const relative = path.relative(vFile.history[0], fullPath).replace(/\\/g, '/').substr(3);

                importAST.push({
                    type: "import",
                    value: `import CodeBlock${unique} from "${relative}"`
                })

                parent.children.splice(index, 0, {
                        type: "jsx",
                        value: `<CodeBlock${unique}/>`
                    }
                )
                return index + 2
            }
        })

        tree.children = [...importAST, ...tree.children]
    }
}
