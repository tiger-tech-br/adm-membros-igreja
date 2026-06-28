const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const membroController = require("../controllers/membroController");

// Listar todos
router.get("/", membroController.listar);

// Validar credencial
router.get("/validar/:id", membroController.validar);

// Buscar por ID
router.get("/:id", membroController.buscarPorId);

// Cadastrar
router.post(

    "/",

    upload.single("foto"),

    membroController.criar

);

// Atualizar membro
router.put(

    "/:id",

    upload.single("foto"),

    membroController.atualizar

);

// Validar credencial
router.get("/validar/:id", membroController.validar);

// Excluir
router.delete("/:id", membroController.excluir);

module.exports = router;