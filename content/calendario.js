function convertirFechaCalendario(fechaTexto, horaTexto) {
    if (!fechaTexto) {
        return null;
    }

    const fecha = fechaTexto.replace(/\s+/g, " ").trim().toLowerCase();
    const hora = (horaTexto || "").replace(/\s+/g, " ").trim();

    const meses = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11
    };

    const resultadoFecha = fecha.match(/(?:lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)?\s*(\d{1,2})\s+([a-záéíóúñ]+)\s+(\d{4})/);

    if (!resultadoFecha) {
        return null;
    }

    const dia = Number(resultadoFecha[1]);
    const nombreMes = resultadoFecha[2];
    const año = Number(resultadoFecha[3]);
    const mes = meses[nombreMes];

    if (mes === undefined) {
        return null;
    }

    let horas = 23;
    let minutos = 59;

    const resultadoHora = hora.match(/(\d{1,2}):(\d{2})/);

    if (resultadoHora) {
        horas = Number(resultadoHora[1]);
        minutos = Number(resultadoHora[2]);
    }

    return new Date(año, mes, dia, horas, minutos);
}

function detectarEventosCalendario(contenidoCalendario) {
    const eventos = [];
    const tablas = contenidoCalendario.querySelectorAll("table");

    for (const tabla of tablas) {
        const filas = tabla.querySelectorAll("tr");

        if (filas.length === 0) {
            continue;
        }

        let indiceFecha = -1;
        let indiceHora = -1;
        let indiceEvento = -1;
        let indiceCalendario = -1;
        let indiceDescripcion = -1;
        let filaEncabezado = null;

        for (const fila of filas) {
            const celdas = fila.querySelectorAll("th, td");
            const textos = Array.from(celdas).map(celda => celda.textContent.replace(/\s+/g, " ").trim().toLowerCase());
            const fecha = textos.indexOf("fecha");
            const evento = textos.indexOf("evento");

            if (fecha !== -1 && evento !== -1) {
                filaEncabezado = fila;

                indiceFecha = fecha;
                indiceHora = textos.indexOf("hora");
                indiceEvento = evento;
                indiceCalendario = textos.indexOf("calendario");
                indiceDescripcion = textos.findIndex(texto => texto === "descripción" || texto === "descripcion");

                break;
            }
        }

        if (!filaEncabezado) {
            continue;
        }

        let procesar = false;

        for (const fila of filas) {
            if (fila === filaEncabezado) {
                procesar = true;
                continue;
            }

            if (!procesar) {
                continue;
            }

            const celdas = fila.querySelectorAll("td");

            if (celdas.length === 0) {
                continue;
            }

            const celdaEvento = celdas[indiceEvento];

            if (!celdaEvento) {
                continue;
            }

            const nombre = celdaEvento.textContent.replace(/\s+/g, " ").trim();

            if (!nombre || nombre.toLowerCase().includes("sin eventos")) {
                continue;
            }

            const fechaTexto = celdas[indiceFecha]?.textContent.replace(/\s+/g, " ").trim() || "";
            const horaTexto = indiceHora !== -1 ? celdas[indiceHora]?.textContent.replace(/\s+/g, " ").trim() || "" : "";

            const nombreCalendario =
                indiceCalendario !== -1 ? celdas[indiceCalendario]?.textContent.replace(/\s+/g, " ").trim() || "Mi calendario": "Mi calendario";
            const descripcion = indiceDescripcion !== -1 ? celdas[indiceDescripcion]?.textContent.replace(/\s+/g, " ").trim() || "": "";
            const fechaEntrega = convertirFechaCalendario(fechaTexto, horaTexto);

            if (!fechaEntrega) {
                console.log("No se pudo interpretar fecha de calendario:", fechaTexto,horaTexto);
                continue;
            }

            eventos.push({
                curso: nombreCalendario,
                nombre: nombre,
                fechaTexto: formatearFechaCalendario(fechaEntrega),
                fechaEntrega: fechaEntrega,
                entregada: false,
                descripcion: descripcion,
                origen: "calendario",
                urlEvaluaciones: "https://tecdigital.tec.ac.cr/dotlrn/calendar/view"
            });
        }

        if (filaEncabezado) {
            break;
        }
    }

    console.log("Eventos de calendario encontrados:", eventos);
    return eventos;
}

function formatearFechaCalendario(fecha) {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}

function formatearFechaURL(fecha) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}

async function obtenerActividadesCalendario() {
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - 7);

    const fechaInicio = formatearFechaURL(inicio);
    const url =
        "https://tecdigital.tec.ac.cr/dotlrn/calendar/view" +
        `?date=${fechaInicio}` +
        "&period_days=60" +
        "&view=list";

    const respuesta = await leerPagina(url);

    if (!respuesta || !respuesta.ok) {
        console.error("No se pudo consultar Mi calendario");
        return [];
    }

    const contenido = convertirHTML(respuesta.html);
    return detectarEventosCalendario(contenido);
}