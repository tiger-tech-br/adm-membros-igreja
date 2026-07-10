// =========================
// ELEMENTOS
// =========================

const campoNome =
    document.getElementById("nome");

const campoCargo =
    document.getElementById("cargo");

const campoMatricula =
    document.getElementById("matricula");

const campoValidade =
    document.getElementById("validade");

const campoTelefone =
    document.getElementById("telefone");

const campoEmail =
    document.getElementById("email");

const campoNascimento =
    document.getElementById("nascimento");

const campoEndereco =
    document.getElementById("endereco");

const campoMinisterio =
    document.getElementById("ministerio");

const campoSexo =
    document.getElementById("sexo");

const campoEstadoCivil =
    document.getElementById("estadoCivil");

const campoObservacoes =
    document.getElementById("observacoes");

const qrCode =
    document.getElementById("qrCode");

const infoEmail =
    campoEmail.closest(".info");

const infoObservacoes =
    campoObservacoes.closest(".info");

// =========================
// VARIÁVEIS
// =========================

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");


// =========================
// UTILITÁRIOS
// =========================

function formatarData(data) {

    if (!data) {

        return "Não informado";

    }

    return new Date(data)
        .toLocaleDateString("pt-BR");

}

function mostrarCampo(info, campo, valor) {

    if (valor && valor.trim() !== "") {

        campo.textContent = valor;

        info.style.display = "flex";

    } else {

        info.style.display = "none";

    }

}

// =========================
// RENDERIZAR PERFIL
// =========================

function renderizarPerfil(membro) {

    campoNome.textContent =
        membro.nome;

    campoCargo.textContent =
        membro.cargo || "Não informado";

    campoMatricula.textContent =
        membro.matricula || "Não informada";

    campoValidade.textContent =
        formatarData(membro.validade);

    campoTelefone.textContent =
        membro.telefone || "Não informado";

    campoNascimento.textContent =
        formatarData(membro.data_nascimento);

    campoEndereco.textContent =
        membro.endereco || "Não informado";

    campoMinisterio.textContent =
        membro.ministerio || "Não informado";

    campoSexo.textContent =
        membro.sexo || "Não informado";

    campoEstadoCivil.textContent =
        membro.estado_civil || "Não informado";

    mostrarCampo(

        infoEmail,

        campoEmail,

        membro.email

    );

    mostrarCampo(

        infoObservacoes,

        campoObservacoes,

        membro.observacoes

    );

    qrCode.src =
        membro.qr_code || "/images/qrcode-exemplo.png";

}

// =========================
// CARREGAR PERFIL
// =========================

async function carregarPerfil() {

    try {

        const resposta =
            await fetch(`/api/membros/${id}`);

        const resultado =
            await resposta.json();

        if (!resultado.success) {

            alert(resultado.message);

            return;

        }

        renderizarPerfil(

            resultado.data

        );

    } catch (erro) {

        console.error("[PERFIL]", erro);

        alert("Erro ao carregar o perfil do membro.");

    }

}

// =========================
// INICIALIZAÇÃO
// =========================

document.addEventListener("DOMContentLoaded", () => {

    carregarPerfil();

});