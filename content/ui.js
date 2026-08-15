function cargarEstilosTecPendientes() {
    if (document.getElementById("tec-pendientes-estilos")) {
        return;
    }

    const estilos = document.createElement("style");
    estilos.id = "tec-pendientes-estilos";

    estilos.textContent = `
        #tec-pendientes-panel {
            width: 100% !important;
            box-sizing: border-box !important;
            margin-top: 12px !important;
            background: #ffffff !important;
            border: 3px solid #eeeeee !important;
            border-radius: 4px !important;
            font-family: Arial, Helvetica, sans-serif !important;
            color: #333333 !important;
        }

        #tec-pendientes-panel .tp-titulo {
            padding: 10px 14px !important;
            border-bottom: 1px solid #dddddd !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: #222222 !important;
        }

        #tec-pendientes-panel .tp-contenido {
            padding: 12px !important;
        }

        #tec-pendientes-panel .tp-seccion {
            margin-bottom: 14px !important;
        }

        #tec-pendientes-panel .tp-seccion:last-child {
            margin-bottom: 0 !important;
        }

        #tec-pendientes-panel .tp-seccion-titulo {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 8px 10px !important;
            background: #f2f2f2 !important;
            border: 1px solid #cccccc !important;
            cursor: pointer !important;
            user-select: none !important;
            font-size: 13px !important;
            font-weight: bold !important;
            color: #333333 !important;
        }

        #tec-pendientes-panel .tp-seccion-titulo:hover {
            background: #eaeaea !important;
        }

        #tec-pendientes-panel .tp-seccion-derecha {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        #tec-pendientes-panel .tp-contador {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-width: 24px !important;
            height: 20px !important;
            padding: 0 6px !important;
            border-radius: 10px !important;
            background: #e3e3e3 !important;
            font-size: 11px !important;
            font-weight: normal !important;
            color: #444444 !important;
        }

        #tec-pendientes-panel .tp-toggle {
            width: 14px !important;
            text-align: center !important;
            font-size: 14px !important;
            color: #555555 !important;
        }


        #tec-pendientes-panel .tp-seccion-contenido {
            display: block !important;
        }

        #tec-pendientes-panel .tp-seccion-contenido.tp-cerrado {
            display: none !important;
        }

        #tec-pendientes-panel .tp-tabla {
            width: 100% !important;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            table-layout: fixed !important;
            margin: 0 !important;
            border-left: 1px solid #cccccc !important;
            border-right: 1px solid #cccccc !important;
            border-bottom: 1px solid #cccccc !important;
            background: #ffffff !important;
        }

        #tec-pendientes-panel .tp-tabla thead {
            background: #fafafa !important;
        }

        #tec-pendientes-panel .tp-tabla th {
            padding: 8px 10px !important;
            background: #fafafa !important;
            border-right: 1px solid #dddddd !important;
            border-bottom: 1px solid #cccccc !important;
            color: #444444 !important;
            font-size: 11px !important;
            font-weight: bold !important;
            text-align: left !important;
        }

        #tec-pendientes-panel .tp-tabla th:last-child {
            width: 135px !important;
            border-right: none !important;
            text-align: right !important;
        }

        #tec-pendientes-panel .tp-tabla td {
            padding: 9px 10px !important;
            border-right: 1px solid #eeeeee !important;
            border-bottom: 1px solid #dddddd !important;
            background: #ffffff !important;
            color: #333333 !important;
            font-size: 12px !important;
            vertical-align: middle !important;
        }

        #tec-pendientes-panel .tp-tabla td:last-child {
            border-right: none !important;
        }

        #tec-pendientes-panel .tp-tabla tr:last-child td {
            border-bottom: none !important;
        }

        #tec-pendientes-panel .tp-nombre {
            margin: 0 !important;
            color: #005eff !important;
            font-size: 12px !important;
            font-weight: normal !important;
            cursor: default !important;
        }

        #tec-pendientes-panel .tp-curso {
            margin-top: 4px !important;
            max-width: 100% !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
            color: #777777 !important;
            font-size: 10px !important;
            cursor: default !important;
        }

        #tec-pendientes-panel .tp-col-fecha {
            width: 135px !important;
            text-align: right !important;
            white-space: nowrap !important;
        }

        #tec-pendientes-panel .tp-tiempo {
            color: #333333 !important;
            font-size: 11px !important;
            font-weight: bold !important;
        }

        #tec-pendientes-panel .tp-fecha-real {
            margin-top: 3px !important;
            color: #777777 !important;
            font-size: 10px !important;
        }

        #tec-pendientes-panel .tp-vacio {
            padding: 10px !important;
            border-left: 1px solid #cccccc !important;
            border-right: 1px solid #cccccc !important;
            border-bottom: 1px solid #cccccc !important;
            background: #ffffff !important;
            color: #888888 !important;
            font-size: 11px !important;
        }
    `;

    document.head.appendChild(estilos);
}

