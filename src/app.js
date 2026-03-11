import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { handleError } from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);

//Health check
app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});

app.use(handleError);

export default app;
