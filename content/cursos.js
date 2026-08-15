function obtenerPeriodo(url) {
    const resultado = url.match(/S-\d-\d{4}/);

    if (resultado) {
        return resultado[0];
    }

    return null;
}


function obtenerCursosActuales() {
    const enlaces = document.querySelectorAll("a");
    let periodoActual = null;
    const cursos = [];
    const urlsEncontradas = new Set();

    for (const enlace of enlaces) {
        const url = enlace.href;

        if (url.startsWith("https://tecdigital.tec.ac.cr/dotlrn/classes/")) {
            periodoActual = obtenerPeriodo(url);

            if (periodoActual !== null) {
                break;
            }
        }
    }

    enlaces.forEach((enlace) => {
        const url = enlace.href;
        const nombre = enlace.innerText.trim();
        const periodo = obtenerPeriodo(url);

        if (periodo === periodoActual && nombre !== "" &&!urlsEncontradas.has(url)) {
            urlsEncontradas.add(url);
            cursos.push({
                nombre: nombre,
                url: url
            });
        }
    });

    return cursos;
}

function tieneAdmin(contenidoCurso) {
    const enlaces = contenidoCurso.querySelectorAll("a");

    for (const enlace of enlaces) {
        const texto = enlace.textContent.trim();

        if (texto === "Admin") {
            return true;
        }
    }

    return false;
}