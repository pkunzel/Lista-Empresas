// const fs = require("fs");

function EscreverTxtTodosDoSitemap() {
    fs.readFile('links/sitemap1.txt', 'utf8', function (err, contents) {
        let links = contents.split("\n");

        links.forEach(link => {
            console.log(link);
        });
    });
}

// EscreverTxtTodosDoSitemap();



const conversor = require("./converterSiteEmObjeto");

let lista = [
    "http://www.consultascnpj.com/caixa-escolar-professor-wancleber-pacheco/00075474000100",
    "http://www.consultascnpj.com/acl-tecnologia-de-concretos-e-pavimentos-ltda/00076007000197",
    "http://www.consultascnpj.com/stella-azevedo-carneiro-e-cia-ltda/00076094000182",
    "http://www.consultascnpj.com/ecoplan-corretora-de-seguros-de-vida-ltda/00076203000161",
    "http://www.consultascnpj.com/campo-tur-agencia-de-viagens-e-turismo-ltda/00076239000145",
    "http://www.consultascnpj.com/f-c-automacao-industrial-ltda/00077079000159",
    "http://www.consultascnpj.com/milan-engenharia-ltda/00077082000172",
    "http://www.consultascnpj.com/creta-comercio-de-moveis-e-objetos-ltda/00077130000122",
    "http://www.consultascnpj.com/sistema-de-agua-e-esgoto-de-gurani-de-goias/00077199000156"
];

// (async function(){
//     try{
//         for(link of lista){
//             let resultado = await conversor(link);
//             console.log(resultado);
//         }
//     }catch(e){
//         console.error(e);
//     }
// })()



const request = require("request");
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'links');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
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
    //process.exit();
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