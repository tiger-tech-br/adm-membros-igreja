const formulario = document.querySelector("#formCadastro");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

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

        document.querySelector("#dataNascimento").value = membro.data_nascimento
            ? membro.data_nascimento.split("T")[0]
            : "";

        document.querySelector("#telefone").value = membro.telefone || "";

        document.querySelector("#email").value = membro.email || "";

        document.querySelector("#endereco").value = membro.endereco || "";

        document.querySelector("#cargo").value = membro.cargo || "Membro";

        document.querySelector("#ministerio").value = membro.ministerio || "Outro";

        document.querySelector("#sexo").value = membro.sexo || "Masculino";

        document.querySelector("#estadoCivil").value = membro.estado_civil || "Solteiro(a)";

        document.querySelector("#status").value = membro.status || "Ativo";

        document.querySelector("#observacoes").value = membro.observacoes || "";

    } catch (erro) {

        console.error("[CARREGAR_MEMBRO]", erro);

    }

}

carregarMembro();

// =====================================
// PREVIEW DA FOTO
// =====================================

const inputFoto = document.querySelector("#foto");
const preview = document.querySelector("#preview");

inputFoto.addEventListener("change", (event) => {

    const arquivo = event.target.files[0];

    if (!arquivo) return;

    preview.src = URL.createObjectURL(arquivo);

});

// =====================================
// SALVAR
// =====================================

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

const formData = new FormData();

formData.append("nome", document.querySelector("#nome").value.trim());

formData.append("dataNascimento", document.querySelector("#dataNascimento").value);

formData.append("telefone", document.querySelector("#telefone").value.trim());

formData.append("email", document.querySelector("#email").value.trim());

formData.append("endereco", document.querySelector("#endereco").value.trim());

formData.append("cargo", document.querySelector("#cargo").value);

formData.append("ministerio", document.querySelector("#ministerio").value);

formData.append("sexo", document.querySelector("#sexo").value);

formData.append("estadoCivil", document.querySelector("#estadoCivil").value);

formData.append("status", document.querySelector("#status").value);

formData.append("observacoes", document.querySelector("#observacoes").value.trim());

const foto = document.querySelector("#foto").files[0];

if (foto) {

    formData.append("foto", foto);

}

    if (!formData.get("nome")) {

    return alert("Informe o nome do membro.");

}

if (!formData.get("telefone")) {

    return alert("Informe o telefone.");

}


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