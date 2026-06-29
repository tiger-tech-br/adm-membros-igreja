const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "igreja-membros",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

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