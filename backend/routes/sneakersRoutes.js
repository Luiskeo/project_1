import express from "express";
import sneakersController from "../controllers/sneakersController.js";

const router = express.Router();

router.get("/sneakers", sneakersController.getSneakers);

export default router;
