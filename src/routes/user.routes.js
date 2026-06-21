import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import upload from "../utils/multer.js";

const router  = express.Router();

router.route('/register').post(registerUser);





export default router;