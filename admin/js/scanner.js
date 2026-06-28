const html5QrCode = new Html5Qrcode("reader");

const config = {

    fps: 10,

    qrbox: {

        width: 250,

        height: 250

    }

};

function sucesso(textoLido) {

    html5QrCode.stop().then(() => {

        // Se o QR Code contém uma URL
        if (
            textoLido.startsWith("http://") ||
            textoLido.startsWith("https://")
        ) {

            window.location.href = textoLido;

            return;

        }

        // Se contém MEMBRO:ID
        if (textoLido.startsWith("MEMBRO:")) {

            const id = textoLido.replace("MEMBRO:", "");

            window.location.href = `/perfil?id=${id}`;

            return;

        }

        alert("QR Code inválido.");

    });

}

function erro() {

    // Não faz nada.
    // Evita milhares de mensagens no console.

}

Html5Qrcode.getCameras()

    .then(cameras => {

        if (!cameras || cameras.length === 0) {

            alert("Nenhuma câmera encontrada.");

            return;

        }

        let camera = cameras[0].id;

        // Procura a câmera traseira
        const traseira = cameras.find(c =>

            c.label.toLowerCase().includes("back") ||

            c.label.toLowerCase().includes("rear") ||

            c.label.toLowerCase().includes("environment")

        );

        if (traseira) {

            camera = traseira.id;

        }

        html5QrCode.start(

            camera,

            config,

            sucesso,

            erro

        );

    })

    .catch(erro => {

        console.error(erro);

        alert("Não foi possível acessar a câmera.");

    });