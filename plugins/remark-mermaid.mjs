import {visit} from "unist-util-visit"
import path, {resolve} from "path"
import crypto from "crypto";
import {execSync} from "child_process";
import which from "npm-which";
import fs from "fs";

const OUTDIR = ".cache/mermaid";
const PLUGIN_NAME = 'remark-mermaid';

function render(source, destination) {
    const unique = crypto.createHmac('sha1', PLUGIN_NAME).update(source).digest('hex');
    const mmdcExecutable = which(process.cwd()).sync('mmdc');
    const mmdPath = path.join(destination, `${unique}.mmd`);
    const svgFilename = `${unique}.svg`;
    const svgPath = path.join(destination, svgFilename);

    if (!fs.existsSync(svgPath)) {
        // Write temporary file
        fs.writeFileSync(mmdPath, source);

        // Invoke mermaid.cli
        execSync(`${mmdcExecutable} -i ${mmdPath} -o ${svgPath} -b transparent`);

        // Clean up temporary file
        fs.unlinkSync(mmdPath);
    }

    return [svgFilename, unique];
}


export default function remarkMermaid() {
    fs.mkdirSync(OUTDIR, {recursive: true})
    return (tree, vFile) => {
        const importAST = []
        visit(tree, 'code', (node, index, parent) => {
            if (node.lang === "mermaid") {
                const source = node.value;
                const [file, unique] = render(source, OUTDIR)
                const fullPath = resolve(OUTDIR + "/" + file)
                const relative = path.relative(vFile.history[0], fullPath).replace(/\\/g, '/').substr(3);

                parent.children[index] = {
                    type: "jsx",
                    value: `<img src={${unique}} alt="mermaid-image"/>`
                }

                importAST.push({
                    type: "import",
                    value: `import ${unique} from "${relative}"`
                })
            }
        })

        tree.children = [...importAST, ...tree.children]
    }
}
