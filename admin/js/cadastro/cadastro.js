// =====================================
// CADASTRO DE MEMBROS
// cadastro.js
// =====================================

// =====================================
// ELEMENTOS
// =====================================

const formulario =
    document.getElementById("formCadastro");

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");

// =====================================
// CAMPOS
// =====================================

const campoNome =
    document.getElementById("nome");

const campoTelefone =
    document.getElementById("telefone");

const campoEmail =
    document.getElementById("email");

const campoEndereco =
    document.getElementById("endereco");

const campoCargo =
    document.getElementById("cargo");

const campoMinisterio =
    document.getElementById("ministerio");

const campoSexo =
    document.getElementById("sexo");

const campoEstadoCivil =
    document.getElementById("estadoCivil");

const campoDataNascimento =
    document.getElementById("dataNascimento");

const campoObservacoes =
    document.getElementById("observacoes");

const erroData =
    document.getElementById("erroData");

// =====================================
// UTILITÁRIOS
// =====================================

function limparErroData() {

    erroData.textContent = "";

    campoDataNascimento.classList.remove(

        "input-erro",

        "input-sucesso"

    );

}

function mostrarErroData(mensagem) {

    limparErroData();

    erroData.textContent = mensagem;

    campoDataNascimento.classList.add(

        "input-erro"

    );

}

function marcarDataValida() {

    limparErroData();

    campoDataNascimento.classList.add(

        "input-sucesso"

    );

}

// =====================================
// OBTER DADOS DO FORMULÁRIO
// =====================================

function obterDadosFormulario(dataNascimento) {

    return {

        nome:

            campoNome.value.trim(),

        telefone:

            campoTelefone.value.trim(),

        email:

            campoEmail.value.trim(),

        endereco:

            campoEndereco.value.trim(),

        cargo:

            campoCargo.value,

        ministerio:

            campoMinisterio.value,

        sexo:

            campoSexo.value,

        estadoCivil:

            campoEstadoCivil.value,

        dataNascimento,

        observacoes:

            campoObservacoes.value.trim()

    };

}

// =====================================
// LIMPAR FORMULÁRIO
// =====================================

function limparFormulario() {

    formulario.reset();

    limparErroData();

}

// =====================================
// MODO EDIÇÃO
// =====================================

function estaEditando() {

    return id !== null;

}

// =====================================
// MÁSCARA DA DATA
// =====================================

