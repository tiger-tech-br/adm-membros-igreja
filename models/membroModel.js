// =====================================
// IMPORTAÇÃO
// =====================================

const pool =
    require("../database/connection");

// =====================================
// CLASSE
// =====================================

class MembroModel {

    // =====================================
    // CRIAR
    // =====================================

    async criar(dados) {

        const {

            nome,
            dataNascimento,
            telefone,
            email,
            endereco,
            cargo,
            ministerio,
            sexo,
            estadoCivil,
            observacoes,
            matricula,
            validade

        } = dados;

        const sql = `

            INSERT INTO membros (

                nome,
                data_nascimento,
                telefone,
                email,
                endereco,
                cargo,
                ministerio,
                sexo,
                estado_civil,
                observacoes,
                matricula,
                validade

            )

            VALUES (

                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12

            )

            RETURNING *;

        `;

        const valores = [

            nome,

            dataNascimento || null,

            telefone,

            email,

            endereco,

            cargo,

            ministerio,

            sexo,

            estadoCivil,

            observacoes,

            matricula,

            validade

        ];

        try {

            const resultado =
                await pool.query(sql, valores);

            return resultado.rows[0];

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][CRIAR]",

                erro

            );

            throw erro;

        }

    }


        // =====================================
    // LISTAR
    // =====================================

    async listar() {

        const sql = `

            SELECT *

            FROM membros

            ORDER BY nome;

        `;

        try {

            const resultado =
                await pool.query(sql);

            return resultado.rows;

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][LISTAR]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // BUSCAR POR ID
    // =====================================

    async buscarPorId(id) {

        const sql = `

            SELECT *

            FROM membros

            WHERE id = $1;

        `;

        try {

            const resultado =
                await pool.query(

                    sql,

                    [id]

                );

            return resultado.rows[0];

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][BUSCAR_POR_ID]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // BUSCAR POR MATRÍCULA
    // =====================================

    async buscarPorMatricula(matricula) {

        const sql = `

            SELECT id

            FROM membros

            WHERE matricula = $1

            LIMIT 1;

        `;

        try {

            const resultado =
                await pool.query(

                    sql,

                    [matricula]

                );

            return resultado.rows[0] || null;

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][BUSCAR_MATRICULA]",

                erro

            );

            throw erro;

        }

    }

        // =====================================
    // ATUALIZAR
    // =====================================

    async atualizar(id, dados) {

        const {

            nome,
            dataNascimento,
            telefone,
            email,
            endereco,
            cargo,
            ministerio,
            sexo,
            estadoCivil,
            observacoes

        } = dados;

        const sql = `

            UPDATE membros

            SET

                nome = $1,
                data_nascimento = $2,
                telefone = $3,
                email = $4,
                endereco = $5,
                cargo = $6,
                ministerio = $7,
                sexo = $8,
                estado_civil = $9,
                observacoes = $10
                

            WHERE id = $11

            RETURNING *;

        `;

        const valores = [

            nome,

            dataNascimento || null,

            telefone,

            email,

            endereco,

            cargo,

            ministerio,

            sexo,

            estadoCivil,

            observacoes,

            id

        ];

        try {

            const resultado =
                await pool.query(

                    sql,

                    valores

                );

            return resultado.rows[0];

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][ATUALIZAR]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // EXCLUIR
    // =====================================

    async excluir(id) {

        const sql = `

            DELETE FROM membros

            WHERE id = $1

            RETURNING *;

        `;

        try {

            const resultado =
                await pool.query(

                    sql,

                    [id]

                );

            return resultado.rows[0];

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][EXCLUIR]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // ATUALIZAR QR CODE
    // =====================================


    async atualizarQRCode(id, qrCode) {

        const sql = `

            UPDATE membros

            SET qr_code = $1

            WHERE id = $2

            RETURNING *;

        `;

        try {

            const resultado =
                await pool.query(

                    sql,

                    [

                        qrCode,

                        id

                    ]

                );

            return resultado.rows[0];

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][ATUALIZAR_QRCODE]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // LISTAR SEM MATRÍCULA
    // =====================================

    async listarSemMatricula() {

        const sql = `

            SELECT *

            FROM membros

            WHERE matricula IS NULL

               OR validade IS NULL;

        `;

        try {

            const resultado =
                await pool.query(sql);

            return resultado.rows;

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][LISTAR_SEM_MATRICULA]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // ATUALIZAR MATRÍCULA E VALIDADE
    // =====================================

    async atualizarMatriculaValidade(

        id,

        matricula,

        validade

    ) {

        const sql = `

            UPDATE membros

            SET

                matricula = $1,

                validade = $2

            WHERE id = $3;

        `;

        try {

            await pool.query(

                sql,

                [

                    matricula,

                    validade,

                    id

                ]

            );

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][ATUALIZAR_MATRICULA]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // ÚLTIMOS MEMBROS
    // =====================================

    async listarUltimos(limit = 5) {

        const sql = `

            SELECT

                id,

                nome,

                cargo

            FROM membros

            ORDER BY id DESC

            LIMIT $1;

        `;

        try {

            const resultado =
                await pool.query(

                    sql,

                    [limit]

                );

            return resultado.rows;

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][ULTIMOS]",

                erro

            );

            throw erro;

        }

    }

    // =====================================
    // DASHBOARD
    // =====================================

    async dashboard() {

        try {

            const total =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM membros;

                `);

            const ultimos =
                await this.listarUltimos();

            return {

                totalMembros:

                    Number(

                        total.rows[0].total

                    ),

                ultimos

            };

        } catch (erro) {

            console.error(

                "[MEMBRO_MODEL][DASHBOARD]",

                erro

            );

            throw erro;

        }

    }

}

// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = new MembroModel();