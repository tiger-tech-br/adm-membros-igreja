// ===============================
// PREVIEW DA FOTO
// ===============================

const foto = document.getElementById("foto");

if(foto){

    foto.addEventListener("change", function(){

        const arquivo = this.files[0];

        if(!arquivo) return;

        const leitor = new FileReader();

        leitor.onload = function(e){

            document.getElementById("preview").src = e.target.result;

        }

        leitor.readAsDataURL(arquivo);

    });

}