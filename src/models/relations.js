import { Usuario } from "./Usuario.js";
import { Resena } from "./Resena.js";
import { Inscripcion } from "./Inscripcion.js";

export function setupRelations() {

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

    // Inscrito reseña muchas inscripciones (como autor)
    Inscripcion.belongsToMany(Inscripcion, {
        through: Resena,
        as: "resenados",
        foreignKey: "inscripcion_autor_id",
        otherKey: "inscripcion_resenado_id"
    });

    // Inscripcion que es reseñado por muchos inscritos (como reseñado)
    Inscripcion.belongsToMany(Inscripcion, {
        through: Resena,
        as: "autores",
        foreignKey: "inscripcion_resenado_id",
        otherKey: "inscripcion_autor_id"
    });

}
