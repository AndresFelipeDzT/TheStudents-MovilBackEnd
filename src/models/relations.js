import { Usuario } from "./Usuario.js";
import { Resena } from "./Resena.js";

export function setupRelations() {

    // Usuario que reseña muchos usuarios (como autor)
    Usuario.belongsToMany(Usuario, {
        through: Resena,
        as: "resenados",
        foreignKey: "autor_id",
        otherKey: "resenado_id"
    });

    // Usuario que es reseñado por muchos usuarios (como reseñado)
    Usuario.belongsToMany(Usuario, {
        through: Resena,
        as: "autores",
        foreignKey: "resenado_id",
        otherKey: "autor_id"
    });

}
