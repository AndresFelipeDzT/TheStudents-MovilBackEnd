import { Router } from "express";
import { getUsuarios, getUsuarioById } from "../controller/usuario.controller.js";

const router = Router();

//localhost:3000/usuario
router.get("/", getUsuarios);

//localhost:3000/usuario/:id
router.get("/:id", getUsuarioById);

export default router;