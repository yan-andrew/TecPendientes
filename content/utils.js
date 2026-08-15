function convertirHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    return template.content;
}

function leerPagina(url) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            {
                accion: "leerPagina",
                url: url
            },
            (respuesta) => {
                resolve(respuesta);
            }
        );
    });
}