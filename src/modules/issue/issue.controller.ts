import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";
import type { IGetAllIssues, IUser } from "./issue.interface";
import type { JwtPayload } from "jsonwebtoken";

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  const reporterId = req?.user?.id;
  try {
    const result = await issueService.createIssueIntoDB(req.body, reporterId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result
    });
    //    console.log(result);
  } catch (error: any) {
    next(error);
  }
};



const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queryParams:IGetAllIssues = req.query;
    const result = await issueService.getAllIssuesFromDB(queryParams);

    //    console.log(result);

    if (result.length > 0) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Issues retrived successfully",
        data: result,
      });
    } else {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issues not found. Please create a new issue",
        data: {},
      });
    }
  } catch (error: any) {
    next(error);
  }
};

const getSingleIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    //    console.log(typeof id);
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (!result) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "No issue found",
        data: {},
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Issue retrived successfully",
        data: result,
      });
    }
    //    console.log(result);
  } catch (error: any) {
    next(error);
    // console.log(error);
  }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user
    // console.log(user);
  try {
    const { id } = req.params;
    const result = await issueService.updateIssueIntoDB(req.body, id as string, user);
    // console.log(result);

     if (!result) {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "No issue updated because contributor can only update his own issue, only if the reporter status is open"
        
      });
    } else{
        sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result
    });
    }
        
    
  
    //    console.log(result);
  } catch (error: any) {
    next(error);
  }
};



const updateIssueStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if(!req.body.status){
        return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Please give proper status value in request body",
      data: {}
    });
    }
    const result = await issueService.updateIssueStatusIntoDB(req.body, id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue status updated successfully",
      data: result.rows[0],
    });
    //    console.log(result);
  } catch (error: any) {
    next(error);
  }
};
const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Delete Controller Hit");
    const { id } = req.params;
    const result = await issueService.deleteIssueFromDB(id as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue already deleted!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
      data: {},
    });
  } catch (error: any) {
    next(error);
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  updateIssueStatus,
  deleteIssue,
};
