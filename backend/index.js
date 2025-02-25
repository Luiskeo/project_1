import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

import sneakersRouter from "./routes/sneakersRoutes.js";
import loginRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.use("/api", loginRouter);
app.use("/api", sneakersRouter);

app.listen(port, () => {
    console.log(`Server running on route http://localhost:${port}`);
});
