chrome.runtime.onMessage.addListener((mensaje, sender, sendResponse) => {
        if (mensaje.accion === "leerPagina") {
            leerPagina(mensaje.url).then(sendResponse);
            return true;
        }
    }
);


async function leerPagina(url, intento = 1) {
    console.log("Consultando:", url);
    const controlador = new AbortController();
    const timeout = setTimeout(() => {controlador.abort();}, 8000);

    try {
        const respuesta = await fetch(url, {
                method: "GET",
                credentials: "include",
                signal: controlador.signal
            }
        );

        clearTimeout(timeout);
        const html = await respuesta.text();
        console.log("Status:",respuesta.status);

        return {
            ok: respuesta.ok,
            status: respuesta.status,
            url: respuesta.url,
            html: html
        };

    } catch (error) {
        clearTimeout(timeout);
        console.log("Error consultando página:",error);

        if (intento < 2) {
            console.log("Reintentando:",url);
            return leerPagina(url, intento + 1);
        }

        return {
            ok: false,
            error: error.message
        };
    }
}