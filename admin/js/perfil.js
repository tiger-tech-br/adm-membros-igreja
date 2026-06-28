const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function carregarPerfil() {

    try {

        const resposta = await fetch(`/api/membros/${id}`);

        const resultado = await resposta.json();

        if (!resultado.success) {

            alert(resultado.message);

            return;

        }

        const membro = resultado.data;

        document.querySelector("#foto").src =
        membro.foto || "/images/user.png";

        document.querySelector("#nome").textContent = membro.nome;

        document.querySelector("#cargo").textContent = membro.cargo || "Não informado";

        document.querySelector("#status").textContent = membro.status || "Ativo";

        document.querySelector("#telefone").textContent = membro.telefone || "Não informado";

        const email = document.querySelector("#email");

        const infoEmail = email.closest(".info");

        if (membro.email && membro.email.trim() !== "") {

            email.textContent = membro.email;

            infoEmail.style.display = "flex";

        } else {

            infoEmail.style.display = "none";

        }

        document.querySelector("#nascimento").textContent = membro.data_nascimento
            ? new Date(membro.data_nascimento).toLocaleDateString("pt-BR")
            : "Não informado";

        document.querySelector("#endereco").textContent = membro.endereco || "Não informado";

        document.querySelector("#ministerio").textContent = membro.ministerio || "Não informado";

        document.querySelector("#sexo").textContent = membro.sexo || "Não informado";

        document.querySelector("#estadoCivil").textContent = membro.estado_civil || "Não informado";

        const observacoes = document.querySelector("#observacoes");

            const infoObservacoes = observacoes.closest(".info");

            if (membro.observacoes && membro.observacoes.trim() !== "") {

                observacoes.textContent = membro.observacoes;

                infoObservacoes.style.display = "flex";

            } else {

                infoObservacoes.style.display = "none";

            }

        document.querySelector("#idMembro").textContent = membro.id;

        document.querySelector("#qrCode").src =
        membro.qr_code || "/images/qrcode-exemplo.png";


    } catch (erro) {

        console.error("[PERFIL_JS]", erro);

        alert("Erro ao carregar o perfil do membro.");

    }

}

carregarPerfil();