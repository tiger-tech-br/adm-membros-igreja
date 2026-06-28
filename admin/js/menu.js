// =========================
// ELEMENTOS
// =========================

const btnMenu = document.querySelector("#btnMenu");

const sidebar = document.querySelector(".sidebar");

const overlay = document.querySelector(".overlay");

// Se a página não possuir esses elementos, não faz nada.
if (btnMenu && sidebar && overlay) {

    // =========================
    // ABRIR / FECHAR MENU
    // =========================

    btnMenu.addEventListener("click", () => {

        sidebar.classList.toggle("aberto");

        overlay.classList.toggle("ativo");

        document.body.classList.toggle("menu-aberto");

        const icone = btnMenu.querySelector("i");

        if (sidebar.classList.contains("aberto")) {

            icone.classList.remove("fa-bars");

            icone.classList.add("fa-xmark");

        } else {

            icone.classList.remove("fa-xmark");

            icone.classList.add("fa-bars");

        }

    });

    // =========================
    // FECHAR AO CLICAR FORA
    // =========================

    overlay.addEventListener("click", fecharMenu);

    // =========================
    // FECHAR AO CLICAR EM UM ITEM
    // =========================

    document.querySelectorAll(".menu a").forEach(link => {

        link.addEventListener("click", fecharMenu);

    });

}

// =========================
// FUNÇÃO FECHAR MENU
// =========================

function fecharMenu(){

    sidebar.classList.remove("aberto");

    overlay.classList.remove("ativo");

    document.body.classList.remove("menu-aberto");

    btnMenu.querySelector("i").classList.remove("fa-xmark");

    btnMenu.querySelector("i").classList.add("fa-bars");

}