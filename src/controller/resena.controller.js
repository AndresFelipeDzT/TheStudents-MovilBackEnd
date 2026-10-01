import { Resena } from "../models/Resena.js";


export const getResenasByResenadoId = async (req, res) => {
    const { resenado_id } = req.params;
    try {
        const resenas = await Resena.findAll({
            where: { resenado_id }
        });
        if (!resenas) {
            return res.status(404).json({ message: "Resenas not found" });
        }
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getResenasByAutorId = async (req, res) => {
    const { autor_id } = req.params;
    try {
        const resenas = await Resena.findAll({
            where: { autor_id }
        });
        if (!resenas) {
            return res.status(404).json({ message: "Resenas not found" });
        }
        res.json(resenas);
    } catch (error) {
        console.error("Error fetching resenas:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createResena = async (req, res) => {
    const { autor_id, resenado_id, contenido } = req.body;
    try {
        const newResena = await Resena.create({
            autor_id,
            resenado_id,
            contenido
        });
        res.status(201).json(newResena);
    } catch (error) {
        console.error("Error creating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateResena = async (req, res) => {
    const { id } = req.params;
    const { contenido, estado } = req.body;
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            return res.status(404).json({ message: "Resena not found" });
        }
        if (contenido !== undefined || estado !== undefined) {
            await resena.update({ ...(contenido && { contenido }), ...(estado && { estado }), fecha_edicion });
        } else {
            return res.status(400).json({ message: "No fields to update" });
        }
        res.json(resena);
    } catch (error) {
        console.error("Error updating resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
        const resena = await Resena.findByPk(id);
        if (!resena) {
            return res.status(404).json({ message: "Resena not found" });
        }
        await resena.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting resena:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
