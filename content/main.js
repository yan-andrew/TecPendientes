async function analizarCurso(curso) {
    const respuestaCurso = await leerPagina(curso.url);

    if (!respuestaCurso || !respuestaCurso.ok) {
        return [];
    }

    const contenidoCurso = convertirHTML(respuestaCurso.html);

    if (tieneAdmin(contenidoCurso)) {
        return [];
    }

    const urlEvaluaciones = obtenerUrlEvaluaciones(contenidoCurso,curso.url);

    if (!urlEvaluaciones) {
        return [];
    }

    const respuestaEvaluaciones = await leerPagina(urlEvaluaciones);

    if (!respuestaEvaluaciones || !respuestaEvaluaciones.ok) {
        return [];
    }

    const contenidoEvaluaciones = convertirHTML(respuestaEvaluaciones.html);
    const actividades = detectarActividades(contenidoEvaluaciones, curso.nombre, curso.url, urlEvaluaciones);

    return actividades;
}


async function iniciar() {
    mostrarPanelCargando();
    const cursos = obtenerCursosActuales();
    const resultados = await Promise.all(cursos.map(curso => analizarCurso(curso)));
    const actividades = resultados.flat();
    const resultado = clasificarActividades(actividades);

    actualizarPanelActividades(resultado);
}

iniciar();