import { Usuario } from "./Usuario.js";
import { Resena } from "./Resena.js";

export function setupRelations() {

    // 1. Relación con el Autor (El usuario que escribe la reseña)
    Usuario.hasMany(Resena, {
        foreignKey: "autor_id",
        as: "resenasEscritas", // Reseñas que este usuario ha escrito
        onDelete: "CASCADE",
        hooks: true
    });
    Resena.belongsTo(Usuario, {
        foreignKey: "autor_id",
        as: "autor" // Quién escribió esta reseña
    });

    // 2. Relación con el Reseñado (El usuario que recibe la reseña en su perfil)
    Usuario.hasMany(Resena, {
        foreignKey: "resenado_id",
        as: "resenasRecibidas", // Reseñas que tiene este usuario
        onDelete: "CASCADE",
        hooks: true
    });
    Resena.belongsTo(Usuario, {
        foreignKey: "resenado_id",
        as: "resenado" // A qué usuario pertenece este perfil reseñado
    });

}
