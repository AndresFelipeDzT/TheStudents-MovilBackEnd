import { Router } from "express";
import {
    getCompanerosByUsuarioId,
    getInscripcionById
} from "../controller/inscripcion.controller.js";

const router = Router();

//localhost:3000/inscripcion/companeros/:usuario_id
router.get("/companeros/:usuario_id", getCompanerosByUsuarioId);

//localhost:3000/inscripcion/:id
router.get("/:id", getInscripcionById);

export default router;
