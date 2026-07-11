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

        "public",

        "images",

        "assembleia-logo.png"

    );

    if (!fs.existsSync(logo)) {

        return;

    }

    doc.image(

        logo,

        100,

        8,

        {

            width: 40

        }

    );

}

// =====================================
// TÍTULO
// =====================================

function desenharTitulo(doc) {

    doc

        .fillColor(dourado)

        .fontSize(10)

        .font("Helvetica-Bold")

        .text(

            "ASSEMBLEIA DE DEUS",

            0,

            52,

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

    let y = 70;

    doc.fontSize(7);

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

            55,

            y

        );

        y += 12;

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

        55,

        y

    );

    y += 12;

    doc.fillColor(dourado);

    doc.text(

        "Matrícula:",

        12,

        y

    );

    doc.fillColor(branco);

    doc.text(

        membro.matricula,

        55,

        y

    );

    y += 12;

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

        55,

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

        membro.qr_code.replace(

            /^\//,

            ""

        )

    );

    if (!fs.existsSync(qr)) {

        return;

    }

    doc.image(

        qr,

        165,

        68,

        {

            width: 62

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

    res.setHeader(

        "Content-Type",

        "application/pdf"

    );

    res.setHeader(

        "Content-Disposition",

        `inline; filename=credencial-${membro.id}.pdf`

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