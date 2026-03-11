import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Health check
app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});

export default app;
