
import {Router} from "express";
import { signupController } from "./signUp.controllers";
const router = Router();


// http://localhost:5000/api/v1/auth/signup
router.post("/", signupController.signUp);



export const signupRoutes = {
    router

}