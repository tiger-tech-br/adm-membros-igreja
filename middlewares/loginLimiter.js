// =====================================
// IMPORTAÇÃO
// =====================================

const rateLimit =
    require("express-rate-limit");

// =====================================
// LIMITADOR DE LOGIN
// =====================================

const loginLimiter = rateLimit({

    windowMs:

        Number(

            process.env.LOGIN_BLOCK_MINUTES

        ) * 60 * 1000,

    max:

        Number(

            process.env.LOGIN_MAX_ATTEMPTS

        ),

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message:

            `Você excedeu o limite de ${process.env.LOGIN_MAX_ATTEMPTS} tentativas. Aguarde ${process.env.LOGIN_BLOCK_MINUTES} minutos e tente novamente.`

    }

});

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = loginLimiter;