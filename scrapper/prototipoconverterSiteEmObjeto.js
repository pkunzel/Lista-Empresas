// TODO
//
// Nem todos os campos do HTML foram convertidos para objetos
//
//
const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("http://www.consultascnpj.com/acl-tecnologia-de-concretos-e-pavimentos-ltda/00076007000197", { waitUntil: "networkidle0" });

        const listItems = await page.$$("li");
        let listItemsValue = [];

        for (let index = 0; index < listItems.length; index++) {
            listItemsValue.push(await (await listItems[index].getProperty('innerText')).jsonValue());
            //console.log(valor);
        }

        let cadastro = {
            "Cnpj" : listItemsValue[2],
            "Nome" : listItemsValue[3],
            "Fantasia" : listItemsValue[4],
            "Situacao" : listItemsValue[5],
            "MotivoSituacao" : listItemsValue[6],
            "DataSituacao" : listItemsValue[7],
            "SituacaoEspecial" : listItemsValue[8],
            "DataSituacao" : listItemsValue[9],
            "Abertura" : listItemsValue[10],
            "NaturezaJuridica" : listItemsValue[11],
            "Tipo": listItemsValue[12],
            "EFR":listItemsValue[13],
            "CapitalSocial":listItemsValue[14],
            "Status": listItemsValue[15],
            "UltimaAtualizacao" : listItemsValue[16],
            "Logradouro":listItemsValue[17],
            "Numero":listItemsValue[18],
            "Cep": listItemsValue[19],
            "Complemento": listItemsValue[20],
            "Bairro":listItemsValue[21],
            "Municipio":listItemsValue[22],
            "UF":listItemsValue[23],
            "Telefone": listItemsValue[24],
            "Email":listItemsValue[25]
        };

        const listStrong = await page.$$("strong");
        let listStrongValue = [];

        for (let index = 0; index < listStrong.length; index++) {
            listStrongValue.push(await (await listStrong[index].getProperty('innerText')).jsonValue());
            console.log(listStrongValue[index]);
        }

        console.log(cadastro);

        console.log("Fim");

    } catch (e) {
        console.error("Our error:\n", e);
        process.exit(1);
    }

    process.exit();
})()