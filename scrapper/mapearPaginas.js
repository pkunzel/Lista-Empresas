const request = require("request");
const fs = require("fs");

//Le todos os arquivos dentro da pasta
// Paramtros
// FolderPath: String contendo o caminho da pasta (terminado em /)
function LerArquivos(folderPath) {
    fs.readdirSync(folderPath).forEach(file => {
        console.log(file);
    });
}

LerArquivos("links/");