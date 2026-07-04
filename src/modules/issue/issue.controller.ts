import type { NextFunction, Request, Response } from "express"
import sendResponse from "../../utility/sendResponse"
import { issueService } from "./issue.service"

const createIssue = async(req: Request, res: Response, next: NextFunction)=>{
    try {
       
        const result = await issueService.createIssueIntoDB(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result.rows[0]
        })
    //    console.log(result);
    } catch (error: any) {
        next(error)

     
    }
}

const getAllIssues = async(req: Request, res: Response, next: NextFunction)=>{
 try {
        
        const result = await issueService.getAllIssuesFromDB()

        if(result.rows.length > 0){
 sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issues retrived successfully",
            data: result.rows
        })
        }else{

            sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "Issues not found",
            data:{}
        })
            
        }
       
    //    console.log(result);

    } catch (error: any) {
        next(error)

    }
}


const getSingleIssue = async(req: Request, res: Response, next: NextFunction)=>{
 try {
       const {id} = req.params
        const result = await issueService.getSingleIssueFromDB(id as string)

if(result.rows.length > 0){
  sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrived successfully",
            data: result.rows[0]
        })
        }else{

            sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "No issue found",
            data:{}
        })
            
        }  
    //    console.log(result);

    } catch (error: any) {
       next(error)
// console.log(error);
    }
}


const updateIssue = async(req: Request, res: Response, next: NextFunction)=>{
 try {
       const {id} = req.params
        const result = await issueService.updateIssueIntoDB(req.body, id as string)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: result.rows[0]
        })
    //    console.log(result);

    } catch (error: any) {
       next(error)

    }
}

const deleteIssue =  async(req: Request, res: Response, next: NextFunction)=>{
 try {
       const {id} = req.params
        const result = await issueService.deleteIssueFromDB(id as string)
if(result.rowCount === 0){

    sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found!",
            data: {}
        })
        }

            sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
            data: {}
        })

        

    } catch (error: any) {
       next(error)

    }
}

export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue

}