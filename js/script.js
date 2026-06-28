// ===============================
// HEADER AO ROLAR A PÁGINA
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(13,13,13,.95)";
        header.style.backdropFilter = "blur(10px)";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.4)";

    } else {

        header.style.background = "transparent";
        header.style.boxShadow = "none";

    }

});

// ===============================
// ANIMAÇÃO DOS BOTÕES
// ===============================

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("mouseenter", () => {

        botao.style.transform = "scale(1.05)";

    });

    botao.addEventListener("mouseleave", () => {

        botao.style.transform = "scale(1)";

    });

});

const menu = document.querySelector(".menu");
const menuMobile = document.querySelector(".menu-mobile");

menuMobile.addEventListener("click", () => {

    menu.classList.toggle("active");

});

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});

// ===============================
// SCROLL SUAVE DOS LINKS
// ===============================

document.querySelectorAll("a[href^='#']").forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ===============================
// MENSAGEM DE BOAS-VINDAS
// ===============================

window.addEventListener("load", () => {

    console.log("Site carregado com sucesso!");

});