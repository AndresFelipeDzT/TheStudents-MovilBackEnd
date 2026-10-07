import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";


export const Usuario = sequelize.define(
    "Usuarios",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        correo: {
            type: DataTypes.STRING(120),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        nombre_usuario: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        biografia: {
            type: DataTypes.STRING(280),
            allowNull: true
        },
        foto_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        color_perfil: {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                is: /^#[0-9A-Fa-f]{6}$/
            }
        },
        carrera: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        semestre: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(12),
            allowNull: false,
            defaultValue: "activo"
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: false
    }
);
