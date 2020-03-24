const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require("fs");

const conversor = require("./converterSiteEmObjeto");

// Connection URL
const url = 'mongodb://localhost:27017';

// Database config
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function salvarBanco(listaLinks) {
    try {

        for (link of listaLinks) {
            // scrap data from link and return a JS object
            console.log("=================");
            console.log("cnpj:" + link);
            console.log("=================");
            let resultado = await conversor(link);

            if (resultado != null) {
                // insert object into DB and asserts
                let cnpj = await db.collection('cnpjs').insertOne(resultado);

                assert.equal(1, cnpj.insertedCount);
            }
        }

    } catch (err) {
        console.error("Erro Arquivo salvarBanco");
        console.log(err.stack);
    } finally {
        client.close();
    }

    console.log("Done...");
    process.exit();
};

async function converterSitemapEmListaLinks(site) {
    // Reads file containing links
    fs.readFile(site, 'utf8', function (err, contents) {
        //saves to database
        salvarBanco(contents.split("\n"));
    });
}

async function iniciar() {
    await client.connect();
    db = client.db('consultadados');
    console.log("Connected to MongoDB");

    converterSitemapEmListaLinks('links/sitemap17.txt');
    converterSitemapEmListaLinks('links/sitemap18.txt');
    converterSitemapEmListaLinks('links/sitemap19.txt');
    
}


iniciar();