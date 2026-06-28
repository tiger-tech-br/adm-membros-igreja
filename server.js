// =========================
// IMPORTAÇÕES
// =========================

const express = require("express");
const path = require("path");

const pool = require("./database/connection");

const membroRoutes = require("./routes/membroRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");

const uploadRoutes = require("./routes/uploadRoutes");

// =========================
// CONFIGURAÇÕES
// =========================

const app = express();

const PORT = 3000;

// =========================
// MIDDLEWARES
// =========================

// Permite receber JSON

app.use(express.json());

// Arquivos estáticos

app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

// =========================
// ROTAS DA API
// =========================

app.use("/api/membros", membroRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

// =========================
// ROTAS DAS PÁGINAS
// =========================

// Página Inicial

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "index.html"));

});

// Dashboard

app.get("/dashboard", (req, res) => {

    res.sendFile(path.join(__dirname, "admin", "dashboard.html"));

});

// Membros

app.get("/membros", (req, res) => {

    res.sendFile(path.join(__dirname, "admin", "membros.html"));

});

// Cadastro

app.get("/cadastro", (req, res) => {

    res.sendFile(path.join(__dirname, "admin", "cadastro.html"));

});

// Perfil

app.get("/perfil", (req, res) => {

    res.sendFile(path.join(__dirname, "admin", "perfil.html"));

});

// app.get("/carteirinha", (req, res) => {

//     res.sendFile(
//         path.join(__dirname, "admin", "carteirinha.html")
//     );

// });

// scanear 

app.get("/scanner", (req, res) => {

    res.sendFile(
        path.join(__dirname, "admin", "scanner.html")
    );

});

// Validar Credencial

app.get("/validar", (req, res) => {
    
    res.sendFile(path.join(__dirname, "admin", "validar.html"));
    
});


// =========================
// ROTA NÃO ENCONTRADA
// =========================

app.use((req, res) => {

    return res.status(404).json({

        success: false,

        message: "Rota não encontrada."

    });

});

// =========================
// INICIAR SERVIDOR
// =========================

app.listen(PORT, () => {

    console.log("======================================");

    console.log("🚀 Servidor iniciado com sucesso!");

    console.log(`🌐 http://localhost:${PORT}`);

    console.log("======================================");

});

// =========================
// CONEXÃO COM O POSTGRESQL
// =========================

pool.connect()

    .then(() => {

        console.log("🗄️ PostgreSQL conectado com sucesso!");

    })

    .catch((erro) => {

        console.error("[DATABASE]", erro);

    });

    // =========================
// MIDDLEWARE DE ERROS
// =========================

app.use(errorMiddleware);