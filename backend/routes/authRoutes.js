import express from "express";
import authController from "../controllers/authController.js";
const loginRouter = express.Router();

// 📌 1️⃣ Login con correo y contraseña
loginRouter.post("/login", authController.login);

// 📌 1️⃣ Login con email y contraseña
loginRouter.post("/loginWithEmail", authController.loginWithEmail);

// 📌 2️⃣ Registro con correo y contraseña
loginRouter.post("/register", authController.register);

export default loginRouter;
