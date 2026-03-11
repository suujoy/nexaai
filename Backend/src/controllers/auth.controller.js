import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;

        const isUserExists = await userModel.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (isUserExists) {
            return res.status(400).json({
                message: `User already exist with this ${isUserExists.username ? "username" : "email"}`,
                success: false,
                err: "User already exist",
            });
        }

        const user = await userModel.create({
            name,
            username,
            email,
            password,
        });

        await sendEmail({
            to: email,
            subject: "Welcome to NexaAi",
            text: `Hi ${user.name}, your NexaAi account has been created successfully. Username: ${user.username}.`,
            html: `Hi <b>${user.name}</b>, your <b>NexaAi</b> account has been created successfully.<br><br><b>Username:</b> ${user.username}`,
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user,
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }
};
