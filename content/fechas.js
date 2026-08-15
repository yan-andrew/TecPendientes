function extraerFechaEntrega(texto) {
    if (!texto) {
        return null;
    }

    if (texto.includes("Fecha no definida")) {
        return null;
    }

    const resultado = texto.match(/Fecha de Entrega\s*:\s*(\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2})/);

    if (!resultado) {
        return null;
    }

    return resultado[1];
}

function convertirFechaTecDigital(textoFecha) {
    if (!textoFecha) {
        return null;
    }

    const resultado = textoFecha.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);

    if (!resultado) {
        return null;
    }

    const dia = Number(resultado[1]);
    const mes = Number(resultado[2]) - 1;
    const año = Number(resultado[3]);
    const hora = Number(resultado[4]);
    const minutos = Number(resultado[5]);

    return new Date(año, mes, dia, hora, minutos);
}

function actividadYaCerro(fechaEntrega) {
    const ahora = new Date();

    return fechaEntrega <= ahora;
}


function cerroRecientemente(fechaEntrega) {
    const ahora = new Date();
    const diferencia = ahora.getTime() -fechaEntrega.getTime();
    const sieteDias = 7 * 24 * 60 * 60 * 1000;

    return (diferencia >= 0 && diferencia <= sieteDias);
}