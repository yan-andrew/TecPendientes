function obtenerUrlEvaluaciones(contenidoCurso, urlCurso) {
    const enlaces = contenidoCurso.querySelectorAll("a");

    for (const enlace of enlaces) {
        const texto = enlace.textContent.trim();

        if (texto === "Evaluaciones") {
            const href = enlace.getAttribute("href");

            if (!href) {
                return null;
            }

            return new URL(href, urlCurso).href;
        }
    }

    return null;
}