function buscarPanelAplicaciones() {
    const elementos = document.querySelectorAll("*");

    for (const elemento of elementos) {
        const texto = elemento.textContent.replace(/\s+/g, " ").trim();

        if (texto !== "Aplicaciones") {
            continue;
        }

        const rect = elemento.getBoundingClientRect();

        if (rect.width <= 0 || rect.height <= 0) {
            continue;
        }

        let actual = elemento;

        for (let nivel = 0; nivel < 8; nivel++) {
            if (!actual ||actual === document.body) {
                break;
            }

            const tamaño = actual.getBoundingClientRect();

            if (tamaño.width >= 400 && tamaño.height >= 250) {
                return actual;
            }

            actual = actual.parentElement;
        }
    }

    return null;
}

function obtenerTiempoRelativo(actividad, tipo) {
    const ahora = new Date();
    const diferencia = actividad.fechaEntrega.getTime() - ahora.getTime();
    const minutos = Math.abs(Math.floor(diferencia / (1000 * 60)));
    const horas = Math.abs(Math.floor(diferencia / (1000 * 60 * 60)));
    const dias = Math.abs(Math.floor(diferencia / (1000 * 60 * 60 * 24)));

    if (tipo === "cerrada") {
        if (minutos < 60) {
            return `Cerró hace ${minutos} min`;
        }

        if (horas < 24) {
            return `Cerró hace ${horas} h`;
        }

        if (dias === 1) {
            return "Cerró ayer";
        }

        return `Cerró hace ${dias} días`;
    }

    if (minutos < 60) {
        return `En ${minutos} min`;
    }

    if (horas < 24) {
        return `En ${horas} h`;
    }

    if (dias === 0) {
        return "Hoy";
    }

    if (dias === 1) {
        return "Mañana";
    }

    return `En ${dias} días`;
}

function crearFilaActividad(actividad, tipo) {
    const fila = document.createElement("tr");
    const celdaActividad = document.createElement("td");
    const nombre = document.createElement("div");

    nombre.className = "tp-nombre";
    nombre.textContent = actividad.nombre;

    const curso = document.createElement("div");
    curso.className = "tp-curso";
    curso.textContent = actividad.curso;

    celdaActividad.appendChild(nombre);
    celdaActividad.appendChild(curso);

    const celdaFecha = document.createElement("td");
    celdaFecha.className = "tp-col-fecha";

    const relativo = document.createElement("div");
    relativo.className = "tp-tiempo";
    relativo.textContent = obtenerTiempoRelativo(actividad, tipo);

    const fechaReal = document.createElement("div");
    fechaReal.className = "tp-fecha-real";
    fechaReal.textContent = actividad.fechaTexto;

    celdaFecha.appendChild(relativo);
    celdaFecha.appendChild(fechaReal);

    fila.appendChild(celdaActividad);
    fila.appendChild(celdaFecha);

    return fila;
}

