const MongoClient = require('mongodb').MongoClient;
const puppeteer = require('puppeteer');
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

        //let browser = await puppeteer.launch({ headless: false });;
        let browser = await puppeteer.launch();;

        for (link of listaLinks) {
            // scrap data from link and return a JS object
            console.log("=================");
            console.log("cnpj:" + link);
            console.log("=================");

            const page = await browser.newPage();

            await page.goto(link, { waitUntil: "networkidle0" });


            let resultado = await conversor(page);

            if (resultado != null) {
                // insert object into DB and asserts
                let cnpj = await db.collection('cnpjs').insertOne(resultado);

                assert.equal(1, cnpj.insertedCount);
            }

            page.close();
        }

    } catch (err) {
        console.error("Erro Arquivo salvarBanco");
        console.log(err.stack);
    } finally {
        await browser.close();
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

    converterSitemapEmListaLinks('links/sitemap44.txt');
}


iniciar();