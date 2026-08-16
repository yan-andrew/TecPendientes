function esEncabezadoActividad(texto) {
    if (!texto) {
        return false;
    }

    texto = texto.replace(/\s+/g, " ").replace("expand_less", "").replace("expand_more", "").trim();

    if (texto.includes(":")) {
        return false;
    }

    const patronConValor = /^.+?\s+(?:--|[-+]?\d+(?:[.,]\d+)?)\s*\/\s*\d+(?:[.,]\d+)?$/;

    const patronSinValor = /^.+?\s+--$/;

    return patronConValor.test(texto) || patronSinValor.test(texto);
}


function obtenerNombreActividad(texto) {
    texto = texto.replace(/\s+/g, " ").replace("expand_less", "").replace("expand_more", "").trim();

    const posicionSlash = texto.indexOf("/");

    if (posicionSlash !== -1) {
        let parteIzquierda = texto.substring(0, posicionSlash).trim();
        parteIzquierda = parteIzquierda.replace(/\s+(?:--|[-+]?\d+(?:[.,]\d+)?)$/, "").trim();

        return limpiarNombreActividad(parteIzquierda);
    }

    if (texto.endsWith("--")) {
        const nombre = texto.replace(/\s+--$/, "").trim();
        return limpiarNombreActividad(nombre)
    }

    return null;
}


function obtenerContenedorActividad(elementoEncabezado) {
    let actual = elementoEncabezado;

    for (let nivel = 0; nivel < 10; nivel++) {
        if (!actual) {
            return null;
        }

        const texto = actual.textContent.replace(/\s+/g, " ").trim();

        if (texto.includes("Detalles de la asignación") &&texto.includes("Fecha de Entrega")) {
            return actual;
        }

        actual = actual.parentElement;
    }

    return null;
}

function estaEntregada(contenedorActividad) {
    const texto = contenedorActividad.textContent.replace(/\s+/g, " ").trim();
    const tieneDia =texto.includes("Día de entrega:");
    const tieneHora =texto.includes("Hora de entrega:");

    return (tieneDia ||tieneHora);
}

function crearActividad(elementoEncabezado,nombreCurso,urlCurso,urlEvaluaciones) {
    const textoEncabezado =elementoEncabezado.textContent.replace(/\s+/g, " ").trim();
    const nombre = obtenerNombreActividad(textoEncabezado);

    if (nombre.includes("Ponderado")) {
        return null;
    }

    if (!nombre) {
        return null;
    }

    const contenedor = obtenerContenedorActividad(elementoEncabezado);

    if (!contenedor) {
        return null;
    }

    const textoCompleto = contenedor.textContent.replace(/\s+/g, " ").trim();
    const fechaTexto = extraerFechaEntrega(textoCompleto);

    if (!fechaTexto) {
        return null;
    }

    const fechaEntrega = convertirFechaTecDigital(fechaTexto);

    if (!fechaEntrega) {
        return null;
    }

    const entregada = estaEntregada(contenedor);

    return {
        curso: nombreCurso,
        nombre: nombre,

        urlCurso: urlCurso,
        urlEvaluaciones: urlEvaluaciones,

        fechaTexto: fechaTexto,
        fechaEntrega: fechaEntrega,

        entregada: entregada
    };
}

function limpiarNombreActividad(nombre) {
    return nombre.replace(/\s+Ponderado$/i, "").trim();
}

function detectarActividades(contenidoEvaluaciones,nombreCurso) {
    const actividades = [];
    const encontradas = new Set();

    const elementos = contenidoEvaluaciones.querySelectorAll("*");

    for (const elemento of elementos) {
        const texto = elemento.textContent.replace(/\s+/g, " ").trim();

        if (!esEncabezadoActividad(texto)) {
            continue;
        }

        const actividad = crearActividad(elemento, nombreCurso);

        if (!actividad) {
            continue;
        }

        const identificador = nombreCurso + "|" + actividad.nombre;

        if (encontradas.has(identificador)) {
            continue;
        }

        encontradas.add(identificador);
        actividades.push(actividad);
    }

    return actividades;
}