function crearTablaActividades(titulo, actividades, tipo) {
    const seccion = document.createElement("div");
    seccion.className = "tp-seccion";

    const encabezado = document.createElement("div");
    encabezado.className = "tp-seccion-titulo";

    const textoTitulo = document.createElement("span");
    textoTitulo.textContent = titulo;

    const derecha = document.createElement("div");
    derecha.className = "tp-seccion-derecha";

    const contador = document.createElement("span");
    contador.className = "tp-contador";
    contador.textContent = actividades.length;

    const toggle = document.createElement("span");
    toggle.className = "tp-toggle";
    toggle.textContent = "−";

    derecha.appendChild(contador);
    derecha.appendChild(toggle);

    encabezado.appendChild(textoTitulo);
    encabezado.appendChild(derecha);

    seccion.appendChild(encabezado);

    const contenido = document.createElement("div");
    contenido.className = "tp-seccion-contenido";

    if (actividades.length === 0) {
        const vacio = document.createElement("div");
        vacio.className = "tp-vacio";
        vacio.textContent = "No hay actividades";

        contenido.appendChild(vacio);
    } else {
        const tabla = document.createElement("table");
        tabla.className = "tp-tabla";

        const thead = document.createElement("thead");
        const filaCabecera = document.createElement("tr");
        const thActividad = document.createElement("th");

        thActividad.textContent = "Actividad";

        const thFecha = document.createElement("th");
        thFecha.textContent = "Fecha límite";

        filaCabecera.appendChild(thActividad);
        filaCabecera.appendChild(thFecha);

        thead.appendChild(filaCabecera);
        tabla.appendChild(thead);

        const tbody = document.createElement("tbody");

        for (const actividad of actividades) {
            tbody.appendChild(crearFilaActividad(actividad,tipo));
        }

        tabla.appendChild(tbody);
        contenido.appendChild(tabla);
    }

    seccion.appendChild(contenido);

    encabezado.addEventListener("click", () => {
            const cerrado = contenido.classList.toggle("tp-cerrado");

            if (cerrado) {
                toggle.textContent = "+";
            } else {
                toggle.textContent = "−";

            }
        }
    );

    return seccion;
}

function crearPanelActividades(resultado) {
    const panel = document.createElement("div");
    panel.id = "tec-pendientes-panel";

    const titulo = document.createElement("div");
    titulo.className = "tp-titulo";
    titulo.textContent = "Mis actividades";

    panel.appendChild(titulo);

    const contenido = document.createElement("div");
    contenido.className = "tp-contenido";

    contenido.appendChild(crearTablaActividades("Pendientes", resultado.pendientes, "pendiente"));
    contenido.appendChild(crearTablaActividades("Entregadas", resultado.entregadas, "entregada"));
    contenido.appendChild(crearTablaActividades("Cerradas recientemente", resultado.cerradasRecientemente, "cerrada"));

    panel.appendChild(contenido);

    return panel;
}

function mostrarPanelActividades(resultado) {
    cargarEstilosTecPendientes();
    const anterior = document.getElementById("tec-pendientes-panel");

    if (anterior) {
        anterior.remove();
    }

    const aplicaciones = buscarPanelAplicaciones();

    if (!aplicaciones) {
        console.error("No se encontró Aplicaciones");
        return;
    }

    const panel = crearPanelActividades(resultado);

    aplicaciones.insertAdjacentElement("afterend",panel);
}

function mostrarPanelCargando() {
    cargarEstilosTecPendientes();

    const anterior = document.getElementById("tec-pendientes-panel");

    if (anterior) {
        anterior.remove();
    }

    const aplicaciones = buscarPanelAplicaciones();

    if (!aplicaciones) {
        console.error("No se encontró Aplicaciones");

        return;
    }

    const panel = document.createElement("div");
    panel.id = "tec-pendientes-panel";

    const titulo = document.createElement("div");
    titulo.className = "tp-titulo";
    titulo.textContent = "Mis actividades";

    const contenido = document.createElement("div");
    contenido.className = "tp-cargando";
    contenido.innerHTML = `
        <div class="tp-spinner"></div>

        <div class="tp-cargando-texto">
            Cargando actividades...
        </div>
    `;

    panel.appendChild(titulo);
    panel.appendChild(contenido);

    aplicaciones.insertAdjacentElement("afterend",panel);
}

function actualizarPanelActividades(resultado) {
    const panel = document.getElementById("tec-pendientes-panel");

    if (!panel) {
        mostrarPanelActividades(resultado);
        return;
    }

    const titulo = panel.querySelector(".tp-titulo");
    panel.innerHTML = "";
    panel.appendChild(titulo);

    const contenido = document.createElement("div");
    contenido.className = "tp-contenido";
    contenido.appendChild(crearTablaActividades("Pendientes", resultado.pendientes, "pendiente"));
    contenido.appendChild(crearTablaActividades("Entregadas", resultado.entregadas, "entregada"));
    contenido.appendChild(crearTablaActividades("Cerradas recientemente", resultado.cerradasRecientemente, "cerrada"));

    panel.appendChild(contenido);
}