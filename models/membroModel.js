const pool = require("../database/connection");

class MembroModel {

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
        status,
        observacoes,
        foto

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
            status,
            observacoes,
            foto

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
        status,
        observacoes,
        foto

    ];

    try {

        const resultado = await pool.query(sql, valores);

        return resultado.rows[0];

    } catch (erro) {

        console.error("[MEMBRO_MODEL][CRIAR]", erro);

        throw erro;

    }

}

    async listar() {

        const sql = `

            SELECT *

            FROM membros

            ORDER BY nome;

        `;

        try {

            const resultado = await pool.query(sql);

            return resultado.rows;

        } catch (erro) {

            console.error("[MEMBRO_MODEL][LISTAR]", erro);

            throw erro;

        }

    }

    async buscarPorId(id) {

    const sql = `

        SELECT *

        FROM membros

        WHERE id = $1;

    `;

    try {

        const resultado = await pool.query(sql, [id]);

        return resultado.rows[0];

    } catch (erro) {

        console.error("[MEMBRO_MODEL][BUSCAR_POR_ID]", erro);

        throw erro;

    }

}

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
        status,
        observacoes,
        foto

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
            status = $10,
            observacoes = $11,
            foto = $12

        WHERE id = $13

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
        status,
        observacoes,
        foto,
        id

    ];

    try {

        const resultado = await pool.query(sql, valores);

        return resultado.rows[0];

    } catch (erro) {

        console.error("[MEMBRO_MODEL][ATUALIZAR]", erro);

        throw erro;

    }

}

async excluir(id) {

    const sql = `

        DELETE FROM membros

        WHERE id = $1

        RETURNING *;

    `;

    try {

        const resultado = await pool.query(sql, [id]);

        return resultado.rows[0];

    } catch (erro) {

        console.error("[MEMBRO_MODEL][EXCLUIR]", erro);

        throw erro;

    }

}

    async atualizarQRCode(id, qrCode) {

        const sql = `

            UPDATE membros

            SET qr_code = $1

            WHERE id = $2

            RETURNING *;

        `;

        try {

            const resultado = await pool.query(sql, [qrCode, id]);

            return resultado.rows[0];

        } catch (erro) {

            console.error("[MEMBRO_MODEL][ATUALIZAR_QRCODE]", erro);

            throw erro;

        }

    }
}

module.exports = new MembroModel();