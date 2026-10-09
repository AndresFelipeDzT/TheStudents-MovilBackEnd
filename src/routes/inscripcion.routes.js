import { Router } from "express";
import { getCompanerosByUsuarioId } from "../controller/inscripcion.controller.js";

const router = Router();

//localhost:3000/inscripcion/companeros/:usuario_id
router.get("/companeros/:usuario_id", getCompanerosByUsuarioId);

export default router;
