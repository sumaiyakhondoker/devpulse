import type { NextFunction, Request, Response } from "express"
import { authService} from "./auth.service"
import sendResponse from "../../utility/sendResponse"
import { UserRoles } from "../../types"

const createUser =async(req: Request, res: Response, next: NextFunction)=>{
 try {
    const requestedRole = req.body.role ?  req.body.role : "contributor"

    const validRoles = [UserRoles.contributor, UserRoles.maintainer]
     const role = requestedRole
        if(!validRoles.includes(role)){
            return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to create user. Please try with a valid role",
            data:{}
        })
        }
        const result = await authService.createUserIntoDB(req.body)
       
if(result.rows.length === 0){
    sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to create user. Please try again ",
            data:{}
        })
}
       sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
      

    } catch (error: any) {
       next(error)

    }
}

const loginUser = async(req: Request, res: Response, next: NextFunction) =>{
   
try {

     const result = await authService.loginUserIntoDB(req.body)
    sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result

            
            
        })
} catch (error) {
    next(error)
}
   

}
export const authController = {
    createUser,
    loginUser
} 