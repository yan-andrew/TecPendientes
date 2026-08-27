function cargarEstilosTecPendientes() {
    if (document.getElementById("tec-pendientes-estilos")) {
        return;
    }

    const estilos = document.createElement("style");
    estilos.id = "tec-pendientes-estilos";

    estilos.textContent = `
        #tec-pendientes-panel {
            width: 100%;
            box-sizing: border-box;
            margin-top: 12px;
            background: white;
            border: 3px solid #f0f0f0;
            border-radius: 4px;
            font-family: Arial, Helvetica, sans-serif;
            color: #333;
        }

        #tec-pendientes-panel .tp-titulo {
            padding: 10px 12px;
            font-size: 16px;
            font-weight: bold;
            color: #222;
        }

        #tec-pendientes-panel .tp-contenido {
            padding: 0 12px 12px 12px;
        }

        #tec-pendientes-panel .tp-seccion {
            margin-top: 8px;
            margin-bottom: 16px;
        }

        #tec-pendientes-panel .tp-seccion-titulo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7px 8px;
            background: #f5f5f5;
            border: 1px solid #e5e5e5;
            font-size: 13px;
            font-weight: bold;
            color: #333;
            cursor: pointer;
            user-select: none;
        }

        #tec-pendientes-panel .tp-seccion-titulo:hover {
            background: #eeeeee;
        }

        #tec-pendientes-panel .tp-seccion-derecha {
            display: flex;
            align-items: center;
            gap: 7px;
        }

        #tec-pendientes-panel .tp-contador {
            padding: 1px 7px;
            background: #e8e8e8;
            border-radius: 10px;
            font-size: 11px;
            font-weight: normal;
            color: #555;
        }

        #tec-pendientes-panel .tp-toggle {
            width: 12px;
            color: #666;
            font-size: 13px;
            font-weight: normal;
            text-align: center;
        }

        #tec-pendientes-panel .tp-seccion-contenido {
            display: block;
        }

        #tec-pendientes-panel .tp-seccion-contenido.tp-cerrado {
            display: none;
        }

        #tec-pendientes-panel .tp-tabla {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            background: white;
        }

        #tec-pendientes-panel .tp-tabla th {
            padding: 7px 8px;
            background: #fafafa;
            border-bottom: 1px solid #e5e5e5;
            color: #555;
            font-size: 11px;
            font-weight: bold;
            text-align: left;
        }

        #tec-pendientes-panel .tp-tabla th:last-child {
            width: 115px;
            text-align: right;
        }

        #tec-pendientes-panel .tp-tabla td {
            padding: 8px;
            border-bottom: 1px solid #eeeeee;
            vertical-align: middle;
            font-size: 12px;
        }

        #tec-pendientes-panel .tp-tabla tr:last-child td {
            border-bottom: none;
        }

        #tec-pendientes-panel .tp-nombre {
            color: #0066ff;
            font-size: 12px;
            text-decoration: none;
            cursor: pointer;
        }

        #tec-pendientes-panel .tp-nombre:hover {
            text-decoration: underline;
        }

        #tec-pendientes-panel .tp-curso {
            margin-top: 3px;
            color: #777;
            font-size: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        #tec-pendientes-panel .tp-col-fecha {
            width: 115px;
            text-align: right;
            white-space: nowrap;
            color: #555;
            font-size: 11px;
        }

        #tec-pendientes-panel .tp-tiempo {
            color: #444;
            font-size: 11px;
            font-weight: bold;
        }

        #tec-pendientes-panel .tp-fecha-real {
            margin-top: 2px;
            color: #888;
            font-size: 10px;
            font-weight: normal;
        }

        #tec-pendientes-panel .tp-tabla tr.tp-urgente td {
            background: #fff1f1;
        }

        #tec-pendientes-panel .tp-tabla tr.tp-urgente td:first-child {
            border-left: 3px solid #dc3545;
        }

        #tec-pendientes-panel .tp-tabla tr.tp-urgente .tp-tiempo {
            color: #b42318;
            font-weight: bold;
        }

        #tec-pendientes-panel .tp-tabla tr.tp-urgente .tp-fecha-real {
            color: #9b5555;
        }

        #tec-pendientes-panel .tp-vacio {
            padding: 9px 8px;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            color: #888;
            font-size: 11px;
        }

        #tec-pendientes-panel .tp-cargando {
            min-height: 110px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            box-sizing: border-box;
            padding: 20px;
            background: #ffffff;
        }

        #tec-pendientes-panel .tp-spinner {
            width: 26px;
            height: 26px;
            box-sizing: border-box;
            border: 3px solid #e5e5e5;
            border-top-color: #5c6f82;
            border-radius: 50%;
            animation: tp-girar 0.8s linear infinite;
        }

        #tec-pendientes-panel .tp-cargando-texto {
            color: #8a8a8a;
            font-size: 12px;
            font-weight: normal;
            text-align: center;
            letter-spacing: 0.1px;
        }

        @keyframes tp-girar {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
            `;

    document.head.appendChild(estilos);
}