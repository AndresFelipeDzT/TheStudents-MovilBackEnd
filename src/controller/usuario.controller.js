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
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const [resenas_recibidas, resenas_creadas] = await Promise.all([
            Resena.findAll({
                where: { resenado_id: id },
                include: [
                    {
                        model: Usuario,
                        as: "autor"
                    }
                ],
                attributes: { exclude: ["autor_id", "resenado_id"] }
            }),
            Resena.findAll({
                where: { autor_id: id },
                include: [
                    {
                        model: Usuario,
                        as: "resenado"
                    }
                ],
                attributes: { exclude: ["autor_id", "resenado_id"] }
            })
        ]);

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