const formulario = document.querySelector("#formCadastro");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

// =====================================
// ELEMENTOS
// =====================================

const inputFoto = document.querySelector("#foto");
const preview = document.querySelector("#preview");

const campoData = document.querySelector("#dataNascimento");
const erroData = document.querySelector("#erroData");

const textoFoto = document.querySelector(".foto-preview span");

// =====================================
// CARREGAR MEMBRO
// =====================================

async function carregarMembro() {

    if (!id) return;

    try {

        const resposta = await fetch(`/api/membros/${id}`);

        const resultado = await resposta.json();

        if (!resultado.success) {

            alert(resultado.message);

            return;

        }

        const membro = resultado.data;

        preencherFormulario(membro);

    } catch (erro) {

        console.error("[CARREGAR_MEMBRO]", erro);

    }

}

// =====================================
// PREENCHER FORMULÁRIO
// =====================================

function preencherFormulario(membro) {

    document.querySelector("#nome").value =
        membro.nome || "";

    document.querySelector("#telefone").value =
        membro.telefone || "";

    document.querySelector("#email").value =
        membro.email || "";

    document.querySelector("#endereco").value =
        membro.endereco || "";

    document.querySelector("#cargo").value =
        membro.cargo || "Membro";

    document.querySelector("#ministerio").value =
        membro.ministerio || "Outro";

    document.querySelector("#sexo").value =
        membro.sexo || "Masculino";

    document.querySelector("#estadoCivil").value =
        membro.estado_civil || "Solteiro(a)";

    document.querySelector("#status").value =
        membro.status || "Ativo";

    document.querySelector("#observacoes").value =
        membro.observacoes || "";

    if (membro.data_nascimento) {

        const [ano, mes, dia] =
            membro.data_nascimento
                .split("T")[0]
                .split("-");

        campoData.value =
            `${dia}/${mes}/${ano}`;

    }

    if (membro.foto) {

        preview.src = membro.foto;

        if (textoFoto) {

            textoFoto.style.display = "none";

        }

    }

}

carregarMembro();

// =====================================
// PREVIEW DA FOTO
// =====================================

inputFoto.addEventListener("change", (event) => {

    const arquivo = event.target.files[0];

    if (!arquivo) return;

    preview.src = URL.createObjectURL(arquivo);

    if (textoFoto) {

        textoFoto.style.display = "none";

    }

});

// =====================================
// MÁSCARA DA DATA
// =====================================

campoData.addEventListener("input", aplicarMascaraData);

campoData.addEventListener("focus", limparErroData);

function aplicarMascaraData() {

    let valor = campoData.value;

    // Permite apenas números
    valor = valor.replace(/\D/g, "");

    // Limita em 8 dígitos
    valor = valor.substring(0, 8);

    // Adiciona a primeira barra
    if (valor.length > 2) {

        valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");

    }

    // Adiciona a segunda barra
    if (valor.length > 5) {

        valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    }

    campoData.value = valor;

    limparErroData();

}

// =====================================
// LIMPAR ERRO
// =====================================

function limparErroData() {

    erroData.textContent = "";

    campoData.classList.remove("input-erro");

    campoData.classList.remove("input-sucesso");

}

// =====================================
// VALIDAR DATA
// =====================================

function validarDataNascimento() {

    limparErroData();

    const dataDigitada = campoData.value.trim();

    // Campo opcional
    if (dataDigitada === "") {

        return null;

    }

    // Deve possuir exatamente 10 caracteres
    if (dataDigitada.length !== 10) {

        mostrarErroData("Digite a data completa.");

        return false;

    }

    const [dia, mes, ano] =
        dataDigitada.split("/").map(Number);

    // Ano mínimo

    if (ano < 1900) {

        mostrarErroData("Ano inválido.");

        return false;

    }

    const data = new Date(ano, mes - 1, dia);

    // Data inexistente

    if (

        data.getDate() !== dia ||

        data.getMonth() !== mes - 1 ||

        data.getFullYear() !== ano

    ) {

        mostrarErroData("Data inválida.");

        return false;

    }

    // Data futura

    if (data > new Date()) {

        mostrarErroData("A data não pode ser futura.");

        return false;

    }

    campoData.classList.add("input-sucesso");

    return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

}

