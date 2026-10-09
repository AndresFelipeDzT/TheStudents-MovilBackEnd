import { Router } from "express";
import { getUsuarios, getUsuarioById, getPerfilUsuario } from "../controller/usuario.controller.js";

const router = Router();

//localhost:3000/usuario
router.get("/", getUsuarios);

//localhost:3000/usuario/perfil/:id
router.get("/perfil/:id", getPerfilUsuario);

//localhost:3000/usuario/:id
router.get("/:id", getUsuarioById);

export default router;