// =====================================
// IMPORTAÇÕES
// =====================================

const express = require("express");

const membroController =
    require("../controllers/membroController");

// =====================================
// ROUTER
// =====================================

const router = express.Router();

// =====================================
// ROTAS
// =====================================

// Cadastrar membro

router.post(

    "/",

    membroController.criar

);

// Listar membros

router.get(
    "/",
    membroController.listar
);

// Dashboard

router.get(
    "/dashboard",
    membroController.dashboard
);

// Últimos cadastrados

router.get(
    "/ultimos",
    membroController.ultimos
);

// Validar credencial

router.get(
    "/validar/:id",
    membroController.validar
);

// Buscar por ID

router.get(
    "/:id",
    membroController.buscarPorId
);

// Atualizar membro

router.put(
    "/:id",
    membroController.atualizar
);

// Excluir membro

router.delete(
    "/:id",
    membroController.excluir
);

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = router;