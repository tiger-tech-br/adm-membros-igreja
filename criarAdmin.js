// =====================================
// IMPORTAÇÕES
// =====================================

require("dotenv").config();

const bcrypt =
    require("bcrypt");

const pool =
    require("./database/connection");

// =====================================
// DADOS DO ADMINISTRADOR
// =====================================

const nome =
    "Administrador";

const email =
    "admin@igreja.com";

const senha =
    "Admin123";

// =====================================
// CRIAR ADMINISTRADOR
// =====================================

async function criarAdministrador() {

    try {

        const senhaCriptografada =
            await bcrypt.hash(

                senha,

                10

            );

        await pool.query(

            `

            INSERT INTO administradores (

                nome,

                email,

                senha

            )

            VALUES (

                $1,

                $2,

                $3

            )

            `,

            [

                nome,

                email,

                senhaCriptografada

            ]

        );

        console.log(

            "======================================"

        );

        console.log(

            "✅ Administrador criado com sucesso!"

        );

        console.log(

            `📧 E-mail: ${email}`

        );

        console.log(

            `🔑 Senha: ${senha}`

        );

        console.log(

            "======================================"

        );

    } catch (erro) {

        console.error(

            "[CRIAR_ADMIN]",

            erro

        );

    } finally {

        await pool.end();

    }

}

// =====================================
// EXECUTAR
// =====================================

criarAdministrador();