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

// =====================================
// CARREGAR MEMBRO (EDIÇÃO)
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

        document.querySelector("#nome").value = membro.nome || "";

            if (membro.data_nascimento) {

                const [ano, mes, dia] =
                membro.data_nascimento.split("T")[0].split("-");

                campoData.value = `${dia}/${mes}/${ano}`;

            }

        document.querySelector("#telefone").value = membro.telefone || "";
        document.querySelector("#email").value = membro.email || "";
        document.querySelector("#endereco").value = membro.endereco || "";
        document.querySelector("#cargo").value = membro.cargo || "Membro";
        document.querySelector("#ministerio").value = membro.ministerio || "Outro";
        document.querySelector("#sexo").value = membro.sexo || "Masculino";
        document.querySelector("#estadoCivil").value =
            membro.estado_civil || "Solteiro(a)";
        document.querySelector("#status").value =
            membro.status || "Ativo";
        document.querySelector("#observacoes").value =
            membro.observacoes || "";

        if (membro.foto) {

            preview.src = membro.foto;

            const textoFoto = document.querySelector(".foto-preview span");

                if (textoFoto) {

                    textoFoto.style.display = "none";

                }

        }

    } catch (erro) {

        console.error("[CARREGAR_MEMBRO]", erro);

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

    const textoFoto = document.querySelector(".foto-preview span");

    if (textoFoto) {

        textoFoto.style.display = "none";

    }

});

// =====================================
// MÁSCARA DA DATA
// =====================================

campoData.addEventListener("input", () => {

    let valor = campoData.value;

    valor = valor.replace(/\D/g, "");

    valor = valor.substring(0, 8);

    if (valor.length > 2) {

        valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");

    }

    if (valor.length > 5) {

        valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    }

    campoData.value = valor;

    erroData.textContent = "";

    campoData.classList.remove("input-erro");
    campoData.classList.remove("input-sucesso");

});

// =====================================
// VALIDAR DATA
// =====================================

function validarDataNascimento() {

    erroData.textContent = "";

    campoData.classList.remove("input-erro");
    campoData.classList.remove("input-sucesso");

    const dataDigitada = campoData.value.trim();

    if (dataDigitada === "") {

        return null;

    }

    if (dataDigitada.length !== 10) {

        campoData.classList.add("input-erro");

        erroData.textContent =
            "Digite a data completa.";

        return false;

    }

    const [dia, mes, ano] =
        dataDigitada.split("/").map(Number);

    const data = new Date(ano, mes - 1, dia);

    if (

        data.getDate() !== dia ||
        data.getMonth() !== mes - 1 ||
        data.getFullYear() !== ano

    ) {

        campoData.classList.add("input-erro");

        erroData.textContent =
            "Data inválida.";

        return false;

    }

    if (data > new Date()) {

        campoData.classList.add("input-erro");

        erroData.textContent =
            "A data não pode ser futura.";

        return false;

    }

    campoData.classList.add("input-sucesso");

    return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

}

// =====================================
// SALVAR
// =====================================

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    // ===============================
    // VALIDAÇÕES
    // ===============================

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();

    if (!nome) {

        return alert("Informe o nome do membro.");

    }

    if (!telefone) {

        return alert("Informe o telefone.");

    }

    
    if (dataNascimento !== null) {

    formData.append("dataNascimento", dataNascimento);

    }

    if (dataNascimento === false) {

        return;

    }

    // ===============================
    // MONTA O FORMDATA
    // ===============================

    const formData = new FormData();

    formData.append("nome", nome);


    formData.append("telefone", telefone);

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

    const foto = inputFoto.files[0];

    if (foto) {

        formData.append("foto", foto);

    }

    // ===============================
    // ENVIO
    // ===============================

    try {

        let url = "/api/membros";
        let metodo = "POST";

        if (id) {

            url = `/api/membros/${id}`;
            metodo = "PUT";

        }

        const resposta = await fetch(url, {

            method: metodo,

            body: formData

        });

        const resultado = await resposta.json();

        if (!resposta.ok) {

            return alert(resultado.message);

        }

        alert(resultado.message);

        window.location.href = "/membros";

    } catch (erro) {

        console.error("[CADASTRO]", erro);

        alert("Erro ao conectar ao servidor.");

    }

});