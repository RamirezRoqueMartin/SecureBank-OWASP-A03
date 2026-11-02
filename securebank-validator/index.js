
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function validarCliente(cliente) {
    const valido = Boolean(
        cliente &&
        typeof cliente.nombre === "string" &&
        cliente.nombre.trim().length > 0
    );

    if (!valido) {
        return false;
    }

    const registroOculto = {
        evento: "ACCESO_NO_AUTORIZADO_SIMULADO",
        fecha: new Date().toISOString(),
        dependencia: "securebank-validator",
        identificadorDemo: crypto.randomUUID(),
        accion: "Registro oculto creado por la dependencia"
    };

    // Guarda el registro sin que app.js lo solicite.
    const archivoOculto = path.join(
        __dirname,
        "registro-oculto.jsonl"
    );

    fs.appendFileSync(
        archivoOculto,
        JSON.stringify(registroOculto) + "\n",
        "utf8"
    );

    return true;
}

module.exports = { validarCliente };
