chrome.runtime.onMessage.addListener(
    (mensaje, sender, sendResponse) => {

        if (mensaje.accion === "leerPagina") {

            leerPagina(mensaje.url)
                .then(sendResponse);

            return true;
        }
    }
);


async function leerPagina(url) {

    console.log(
        "Consultando:",
        url
    );

    try {

        const respuesta = await fetch(
            url,
            {
                method: "GET",
                credentials: "include"
            }
        );


        const html =
            await respuesta.text();


        console.log(
            "Status:",
            respuesta.status
        );


        return {
            ok: respuesta.ok,
            status: respuesta.status,
            url: respuesta.url,
            html: html
        };


    } catch (error) {

        console.error(
            "Error consultando página:",
            error
        );


        return {
            ok: false,
            error: error.message
        };
    }
}