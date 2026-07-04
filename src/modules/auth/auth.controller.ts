import type { NextFunction, Request, Response } from "express"
import { userService } from "./auth.service"
import sendResponse from "../../utility/sendResponse"

const createUser =async(req: Request, res: Response, next: NextFunction)=>{
 try {
        const result = await userService.createUserIntoDB(req.body)

       sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
// console.log(result.rows);
            
        

    } catch (error: any) {
       next(error)

    }
}

export const authController = {
    createUser
} 