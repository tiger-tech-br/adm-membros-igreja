// =====================================
// IMPORTAÇÕES
// =====================================

const PDFDocument =
    require("pdfkit");

const fs =
    require("fs");

const path =
    require("path");

// =====================================
// CONFIGURAÇÃO
// =====================================

const mostrarNome =

    process.env
        .MOSTRAR_NOME_CREDENCIAL === "true";

const dourado = "#D4AF37";

const preto = "#111111";

const branco = "#FFFFFF";

// =====================================
// FORMATAR DATA
// =====================================

function formatarData(data) {

    if (!data) {

        return "-";

    }

    return new Date(data)
        .toLocaleDateString("pt-BR");

}

// =====================================
// FUNDO
// =====================================

function desenharFundo(doc) {

    doc

        .roundedRect(

            0,

            0,

            243,

            153,

            8

        )

        .fill(preto);

    doc

        .lineWidth(2)

        .strokeColor(dourado)

        .roundedRect(

            3,

            3,

            237,

            147,

            8

        )

        .stroke();

}

// =====================================
// LOGO
// =====================================

function desenharLogo(doc) {

    const logo = path.join(

        __dirname,

        "..",

        "images",

        "assembleia-logo.png"

    );

    if (!fs.existsSync(logo)) {

        return;

    }

    doc.image(

        logo,

        96,

        6,

        {

            width: 50

        }

    );

}

// =====================================
// TÍTULO
// =====================================

function desenharTitulo(doc) {

    doc

        .fillColor(dourado)

        .font("Helvetica-Bold")

        .fontSize(12)

        .text(

            "ASSEMBLEIA DE DEUS",

            0,

            48,

            {

                width: 243,

                align: "center"

            }

        );

}

// =====================================
// DADOS
// =====================================

function desenharDados(

    doc,

    membro

) {

    let y = 74;

    doc.fontSize(7.5);

    if (mostrarNome) {

        doc.fillColor(dourado);

        doc.text(

            "Nome:",

            12,

            y

        );

        doc.fillColor(branco);

        doc.text(

            membro.nome,

            60,

            y

        );

        y += 14;

    }

    doc.fillColor(dourado);

    doc.text(

        "Cargo:",

        12,

        y

    );

    doc.fillColor(branco);

    doc.text(

        membro.cargo || "-",

        60,

        y

    );

    y += 14;

    doc.fillColor(dourado);

    doc.text(

        "Matrícula:",

        12,

        y

    );

    doc.fillColor(branco);

    doc.text(

        membro.matricula,

        60,

        y

    );

    y += 14;

    doc.fillColor(dourado);

    doc.text(

        "Validade:",

        12,

        y

    );

    doc.fillColor(branco);

    doc.text(

        formatarData(

            membro.validade

        ),

        60,

        y

    );

}

// =====================================
// QR CODE
// =====================================

function desenharQRCode(

    doc,

    membro

) {

    if (!membro.qr_code) {

        return;

    }

    const qr = path.join(

        __dirname,

        "..",

        "qrcodes",

        `membro-${membro.id}.png`

    );

    if (!fs.existsSync(qr)) {

        console.log(

            "[QR CODE] Arquivo não encontrado:",

            qr

        );

        return;

    }

    doc.image(

        qr,

        176,

        58,

        {

            width: 46

        }

    );

}

// =====================================
// GERAR CREDENCIAL
// =====================================

function gerarCredencial(

    membro,

    res

) {

    const doc = new PDFDocument({

        size: [

            243,

            153

        ],

        margin: 0

    });

    const nomeArquivo = membro.nome

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/\s+/g, "-")

        .toLowerCase();

    res.setHeader(

        "Content-Type",

        "application/pdf"

    );

    res.setHeader(

        "Content-Disposition",

        `inline; filename=credencial-${nomeArquivo}.pdf`

    );

    doc.pipe(res);

    desenharFundo(doc);

    desenharLogo(doc);

    desenharTitulo(doc);

    desenharDados(

        doc,

        membro

    );

    desenharQRCode(

        doc,

        membro

    );

    doc.end();

}

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = {

    gerarCredencial

};