// =====================================
// MOSTRAR ERRO
// =====================================

function mostrarErroData(mensagem) {

    erroData.textContent = mensagem;

    campoData.classList.add("input-erro");

}

// =====================================
// SALVAR
// =====================================

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    // ===============================
    // DADOS
    // ===============================

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();

    if (!nome) {

        alert("Informe o nome do membro.");

        return;

    }

    if (!telefone) {

        alert("Informe o telefone.");

        return;

    }

    // ===============================
    // DATA
    // ===============================

    const dataNascimento = validarDataNascimento();

    if (dataNascimento === false) {

        return;

    }

    // ===============================
    // MONTA O FORMDATA
    // ===============================

    const formData = new FormData();

    formData.append("nome", nome);

    if (dataNascimento !== null) {

        formData.append("dataNascimento", dataNascimento);

    }

    formData.append(
        "telefone",
        telefone
    );

    formData.append(
        "email",
        document.querySelector("#email").value.trim()
    );

    formData.append(
        "endereco",
        document.querySelector("#endereco").value.trim()
    );

    formData.append(
        "cargo",
        document.querySelector("#cargo").value
    );

    formData.append(
        "ministerio",
        document.querySelector("#ministerio").value
    );

    formData.append(
        "sexo",
        document.querySelector("#sexo").value
    );

    formData.append(
        "estadoCivil",
        document.querySelector("#estadoCivil").value
    );

    formData.append(
        "status",
        document.querySelector("#status").value
    );

    formData.append(
        "observacoes",
        document.querySelector("#observacoes").value.trim()
    );

    // ===============================
    // FOTO
    // ===============================

    if (inputFoto.files.length > 0) {

        formData.append(

            "foto",

            inputFoto.files[0]

        );

    }

    // ===============================
    // DEFINIR URL
    // ===============================

    let url = "/api/membros";

    let metodo = "POST";

    if (id) {

        url = `/api/membros/${id}`;

        metodo = "PUT";

    }

    // ===============================
    // ENVIAR
    // ===============================

    try {

        const resposta = await fetch(url, {

            method: metodo,

            body: formData

        });

        const resultado = await resposta.json();

        if (!resposta.ok) {

            alert(resultado.message);

            return;

        }

        alert(resultado.message);

        window.location.href = "/membros";

    } catch (erro) {

        console.error("[CADASTRO]", erro);

        alert("Erro ao conectar ao servidor.");

    }

});

// =====================================
// MELHORIAS
// =====================================

// Esconde o texto quando já existe uma foto

if (preview.getAttribute("src") !== "/images/user.png") {

    if (textoFoto) {

        textoFoto.style.display = "none";

    }

}

// Caso a imagem não exista

preview.onerror = () => {

    preview.src = "/images/user.png";

    if (textoFoto) {

        textoFoto.style.display = "block";

    }

};

// Libera memória do preview

preview.onload = () => {

    if (

        preview.src.startsWith("blob:")

    ) {

        URL.revokeObjectURL(preview.src);

    }

};

// =====================================
// ENTER
// =====================================

// Impede enviar o formulário acidentalmente
// pressionando Enter em qualquer campo.

formulario.addEventListener("keydown", (event) => {

    if (

        event.key === "Enter" &&

        event.target.tagName !== "TEXTAREA"

    ) {

        event.preventDefault();

    }

});

// =====================================
// TELEFONE
// =====================================

// Máscara simples para telefone

const campoTelefone = document.querySelector("#telefone");

campoTelefone.addEventListener("input", () => {

    let valor = campoTelefone.value;

    valor = valor.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length > 2) {

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");

    }

    if (valor.length > 10) {

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    } else if (valor.length > 9) {

        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

    }

    campoTelefone.value = valor;

});

// =====================================
// LIMPAR FORMULÁRIO
// =====================================

formulario.addEventListener("reset", () => {

    preview.src = "/images/user.png";

    if (textoFoto) {

        textoFoto.style.display = "block";

    }

    limparErroData();

});