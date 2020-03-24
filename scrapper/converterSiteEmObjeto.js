const puppeteer = require('puppeteer');

function preencherDadosListaCondicao(lista, propriedadesObjeto, funcTesteProximoValor, textos, count) {
    let testeProximoValor = textos[count].trim();

    if (testeProximoValor == "") {
        count += 2;
        testeProximoValor = textos[count].trim();
    }

    let continuarLoop = funcTesteProximoValor(testeProximoValor);


    while (continuarLoop) {
        let objeto = {}

        propriedadesObjeto.forEach(propriedade => {
            objeto[propriedade] = textos[count++].trim();
        });

        lista.push(objeto);

        let testeProximoValor = textos[count].trim();

        if (testeProximoValor == "") {
            count += 2;
            testeProximoValor = textos[count].trim();
        }

        continuarLoop = funcTesteProximoValor(testeProximoValor);
    }

    return count;
}

function testeLoopSocio(testeProximoValor) {
    testeProximoValor = testeProximoValor.toUpperCase();
    return testeProximoValor.includes("SÓCIO")
        || testeProximoValor.includes("SOCIO")
        || testeProximoValor.includes("ADMINISTRADOR")
        || testeProximoValor.includes("PRESIDENTE");
}

function testeLoopAtividades(testeProximoValor) {
    return !isNaN(testeProximoValor) && testeProximoValor.length == 7;
}

module.exports = async function (link) {
    let dados = null;
    let browser = null;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(link, { waitUntil: "networkidle0" });

        const listItems = await page.$$("strong");
        let textos = [];

        for (let index = 0; index < listItems.length; index++) {
            textos.push(await (await listItems[index].getProperty('textContent')).jsonValue());
            //console.log(valor);
        }

        dados = {
            cnpj: textos[0],
            nome: textos[1],
            fantasia: textos[2],
            situacao: textos[3],
            motivo: textos[4],
            dataSituacao: textos[5],
            situacaoEspecial: textos[6],
            dataSituacaoEspecial: textos[7],
            abertura: textos[8],
            naturezaJuridica: textos[9],
            tipo: textos[10],
            efr: textos[11],
            capitalSocial: textos[12],
            status: textos[13],
            ultimaAtualizacao: textos[14],
            logradouro: textos[15],
            numero: textos[16],
            cep: textos[17],
            complemento: textos[18],
            bairro: textos[19],
            municipio: textos[20],
            uf: textos[21],
            telefone: textos[22],
            email: textos[23]
        }
        // console.log("=================");
        // console.log("cnpj:" + dados.cnpj);
        // console.log("=================");

        dados.socios = [];
        dados.atividades = [];

        let indexDados = preencherDadosListaCondicao(dados.socios, ["tipo", "nome"], testeLoopSocio, textos, 24);
        indexDados = preencherDadosListaCondicao(dados.atividades, ["cnae", "descricao"], testeLoopAtividades, textos, indexDados);
        
    } catch (e) {
        console.error("Erro Arquivo converterSiteEmObjeto");
        console.error("Our error:\n", e);
        dados = null;
    } finally {
        await browser.close();
        return dados;
    }
}