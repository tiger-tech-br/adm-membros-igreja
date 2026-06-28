const QRCode = require("qrcode");
const path = require("path");

async function gerarQRCode(id) {

    const pasta = path.join(__dirname, "..", "qrcodes");

    const nomeArquivo = `membro-${id}.png`;

    const caminhoCompleto = path.join(pasta, nomeArquivo);

    // O QR Code abrirá a página de validação
    const conteudo = `http://localhost:3000/validar?id=${id}`;

    await QRCode.toFile(caminhoCompleto, conteudo);

    return `/qrcodes/${nomeArquivo}`;

}

module.exports = {

    gerarQRCode

};