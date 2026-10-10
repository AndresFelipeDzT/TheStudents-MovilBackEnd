import { Usuario } from "../models/Usuario.js";
import { Resena } from "../models/Resena.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (!usuarios) {
            return res.status(404).json({ message: "Usuarios not found" });
        }
        res.json(usuarios);
    } catch (error) {
        console.error("Error fetching usuarios:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario not found" });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Error fetching usuario:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPerfilUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioBD = await Usuario.findByPk(id, {
            include: [
                {
                    model: Resena,
                    as: "resenas_recibidas",
                    include: [{ model: Usuario, as: "autor" }]
                },
                {
                    model: Resena,
                    as: "resenas_escritas",
                    include: [{ model: Usuario, as: "resenado" }]
                }
            ]
        });

        if (!usuarioBD) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Convertir la instancia de Sequelize a un objeto llano de JS
        const usuarioPlain = usuarioBD.toJSON();

        // Extraer las reseñas para que NO queden anidadas dentro de 'usuario'
        const { resenas_recibidas = [], resenas_escritas: resenas_creadas = [], ...usuario } = usuarioPlain;

        // Retornar en JSON con los objetos separados a nivel superior
        res.json({
            usuario,
            resenas_recibidas,
            resenas_creadas
        });

    } catch (error) {
        console.error("Error fetching perfil usuario:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
