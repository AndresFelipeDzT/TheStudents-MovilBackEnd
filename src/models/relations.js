import { Usuario } from "./Usuario.js";
import { Resena } from "./Resena.js";
import { Inscripcion } from "./Inscripcion.js";

export function setupRelations() {

    // Inscripcion <-> Usuario
    Usuario.hasMany(Inscripcion, {
        as: "inscripciones",
        foreignKey: "usuario_id",
        onDelete: "cascade",
        hooks: true
    });

    Inscripcion.belongsTo(Usuario, {
        as: "usuario",
        foreignKey: "usuario_id"
    });

    // Resena <-> Usuario
    Resena.belongsTo(Usuario, {
        as: "autor",
        foreignKey: "autor_id"
    });

    Resena.belongsTo(Usuario, {
        as: "resenado",
        foreignKey: "resenado_id"
    });

    Usuario.hasMany(Resena, {
        as: "resenas_escritas",
        foreignKey: "autor_id",
        onDelete: "cascade",
        hooks: true
    });

    Usuario.hasMany(Resena, {
        as: "resenas_recibidas",
        foreignKey: "resenado_id",
        onDelete: "cascade",
        hooks: true
    });

}
