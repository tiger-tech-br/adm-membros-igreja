function errorMiddleware(err, req, res, next) {

    console.error("======================================");

    console.error("[ERROR MIDDLEWARE]");

    console.error(err);

    console.error("======================================");

    return res.status(500).json({

        success: false,

        message: "Ocorreu um erro interno no servidor."

    });

}

module.exports = errorMiddleware;