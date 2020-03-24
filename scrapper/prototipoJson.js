function preencherDadosListaCondicao(lista, propriedadesObjeto, funcTesteProximoValor) {
    let continuarLoop = true;

    while (continuarLoop) {
        let objeto = {}

        propriedadesObjeto.forEach(propriedade => {
            objeto[propriedade] = textos[count++].textContent.trim();
        });

        lista.push(objeto);

        let testeProximoValor = textos[count].textContent.trim();

        if(testeProximoValor == ""){
            count += 2;
            testeProximoValor = textos[count].textContent.trim();
        }

        continuarLoop = funcTesteProximoValor(testeProximoValor);
    }
}

function testeLoopSocio(testeProximoValor) {
    testeProximoValor = testeProximoValor.toUpperCase();
    return testeProximoValor.includes("SÓCIO")
        || testeProximoValor.includes("SOCIO")
        || testeProximoValor.includes("ADMINISTRADOR");
}

function testeLoopAtividades(testeProximoValor){
    return !isNaN(testeProximoValor) && testeProximoValor.length == 7;
}

let textos = document.body.getElementsByTagName("strong");
let dados = {
    cnpj: textos[0].textContent,
    nome: textos[1].textContent,
    fantasia: textos[2].textContent,
    situacao: textos[3].textContent,
    motivo: textos[4].textContent,
    dataSituacao: textos[5].textContent,
    situacaoEspecial: textos[6].textContent,
    dataSituacaoEspecial: textos[7].textContent,
    abertura: textos[8].textContent,
    naturezaJuridica: textos[9].textContent,
    tipo: textos[10].textContent,
    efr: textos[11].textContent,
    capitalSocial: textos[12].textContent,
    status: textos[13].textContent,
    ultimaAtualizacao: textos[14].textContent,
    logradouro: textos[15].textContent,
    numero: textos[16].textContent,
    cep: textos[17].textContent,
    complemento: textos[18].textContent,
    bairro: textos[19].textContent,
    municipio: textos[20].textContent,
    uf: textos[21].textContent,
    telefone: textos[22].textContent,
    email: textos[23].textContent
}

dados.socios = [];
dados.atividades = [];

let count = 24;
let isSocio = true;

preencherDadosListaCondicao(dados.socios, ["tipo", "nome"], testeLoopSocio);
preencherDadosListaCondicao(dados.atividades, ["cnae", "descricao"], testeLoopAtividades);

console.log(dados);