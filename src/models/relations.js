import { Usuario } from "./Usuario.js";
import { Resena } from "./Resena.js";

export function setupRelations() {

    // Usuarios que ha reseñado este usuario (como autor)
    Usuario.belongsToMany(Usuario, {
        through: Resena,
        as: "resenados",
        foreignKey: "autor_id",
        otherKey: "resenado_id"
    });

    // Usuarios que han reseñado a este usuario (como reseñado)
    Usuario.belongsToMany(Usuario, {
        through: Resena,
        as: "autores",
        foreignKey: "resenado_id",
        otherKey: "autor_id"
    });

}
