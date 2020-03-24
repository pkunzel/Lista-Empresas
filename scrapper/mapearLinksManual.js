const request = require("request");
const path = require('path');
const fs = require('fs');


const directoryPath = path.join(__dirname, 'links');

fs.readdir(directoryPath, function (err, files) {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    let config = {
        lista: files,
        current: 0,
        link: ''
    }

    //console.log(config.lista);

    let c = BuscarProximo(config);

    EscreverSitemapTxtSync(c);
});

function BuscarProximo(config) {
    config.current++;
    let end = 508;

    for (let i = config.current; i <= end; i++) {
        let teste = `sitemap${i}.txt`;
        let link = `http://www.consultascnpj.com/sitemap${i}.txt`;
        if (!config.lista.includes(teste)) {
            console.log(teste);
            config.link = link;
            config.current = i;
            return config;
        }
    }

    console.log("Terminou");
    process.exit();
}


function EscreverSitemapTxtSync(config) {
    request(config.link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const writeStream = fs.createWriteStream("links/" + config.link.slice(29));
            writeStream.write(html);
            console.log("----------");
            let c = BuscarProximo(config)
            EscreverSitemapTxtSync(c);
        } else {
            console.log("Erro 1: " + config.link.slice(29));
            console.log(error);
        }
    });
}