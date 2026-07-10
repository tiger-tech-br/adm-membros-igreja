// ======================================
// SITE INSTITUCIONAL
// Assembleia de Deus
// script.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // ELEMENTOS
    // ======================================

    const header = document.querySelector("header");

    const menu = document.querySelector(".menu");

    const btnMenu = document.querySelector(".menu-mobile");

    const backdrop = document.querySelector(".menu-backdrop");

    // ======================================
    // HEADER AO ROLAR A PÁGINA
    // ======================================

    function atualizarHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("header-scroll");

        } else {

            header.classList.remove("header-scroll");

        }

    }

    atualizarHeader();

    window.addEventListener("scroll", atualizarHeader);

    // ======================================
    // MENU MOBILE
    // ======================================

    function abrirMenu() {

        if (!menu || !btnMenu || !backdrop) return;

        menu.classList.add("active");

        backdrop.classList.add("active");

        document.body.style.overflow = "hidden";

        btnMenu.setAttribute("aria-expanded", "true");

    }

    function fecharMenu() {

        if (!menu || !btnMenu || !backdrop) return;

        menu.classList.remove("active");

        backdrop.classList.remove("active");

        document.body.style.overflow = "";

        btnMenu.setAttribute("aria-expanded", "false");

    }

    function alternarMenu() {

        if (!menu) return;

        if (menu.classList.contains("active")) {

            fecharMenu();

        } else {

            abrirMenu();

        }

    }

    if (btnMenu) {

        btnMenu.addEventListener("click", alternarMenu);

    }

    // ======================================
    // FECHAR AO CLICAR NO OVERLAY
    // ======================================

    if (backdrop) {

        backdrop.addEventListener("click", fecharMenu);

    }

    // ======================================
    // FECHAR AO CLICAR EM UM LINK
    // ======================================

    const linksMenu = document.querySelectorAll(".menu a");

    linksMenu.forEach((link) => {

    link.addEventListener("click", fecharMenu);

});
    // ======================================
    // FECHAR COM ESC
    // ======================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            fecharMenu();

        }

    });

    // ======================================
// ALTERAR ÍCONE DO MENU
// ======================================

function atualizarIconeMenu() {

    if (!btnMenu) return;

    const icone = btnMenu.querySelector("i");

    if (!icone) return;

    if (menu.classList.contains("active")) {

        icone.classList.remove("fa-bars");

        icone.classList.add("fa-xmark");

    } else {

        icone.classList.remove("fa-xmark");

        icone.classList.add("fa-bars");

    }

}

    function abrirMenu() {

    if (!menu || !btnMenu || !backdrop) return;

    menu.classList.add("active");

    btnMenu.classList.add("active");

    backdrop.classList.add("active");

    document.body.style.overflow = "hidden";

    btnMenu.setAttribute("aria-expanded", "true");

    atualizarIconeMenu();

}

function fecharMenu() {

    if (!menu || !btnMenu || !backdrop) return;

    menu.classList.remove("active");
    btnMenu.classList.remove("active");
    backdrop.classList.remove("active");

    document.body.style.overflow = "";

    btnMenu.setAttribute("aria-expanded", "false");

    atualizarIconeMenu();

}

// ======================================
// REDIMENSIONAMENTO
// ======================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            fecharMenu();

        }

    });

        // ======================================
        // SCROLL SUAVE
        // ======================================

    const linksInternos = document.querySelectorAll("a[href^='#']");

        linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destino = document.querySelector(

                link.getAttribute("href")

            );

            if (!destino) return;

            event.preventDefault();

            destino.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

});

// ======================================
// ANIMAÇÃO DAS SEÇÕES
// ======================================

const elementosAnimados = document.querySelectorAll(

    ".section-title, \
    .hero-content, \
    .sobre-content, \
    .missao-card, \
    .pastor-card, \
    .card, \
    .culto-card, \
    .evento-card, \
    .foto, \
    .contato-content, \
    .mapa"

);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {

        root: null,

        rootMargin: "0px 0px -80px 0px",

        threshold: .15

    }

);

elementosAnimados.forEach((elemento) => {

    observer.observe(elemento);

});

// ======================================
// GALERIA
// ======================================

const fotosGaleria = document.querySelectorAll(".foto img");

fotosGaleria.forEach((foto) => {

    foto.addEventListener("click", () => {


        // Futuramente:
        // abrirLightbox(foto);

    });

});