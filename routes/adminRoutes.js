// =====================================
// IMPORTAÇÕES
// =====================================

const express =
    require("express");

const adminController =
    require("../controllers/adminController");

const loginLimiter =
    require("../middlewares/loginLimiter");

// =====================================
// ROUTER
// =====================================

const router = express.Router();

// =====================================
// LOGIN
// =====================================

router.post(

    "/login",

    loginLimiter,

    adminController.login

);

// =====================================
// CADASTRAR ADMINISTRADOR
// =====================================

router.post(

    "/admin",

    adminController.cadastrarAdministrador

);

// =====================================
// LOGOUT
// =====================================

router.get(

    "/logout",

    adminController.logout

);

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = router;