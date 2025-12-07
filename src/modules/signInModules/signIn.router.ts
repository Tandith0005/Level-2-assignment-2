import {Router} from "express";
import { signinController } from "./signIn.controller";
const router = Router();


// http://localhost:5000/api/v1/auth/signin
router.post("/", signinController.signIn);



export const signinRoutes = {
    router

}