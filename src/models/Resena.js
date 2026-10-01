import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Resena = sequelize.define(
    "Resenas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        autor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Usuarios",
                key: "id"
            }
        },
        resenado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Usuarios",
                key: "id"
            }
        },
        contenido: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        fecha_edicion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING(12),
            allowNull: false,
            defaultValue: "activo"
        }
    },
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["autor_id", "resenado_id"]
            }
        ]
    }
);
