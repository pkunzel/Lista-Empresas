const request = require("request");
const fs = require("fs");

function EscreverTxtTodosDoSitemap() {
    fs.readFile('sitemap.txt', 'utf8', function (err, contents) {
        let links = contents.split("\n");

        links.forEach(link => {
            EscreverSitemapTxt(link);
        });
    });
}

function EscreverSitemapTxt(link) {
    request(link, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const writeStream = fs.createWriteStream("links/" + link.slice(29));
            writeStream.write(html);
        }
    });
}

// Notepad++ não consegue abrir arquivos com mais de 500MB
function GerarArquivoUnico() {
    const writeStream = fs.createWriteStream("_links.txt");
    const folder = "links/"
    fs.readdirSync(folder).forEach(file => {
        console.log(file);
        writeStream.write(fs.readFileSync(folder + file, "utf8"));
    });
}

// Para remapear apenas um link
// EscreverSitemapTxt("http://www.consultascnpj.com/sitemap234.txt");

// Para remapear todos os links do sitemaps
// EscreverTxtTodosDoSitemap();

console.log("Terminou");