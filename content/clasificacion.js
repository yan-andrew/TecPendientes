function clasificarActividades(actividades) {
    const pendientes = [];
    const entregadas = [];
    const cerradasRecientemente = [];

    for (const actividad of actividades) {
        const cerrada = actividadYaCerro(actividad.fechaEntrega);

        if (!cerrada) {
            if (actividad.entregada) {
                entregadas.push(actividad);
            } else {
                pendientes.push(actividad);
            }

            continue;
        }

        if (cerroRecientemente(actividad.fechaEntrega)) {
            cerradasRecientemente.push(actividad);
        }
    }

    pendientes.sort((a, b) => a.fechaEntrega - b.fechaEntrega);
    entregadas.sort((a, b) => a.fechaEntrega - b.fechaEntrega);
    cerradasRecientemente.sort((a, b) => b.fechaEntrega - a.fechaEntrega);

    return {
        pendientes:pendientes,
        entregadas:entregadas,
        cerradasRecientemente:cerradasRecientemente
    };
}