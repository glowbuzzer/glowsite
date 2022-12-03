import fs from "fs"
import path from "path"
import puppeteer from "puppeteer"
import express from "express"
import lunr from "lunr"

const [, , domain] = process.argv

const app = express()
const port = 5000

function* chunk(arr, n) {
    const chunk_size = Math.ceil(arr.length / n)
    for (let i = 0; i < arr.length; i += chunk_size) {
        yield arr.slice(i, i + chunk_size);
    }
}

app.use(express.static("root/www/dist"))

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("root/www/dist", "index.html"));
});

const server = app.listen(port, async () => {
    const browser = await puppeteer.launch({
        args: [
            // '--no-sandbox',
            // '--no-zygote',
            // '--single-process',
        ]
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto('http://localhost:5000/sitemap', {waitUntil: 'networkidle2'});

    const elems = await page.$$(".sitemap-link");

    const links = await Promise.all(elems.map(async elem => elem.evaluate(e => e.getAttribute("href"))))

    const chunks = Array.from(chunk(links, 5))// .slice(0, 1);

    // follow each link and index the content
    const all = await Promise.all(chunks.map(async chunk => {
        console.log("Processing subset", chunk);
        const sub = await browser.newPage();
        const results = []
        for (const path of chunk/*.slice(0, 5)*/) {
            await sub.goto("http://localhost:5000" + path, {waitUntil: 'networkidle2', timeout: 60000});
            const result = await sub.evaluate(() => {
                const el = document.querySelector(".content");
                if (!el) {
                    return {success: false, message: "No .content element found"};
                }
                const title = el.querySelector("h1")?.innerText;
                return {success: true, title, text: el.innerText};
            });
            results.push({...result, path});
            console.log("Processed", path);
        }
        return results
    }));

    const idx = lunr(async function () {
        this.ref("path")
        this.field("title", {boost: 10})
        this.field("text")

        for (const {path, success, title, text, message} of all.flat()) {
            if (success) {
                // console.log("Adding to index", path);
                this.add({
                    path,
                    title,
                    text
                })
            } else {
                console.log("Warn: failed to index: ", path, message);
            }
        }
    })

    fs.writeFileSync("root/www/dist/index.json", JSON.stringify(idx));
    fs.writeFileSync("root/www/dist/sitemap.txt", all.flat().map(({path}) => `https://${domain}/${path}`).join("\n"));
    fs.writeFileSync("root/www/dist/content.txt", all.flat().map(({
                                                                      path,
                                                                      title,
                                                                      text
                                                                  }) => `${path}\n${title}\n---\n${text}\n---\n`).join("\n"));

    // console.log(all.flat().map(({
    //                                 path,
    //                                 success,
    //                                 text,
    //                                 message
    //                             }) => `${path}: ${success ? "success" : "failed"}: ${text?.substr(0, 30) || message}`));

    process.exit(0);
})
