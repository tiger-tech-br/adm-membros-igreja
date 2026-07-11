// =====================================
// VARIÁVEIS DE AMBIENTE
// =====================================

require("dotenv").config();

// =====================================
// IMPORTAÇÕES
// =====================================

const express =
    require("express");



const path =
    require("path");

const session =
    require("express-session");

const helmet =
    require("helmet");

const compression =
    require("compression");

const pool =
    require("./database/connection");

const membroRoutes =
    require("./routes/membroRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const verificarAutenticacao =
    require("./middlewares/auth");

const errorMiddleware =
    require("./middlewares/errorMiddleware");

// =====================================
// CONFIGURAÇÕES
// =====================================

const app = express();

app.set("trust proxy", 1);

const PORT =
    process.env.PORT || 3000;

app.disable("x-powered-by");

// =====================================
// HELMET
// =====================================

// =====================================
// HELMET
// =====================================

app.use(

    helmet({

        contentSecurityPolicy: {

            useDefaults: true,

            directives: {

                "upgrade-insecure-requests": null,

                scriptSrc: [

                    "'self'",

                    "https://unpkg.com",

                    "https://cdnjs.cloudflare.com"

                ],

                styleSrc: [

                    "'self'",

                    "'unsafe-inline'",

                    "https://fonts.googleapis.com",

                    "https://cdnjs.cloudflare.com"

                ],

                fontSrc: [

                    "'self'",

                    "https://fonts.gstatic.com",

                    "https://cdnjs.cloudflare.com"

                ],

                imgSrc: [

                    "'self'",

                    "data:",

                    "blob:"

                ]

            }

        },

        crossOriginEmbedderPolicy: false,

        hsts: false

    })

);

// =====================================
// COMPRESSÃO
// =====================================

app.use(

    compression()

);

// =====================================
// BODY PARSER
// =====================================

app.use(

    express.json()

);

app.use(

    express.urlencoded({

        extended: true

    })

);

// =====================================
// SESSÃO
// =====================================

app.use(

    session({

        name: "igreja.sid",

        secret:

            process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            secure: false,

            sameSite: "lax",

            maxAge:

                1000 * 60 * 60 * 2

        }

    })

);

// =====================================
// LOG DAS REQUISIÇÕES
// =====================================

app.use(

    (req, res, next) => {

        console.log(

            req.method,

            req.url

        );

        next();

    }

);

// =====================================
// ARQUIVOS ESTÁTICOS
// =====================================

// =====================================
// ARQUIVOS ESTÁTICOS
// =====================================

app.use(

    express.static(__dirname)

);

app.use(

    "/qrcodes",

    express.static(

        path.join(

            __dirname,

            "qrcodes"

        )

    )

);

// =====================================
// ROTAS DA API
// =====================================

app.use(

    "/api/membros",

    membroRoutes

);

app.use(

    "/api",

    adminRoutes

);

// =====================================
// ROTAS DAS PÁGINAS
// =====================================

// Home

app.get(

    "/",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "index.html"

            )

        );

    }

);

// Login

app.get(

    "/login",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "login.html"

            )

        );

    }

);

// Logout

app.get(

    "/logout",

    (req, res) => {

        req.session.destroy((erro) => {

            if (erro) {

                return res.redirect(

                    "/dashboard"

                );

            }

            res.clearCookie(

                "igreja.sid"

            );

            return res.redirect(

                "/login"

            );

        });

    }

);

// Dashboard

app.get(

    "/dashboard",

    verificarAutenticacao,

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "dashboard.html"

            )

        );

    }

);

// Cadastro

app.get(

    "/cadastro",

    verificarAutenticacao,

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "cadastro.html"

            )

        );

    }

);

// Membros

app.get(

    "/membros",

    verificarAutenticacao,

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "membros.html"

            )

        );

    }

);

// Perfil

app.get(

    "/perfil",

    verificarAutenticacao,

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "perfil.html"

            )

        );

    }

);

// Scanner

app.get(

    "/scanner",

    verificarAutenticacao,

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "scanner.html"

            )

        );

    }

);

// Validação pública

app.get(

    "/validar",

    (req, res) => {

        res.sendFile(

            path.join(

                __dirname,

                "admin",

                "validar.html"

            )

        );

    }

);

// =====================================
// 404
// =====================================

// =====================================
// 404
// =====================================

app.use(

    (req, res) => {

        return res.status(404).json({

            success: false,

            message: "Rota não encontrada."

        });

    }

);

// =====================================
// MIDDLEWARE DE ERRO
// =====================================

app.use(

    errorMiddleware

);

// =====================================
// INICIAR SERVIDOR
// =====================================

async function iniciarServidor() {

    try {

        await pool.connect();

        console.log(

            "🗄️ PostgreSQL conectado com sucesso!"

        );

        app.listen(

            PORT,

            "0.0.0.0",

            () => {

                console.log(

                    "======================================"

                );

                console.log(

                    "🚀 Servidor iniciado com sucesso!"

                );

                console.log(

                    `🌐 http://localhost:${PORT}`

                );

                console.log(

                    "======================================"

                );

            }

        );

    } catch (erro) {

        console.error(

            "[DATABASE]",

            erro

        );

    }

}

iniciarServidor();