// =====================================
// IMPORTAÇÕES
// =====================================

const fs = require("fs");
const path = require("path");

const membroModel =
    require("../models/membroModel");

const qrCodeService =
    require("../services/qrCodeService");

const gerarMatricula =
    require("../utils/matricula");

const gerarValidade =
    require("../utils/validade");


    async function gerarMatriculaUnica() {

    let matricula;

    let existe = true;

    while (existe) {

        matricula = gerarMatricula();

        existe =
            await membroModel.buscarPorMatricula(
                matricula
            );

    }

    return matricula;

}



    async function garantirQRCode(membro) {

    if (!membro.qr_code) {

        const caminhoQRCode =
            await qrCodeService.gerarQRCode(
                membro.id
            );

        await membroModel.atualizarQRCode(

            membro.id,

            caminhoQRCode

        );

        membro.qr_code = caminhoQRCode;

        return membro;

    }

    const caminhoArquivo = path.join(

        __dirname,

        "..",

        membro.qr_code.replace(/^\//, "")

    );

    if (fs.existsSync(caminhoArquivo)) {

        return membro;

    }

    const caminhoQRCode =
        await qrCodeService.gerarQRCode(
            membro.id
        );

    await membroModel.atualizarQRCode(

        membro.id,

        caminhoQRCode

    );

    membro.qr_code = caminhoQRCode;

    return membro;

}


console.log({

    matricula: req.body.matricula,

    validade: req.body.validade

});
    // =====================================
    // CRIAR
    // =====================================

    async function criar(req, res) {

    try {

        if (!req.body.nome) {

            return res.status(400).json({

                success: false,

                message: "O nome do membro é obrigatório."

            });

        }

        req.body.matricula =
            await gerarMatriculaUnica();

        req.body.validade =
            gerarValidade();

        const membro =
            await membroModel.criar(req.body);

        const caminhoQRCode =
            await qrCodeService.gerarQRCode(
                membro.id
            );

        await membroModel.atualizarQRCode(

            membro.id,

            caminhoQRCode

        );

        membro.qr_code = caminhoQRCode;

        return res.status(201).json({

            success: true,

            message: "Membro cadastrado com sucesso.",

            data: membro

        });

        } catch (erro) {

        console.error("[MEMBRO_CONTROLLER][CRIAR]", erro);

        return res.status(500).json({

            success: false,

            message: erro.message

        });

    }

}


        // =====================================
    // LISTAR
    // =====================================

    async function listar(req, res) {

        try {

            const membros =
                await membroModel.listar();

            return res.status(200).json({

                success: true,

                message: "Membros carregados com sucesso.",

                data: membros

            });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][LISTAR]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro interno ao listar os membros."

            });

        }

    }

    // =====================================
    // BUSCAR POR ID
    // =====================================


        async function buscarPorId(req, res) {

            try {

                const { id } = req.params;

                let membro =
                    await membroModel.buscarPorId(id);

                if (!membro) {

                    return res.status(404).json({

                        success: false,

                        message: "Membro não encontrado."

                    });

                }

                membro =
                    await garantirQRCode(membro);

                return res.status(200).json({

                    success: true,

                    message: "Membro encontrado.",

                    data: membro

                });

            } catch (erro) {

                console.error(

                    "[MEMBRO_CONTROLLER][BUSCAR_POR_ID]",

                    erro

                );

                return res.status(500).json({

                    success: false,

                    message: "Erro ao buscar o membro."

            });

            }

}

        // =====================================
    // ATUALIZAR
    // =====================================

    async function atualizar(req, res) {

        try {

            const { id } = req.params;

            const membro =
                await membroModel.atualizar(

                    id,

                    req.body

                );

            if (!membro) {

                return res.status(404).json({

                    success: false,

                    message: "Membro não encontrado."

                });

            }

            return res.status(200).json({

                success: true,

                message: "Membro atualizado com sucesso.",

                data: membro

            });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][ATUALIZAR]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro ao atualizar o membro."

            });

        }

    }

    // =====================================
    // EXCLUIR
    // =====================================

    async function excluir(req, res) {

        try {

            const { id } = req.params;

            const membro =
                await membroModel.excluir(id);

            if (!membro) {

                return res.status(404).json({

                    success: false,

                    message: "Membro não encontrado."

                });

            }

            return res.status(200).json({

                success: true,

                message: "Membro excluído com sucesso."

            });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][EXCLUIR]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro ao excluir o membro."

            });

        }

    }

    // =====================================
    // VALIDAR
    // =====================================

        // =====================================
    // VALIDAR CREDENCIAL
    // =====================================

    async function validar(req, res) {

        try {

            const { id } = req.params;

            const membro =
            await membroModel.buscarPorId(id);

            if (!membro) {

                return res.status(404).json({

                    success: false,

                    message: "Membro não encontrado."

                });

}

        await garantirQRCode(membro);

        return res.status(200).json({

            success: true,

            data: membro

        });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][VALIDAR]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro ao validar a credencial."

            });

        }

    }

    // =====================================
    // ÚLTIMOS MEMBROS
    // =====================================

    async function ultimos(req, res) {

        try {

            const membros =
                await membroModel.listarUltimos(5);

            return res.status(200).json({

                success: true,

                data: membros

            });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][ULTIMOS]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro ao buscar os últimos membros."

            });

        }

    }

    // =====================================
    // DASHBOARD
    // =====================================

    async function dashboard(req, res) {

        try {

            const dados =
                await membroModel.dashboard();

            return res.status(200).json({

                success: true,

                data: dados

            });

        } catch (erro) {

            console.error(

                "[MEMBRO_CONTROLLER][DASHBOARD]",

                erro

            );

            return res.status(500).json({

                success: false,

                message: "Erro ao carregar o dashboard."

            });

        }

    }



// =====================================
// EXPORTAÇÃO
// =====================================

module.exports = {

    criar,

    listar,

    buscarPorId,

    atualizar,

    excluir,

    validar,

    ultimos,

    dashboard

};
