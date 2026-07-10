// =====================================
// VARIÁVEIS DE AMBIENTE
// =====================================

require("dotenv").config();

// =====================================
// IMPORTAÇÕES
// =====================================

const QRCode =
    require("qrcode");

const path =
    require("path");

// =====================================
// GERAR QR CODE
// =====================================

async function gerarQRCode(id) {

    const pasta = path.join(

        __dirname,

        "..",

        "qrcodes"

    );

    const nomeArquivo =
        `membro-${id}.png`;

    const caminhoCompleto = path.join(

        pasta,

        nomeArquivo

    );

    const conteudo =
        `${process.env.APP_URL}/validar?id=${id}`;

    await QRCode.toFile(

        caminhoCompleto,

        conteudo

    );

    return `/qrcodes/${nomeArquivo}`;

}

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = {

    gerarQRCode

};