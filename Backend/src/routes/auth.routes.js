import e, { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validator/auth.validator.js";

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body  {name, username, email, password, isAdmin}
 */
authRouter.post("/register", registerValidator, registerController);

export default authRouter;
