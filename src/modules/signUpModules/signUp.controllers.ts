import { Response, Request } from "express"
import { signupService } from "./signUp.service"

const signUp = async (req : Request, res : Response) => {
    try {
        const result = await signupService.signup(req.body);
        // console.log(result);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error : any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const signupController = {
    signUp
}