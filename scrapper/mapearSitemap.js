const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//Função que mapeia o arquivo de texto do sitemap
// OBS.: estava fora da função, testar se vai funcionar chamando dela
function mapearSitemapMestre() {
    const writeStream = fs.createWriteStream("sitemap.txt");

    request("https://www.consultascnpj.com/sitemap.xml", (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $("loc").each((index, element) => {
                writeStream.write(element.children[0].data + "\n");
            });

            for(let i = 241; i <= 508; i++){
                writeStream.write(`http://www.consultascnpj.com/sitemap${i}.txt\n`);
            }
        }
    });
}

mapearSitemapMestre();