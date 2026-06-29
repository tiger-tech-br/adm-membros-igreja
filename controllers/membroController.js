const membroModel = require("../models/membroModel");
const qrCodeService = require("../services/qrCodeService");

const fs = require("fs");
const path = require("path");

class MembroController {

        async criar(req, res) {

    try {

        if (!req.body.nome) {

            return res.status(400).json({

                success: false,

                message: "O nome do membro é obrigatório."

            });

        }

        // Salva o caminho da foto enviada
        if (req.file) {

            req.body.foto = req.file.path;

        }

        // Cria o membro
        const membro = await membroModel.criar(req.body);

        // Gera o QR Code
        const caminhoQRCode = await qrCodeService.gerarQRCode(membro.id);

        // Salva o caminho no banco
        await membroModel.atualizarQRCode(

            membro.id,

            caminhoQRCode

        );

        // Atualiza o objeto retornado
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

            message: "Erro interno ao cadastrar o membro."

        });

    }

}
    async listar(req, res) {

        try {

            const membros = await membroModel.listar();

            return res.status(200).json({

                success: true,

                message: "Membros carregados com sucesso.",

                data: membros

            });

        } catch (erro) {

            console.error("[MEMBRO_CONTROLLER][LISTAR]", erro);

            return res.status(500).json({

                success: false,

                message: "Erro interno ao listar os membros."

            });

        }

    }

        async buscarPorId(req, res) {

                try {

                    const { id } = req.params;



                    const membro = await membroModel.buscarPorId(id);

                    console.log("VALOR DO QR:", membro.qr_code);
                    console.log("TIPO:", typeof membro.qr_code);

                    if (!membro) {

                        return res.status(404).json({

                            success: false,

                            message: "Membro não encontrado."

                        });

                    }

                    // Gera QR Code automaticamente para membros antigos

                    console.log(">>> buscarPorId executado para o ID:", req.params.id);

                        const caminhoArquivo = membro.qr_code
                            ? path.join(__dirname, "..", membro.qr_code.replace(/^\//, ""))
                            : null;

                        const arquivoExiste = caminhoArquivo
                            ? fs.existsSync(caminhoArquivo)
                            : false;

                        if (!arquivoExiste) {

                            console.log("QR Code não encontrado. Gerando novamente...");

                            const caminhoQRCode = await qrCodeService.gerarQRCode(membro.id);

                            await membroModel.atualizarQRCode(
                                membro.id,
                                caminhoQRCode
                            );

                            membro.qr_code = caminhoQRCode;

                        }

                    return res.status(200).json({

                        success: true,

                        message: "Membro encontrado.",

                        data: membro

                    });

                } catch (erro) {

                    console.error("[MEMBRO_CONTROLLER][BUSCAR_POR_ID]", erro);

                    return res.status(500).json({

                        success: false,

                        message: "Erro ao buscar o membro."

                    });

                }

    }

    async atualizar(req, res) {

        try {

            const { id } = req.params;

            // Salva o caminho da nova foto, caso tenha sido enviada
            if (req.file) {

                req.body.foto = req.file.path;

            }

            const membro = await membroModel.atualizar(id, req.body);

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

            console.error("[MEMBRO_CONTROLLER][ATUALIZAR]", erro);

            return res.status(500).json({

                success: false,

                message: "Erro ao atualizar o membro."

            });

        }

    }

    async excluir(req, res) {

        try {

            const { id } = req.params;

            const membro = await membroModel.excluir(id);

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

            console.error("[MEMBRO_CONTROLLER][EXCLUIR]", erro);

            return res.status(500).json({

                success: false,

                message: "Erro ao excluir o membro."

            });

        }

    }

    async validar(req, res) {

    try {

        const { id } = req.params;

        const membro = await membroModel.buscarPorId(id);

        if (!membro) {

            return res.status(404).json({

                success: false,

                message: "Membro não encontrado."

            });

        }

        return res.status(200).json({

            success: true,

            data: membro

        });

    } catch (erro) {

        console.error("[MEMBRO_CONTROLLER][VALIDAR]", erro);

        return res.status(500).json({

            success: false,

            message: "Erro ao validar credencial."

        });

    }

}

}

module.exports = new MembroController();