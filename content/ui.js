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
            if (!actual || actual === document.body) {
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
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const fechaEntrega = new Date(actividad.fechaEntrega.getFullYear(), actividad.fechaEntrega.getMonth(), actividad.fechaEntrega.getDate());
    const diferencia = actividad.fechaEntrega.getTime() - ahora.getTime();

    const minutos = Math.abs(Math.floor(diferencia / (1000 * 60)));
    const horas = Math.abs(Math.floor(diferencia / (1000 * 60 * 60)));
    const dias = Math.abs(Math.round((fechaEntrega.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)));

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

function venceEnMenosDe48Horas(actividad) {
    const ahora = new Date();
    const diferencia = actividad.fechaEntrega.getTime() - ahora.getTime();
    const veinticuatroHoras = 48 * 60 * 60 * 1000;

    return diferencia > 0 && diferencia <= veinticuatroHoras;
}

function crearFilaActividad(actividad, tipo) {
    const fila = document.createElement("tr");

    if (tipo === "pendiente" && venceEnMenosDe48Horas(actividad)) {
        fila.classList.add("tp-urgente");
    }

    const celdaActividad = document.createElement("td");

    const nombre = document.createElement("a");
    nombre.className = "tp-nombre";
    nombre.textContent = actividad.nombre;

    if (actividad.urlEvaluaciones) {
        nombre.href = actividad.urlEvaluaciones;
        nombre.target = "_blank";
        nombre.rel = "noopener noreferrer";
    }

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
            tbody.appendChild(crearFilaActividad(actividad, tipo));
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
    });

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
    contenido.appendChild(crearTablaActividades("Pendientes", resultado.pendientes,"pendiente"));

    contenido.appendChild(crearTablaActividades("Entregadas",resultado.entregadas,"entregada"));
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
    aplicaciones.insertAdjacentElement("afterend", panel);
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

    aplicaciones.insertAdjacentElement("afterend", panel);
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

    contenido.appendChild(
        crearTablaActividades(
            "Pendientes",
            resultado.pendientes,
            "pendiente"
        )
    );

    contenido.appendChild(
        crearTablaActividades(
            "Entregadas",
            resultado.entregadas,
            "entregada"
        )
    );

    contenido.appendChild(
        crearTablaActividades(
            "Cerradas recientemente",
            resultado.cerradasRecientemente,
            "cerrada"
        )
    );

    panel.appendChild(contenido);
}