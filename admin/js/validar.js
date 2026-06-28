const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function carregarMembro(){

    const resposta = await fetch(`/api/membros/validar/${id}`);;

    const resultado = await resposta.json();

    if(!resultado.success){

        alert(resultado.message);

        return;

    }

    const membro = resultado.data;

    document.querySelector("#foto").src =
        membro.foto || "/images/user.png";

    document.querySelector("#nome").textContent =
        membro.nome;

    document.querySelector("#cargo").textContent =
        membro.cargo;

    document.querySelector("#ministerio").textContent =
        membro.ministerio;

    const status = document.querySelector("#status");

    status.textContent = membro.status;

    if(membro.status === "Ativo"){

        status.classList.add("ativo");

    }else{

        status.classList.add("inativo");

    }

}

carregarMembro();