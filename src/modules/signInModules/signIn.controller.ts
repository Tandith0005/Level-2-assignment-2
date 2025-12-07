import { Response, Request } from "express"
import { signinService } from "./signIn.service";

const signIn = async (req : Request, res : Response) => {
    try {
        const result = await signinService.signin(req.body);
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error : any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const signinController = {
    signIn
}