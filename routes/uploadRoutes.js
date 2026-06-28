const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

router.post("/", upload.single("foto"), (req, res) => {

    console.log(req.file);

    return res.status(200).json({

        success: true,

        message: "Upload realizado com sucesso.",

        arquivo: req.file

    });

});

module.exports = router;