function aplicarMascaraData() {

    let valor = campoDataNascimento.value

        .replace(/\D/g, "")

        .slice(0, 8);

    if (valor.length > 4) {

        valor =

            `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;

    }

    else if (valor.length > 2) {

        valor =

            `${valor.slice(0, 2)}/${valor.slice(2)}`;

    }

    campoDataNascimento.value = valor;

}

// =====================================
// MÁSCARA DO TELEFONE
// =====================================

function aplicarMascaraTelefone() {

    let valor = campoTelefone.value

        .replace(/\D/g, "")

        .slice(0, 11);

    if (valor.length > 10) {

        valor = valor.replace(

            /^(\d{2})(\d{5})(\d{4})$/,

            "($1) $2-$3"

        );

    }

    else if (valor.length > 6) {

        valor = valor.replace(

            /^(\d{2})(\d{4})(\d+)/,

            "($1) $2-$3"

        );

    }

    else if (valor.length > 2) {

        valor = valor.replace(

            /^(\d{2})(\d+)/,

            "($1) $2"

        );

    }

    campoTelefone.value = valor;

}

// =====================================
// VALIDAR NOME
// =====================================

function validarNome() {

    return campoNome.value.trim().length >= 3;

}

// =====================================
// VALIDAR TELEFONE
// =====================================

function validarTelefone() {

    const telefone =

        campoTelefone.value.replace(/\D/g, "");

    return (

        telefone.length === 10 ||

        telefone.length === 11

    );

}

// =====================================
// VALIDAR E-MAIL
// =====================================

function validarEmail() {

    const email =

        campoEmail.value.trim();

    if (email === "") {

        return true;

    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

// =====================================
// VALIDAR DATA
// =====================================

function validarDataNascimento() {

    const valor =

        campoDataNascimento.value.trim();

    if (!valor) {

        limparErroData();

        return null;

    }

    const partes = valor.split("/");

    if (partes.length !== 3) {

        mostrarErroData(

            "Data inválida."

        );

        return false;

    }

    const [

        dia,

        mes,

        ano

    ] = partes.map(Number);

    const data =

        new Date(ano, mes - 1, dia);

    if (

        data.getFullYear() !== ano ||

        data.getMonth() !== mes - 1 ||

        data.getDate() !== dia

    ) {

        mostrarErroData(

            "Data inválida."

        );

        return false;

    }

    if (data > new Date()) {

        mostrarErroData(

            "A data não pode ser futura."

        );

        return false;

    }

    marcarDataValida();

    return `${ano}-${

        String(mes).padStart(2, "0")

    }-${

        String(dia).padStart(2, "0")

    }`;

}

// =====================================
// VALIDAR FORMULÁRIO
// =====================================

function validarFormulario() {

    if (!validarNome()) {

        alert(

            "Informe um nome válido."

        );

        campoNome.focus();

        return false;

    }

    if (!validarTelefone()) {

        alert(

            "Informe um telefone válido."

        );

        campoTelefone.focus();

        return false;

    }

    if (!validarEmail()) {

        alert(

            "Informe um e-mail válido."

        );

        campoEmail.focus();

        return false;

    }

    return validarDataNascimento();

}

// =====================================
// FORMATAR DATA
// =====================================

function formatarData(data) {

    if (!data) {

        return "";

    }

    const dataFormatada = new Date(data);

    const dia = String(

        dataFormatada.getDate()

    ).padStart(2, "0");

    const mes = String(

        dataFormatada.getMonth() + 1

    ).padStart(2, "0");

    const ano = dataFormatada.getFullYear();

    return `${dia}/${mes}/${ano}`;

}

// =====================================
// PREENCHER FORMULÁRIO
// =====================================

function preencherFormulario(membro) {

    campoNome.value =
        membro.nome || "";

    campoTelefone.value =
        membro.telefone || "";

    campoEmail.value =
        membro.email || "";

    campoEndereco.value =
        membro.endereco || "";

    campoCargo.value =
        membro.cargo || "";

    campoMinisterio.value =
        membro.ministerio || "";

    campoSexo.value =
        membro.sexo || "";

    campoEstadoCivil.value =
        membro.estado_civil || "";

    campoObservacoes.value =
        membro.observacoes || "";

    campoDataNascimento.value =
        formatarData(

            membro.data_nascimento

        );

}

// =====================================
// CARREGAR MEMBRO
// =====================================

async function carregarMembro() {

    if (!estaEditando()) {

        return;

    }

    try {

        const resposta =

            await fetch(

                `/api/membros/${id}`

            );

        const resultado =

            await resposta.json();

        if (!resultado.success) {

            throw new Error(

                resultado.message

            );

        }

        preencherFormulario(

            resultado.data

        );

    }

    catch (erro) {

        console.error(

            "[CADASTRO]",

            erro

        );

        alert(

            "Erro ao carregar o membro."

        );

        window.location.href =

            "/membros";

    }

}

// =====================================
// SALVAR MEMBRO
// =====================================

async function salvarMembro(event) {

    event.preventDefault();

    const dataNascimento =
        validarFormulario();

    if (dataNascimento === false) {

        return;

    }

    const dados =
        obterDadosFormulario(dataNascimento);

    const url = estaEditando()

        ? `/api/membros/${id}`

        : "/api/membros";

    const metodo = estaEditando()

        ? "PUT"

        : "POST";

    try {

        const resposta =

            await fetch(url, {

                method: metodo,

                headers: {

                    "Content-Type":

                        "application/json"

                },

                body:

                    JSON.stringify(dados)

            });

        const resultado =

            await resposta.json();

        if (!resposta.ok) {

            throw new Error(

                resultado.message ||

                "Erro ao salvar o membro."

            );

        }

        alert(

            resultado.message

        );

        if (estaEditando()) {

            window.location.href =
                "/membros";

            return;

        }

        limparFormulario();

        campoNome.focus();

    }

    catch (erro) {

        console.error(

            "[CADASTRO]",

            erro

        );

        alert(

            erro.message ||

            "Erro ao salvar o membro."

        );

    }

}

// =====================================
// EVENTOS
// =====================================

campoTelefone.addEventListener(

    "input",

    aplicarMascaraTelefone

);

campoDataNascimento.addEventListener(

    "input",

    aplicarMascaraData

);

formulario.addEventListener(

    "submit",

    salvarMembro

);

// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        carregarMembro();

    }

);