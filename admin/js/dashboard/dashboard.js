// =====================================
// ELEMENTOS
// =====================================

const totalMembros = document.getElementById("totalMembros");

const tabelaUltimos = document.getElementById("tabelaUltimos");

// =====================================
// RENDERIZAÇÃO
// =====================================

function renderizarTotalMembros(total) {

    totalMembros.textContent = total;

}

function renderizarUltimos(membros) {

    tabelaUltimos.innerHTML = "";

    membros.forEach((membro) => {

        tabelaUltimos.innerHTML += `

            <tr>

                <td>${membro.nome}</td>

                <td>${membro.cargo}</td>

                <td>

                    <a
                        href="/perfil?id=${membro.id}"
                        class="btn-table">

                        Editar

                    </a>

                </td>

            </tr>

        `;

    });

}

// =====================================
// BUSCAR DADOS
// =====================================

async function carregarDashboard() {

    try {

        const resposta = await fetch("/api/membros/dashboard");

        const resultado = await resposta.json();

        if (!resultado.success) {

            return;

        }

        renderizarTotalMembros(
            resultado.data.totalMembros
        );

        renderizarUltimos(
            resultado.data.ultimos
        );

    } catch (erro) {

        console.error("[DASHBOARD]", erro);

    }

}

// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    carregarDashboard();

});