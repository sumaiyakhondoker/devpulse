import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";
import type { IGetAllIssues, IUser } from "./issue.interface";
import { IssueStatus, UserRoles } from "../../types";

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
  const reporterId = req?.user?.id;

   const validIssueTypes = ["bug" , "feature_request"]
   if(!validIssueTypes.includes(req.body.type)){
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Please give a valid issue type like 'bug' or 'feature_request' ",
    
    });
   }
    const result = await issueService.createIssueIntoDB(req.body, reporterId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result
    });
  
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
    // console.log(queryParams);
    const result = await issueService.getAllIssuesFromDB(queryParams);

      

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
    const user= req?.user
    // console.log(typeof UserRoles.maintainer );
  try {
    const { id } = req.params;
    if(user?.role !== "maintainer" && user?.role !== "contributor"){
     return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden. Only contributors and maintainers can update issues."
        
      })
    }
    const result = await issueService.updateIssueIntoDB(req.body, id as string, user);
    // console.log(result);
     if (!result) {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "No issue updated because contributor can only update his own issue, only if the issue status is open"
        
      });
    } else{
        sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result
    });
    }
        
    
  
   
  } catch (error: any) {
    next(error);
  }
};



const updateIssueStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req?.params;
    const user= req?.user


    if(user?.role !== "maintainer"){
return sendResponse(res, {
      statusCode: 403,
      success: false,
      message: "Forbidden: only maintainer can update the issue status"
    });
    }

    if(!req.body.status){
        return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Please give status property and its value in request body",
      data: {}
    });
    }
    const validStatus = [IssueStatus.open, IssueStatus.in_progress, IssueStatus.resolved]
     if(!validStatus.includes(req.body.status)){
        return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Please give proper status value in request body",
      data: {}
    });
    }


    const result = await issueService.updateIssueStatusIntoDB(req.body, id as string);
    
  


    if (!result) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "No issue found"
        
      });
    } else{
        sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue status updated successfully",
      data: result
    });
    }
  
  } catch (error: any) {
    next(error);
  }
};
const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await issueService.deleteIssueFromDB(id as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue already deleted!",
        data: {},
      });
    }else{
      sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
      data: {},
    });
    }

    
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
