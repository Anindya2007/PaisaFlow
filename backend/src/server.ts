import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import checkAuth from './middleware/auth_middleware.js'
import { check } from "better-auth";
import universalRouter from './routes/app.js'


const app = express();

app.all("/api/auth/{*path}", toNodeHandler(auth));

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Finance Manager API is running!");
});

app.use('/api',universalRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});