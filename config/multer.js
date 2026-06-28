const multer = require("multer");

const path = require("path");

// Configuração de armazenamento

const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, "uploads/");

    },

    filename: (req, file, callback) => {

        const nomeArquivo =

            Date.now() +

            "-" +

            Math.round(Math.random() * 1e9) +

            path.extname(file.originalname);

        callback(null, nomeArquivo);

    }

});

// Aceitar apenas imagens

function fileFilter(req, file, callback) {

    const tiposPermitidos = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ];

    if (tiposPermitidos.includes(file.mimetype)) {

        callback(null, true);

    } else {

        callback(new Error("Apenas imagens são permitidas."));

    }

}

module.exports = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});