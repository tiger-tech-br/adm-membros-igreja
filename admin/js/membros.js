const lista = document.querySelector("#lista-membros");
const pesquisa = document.querySelector("#pesquisa");

let todosMembros = [];

async function carregarMembros() {

    try {

        const resposta = await fetch("/api/membros");

        const resultado = await resposta.json();

        if (!resultado.success) {

            alert(resultado.message);

            return;

        }

        todosMembros = resultado.data;

        renderizarMembros(todosMembros);

    } catch (erro) {

        console.error("[MEMBROS_JS]", erro);

    }

}

function renderizarMembros(membros) {

    lista.innerHTML = "";

    membros.forEach((membro) => {

        lista.innerHTML += `

            <div class="membro-card">

                <img src="${membro.foto || "/images/user.png"}" alt="${membro.nome}">

                <div class="membro-info">

                    <h3>${membro.nome}</h3>

                    <p>${membro.cargo || ""}</p>

                    <span class="status ativo">

                        ${membro.status || "Ativo"}

                    </span>

                </div>

                <div class="membro-acoes">

                    <button
                        class="btn-editar"
                        onclick="editarMembro(${membro.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn-qr"
                        onclick="abrirQRCode(${membro.id})">

                        <i class="fa-solid fa-qrcode"></i>

                    </button>

                    <button
                        class="btn-perfil"
                        onclick="abrirPerfil(${membro.id})">

                        <i class="fa-solid fa-user"></i>

                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirMembro(${membro.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        `;

    });

}

// =========================
// PERFIL
// =========================

function abrirPerfil(id) {

    window.location.href = `/perfil?id=${id}`;

}

// =========================
// EDITAR
// =========================

function editarMembro(id) {

    window.location.href = `/cadastro?id=${id}`;

}

async function excluirMembro(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este membro?"
    );

    if (!confirmar) return;

    try {

        const resposta = await fetch(`/api/membros/${id}`, {

            method: "DELETE"

        });

        const resultado = await resposta.json();

        alert(resultado.message);

        if (resultado.success) {

            carregarMembros();

        }

    } catch (erro) {

        console.error("[EXCLUIR_MEMBRO]", erro);

        alert("Erro ao excluir o membro.");

    }

}

// =========================
// QR CODE
// =========================

function abrirQRCode(id) {

    alert(`QR Code do membro ${id} será implementado em breve.`);

}

pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase();

    const filtrados = todosMembros.filter((membro) =>

        membro.nome.toLowerCase().includes(texto)

    );

    renderizarMembros(filtrados);

});

carregarMembros();