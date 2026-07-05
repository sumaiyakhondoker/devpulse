import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import config from '../config';
import { pool } from '../db';
import sendResponse from '../utility/sendResponse';
import type { TRoles } from '../types';

const auth = (...roles:TRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("from header", req.headers.authorization);
   try {
     const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token as string, config.access_secret as string) as JwtPayload
    // console.log(decoded);

    const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
       
        `, [decoded.id])


        if( result.rows.length === 0){
            sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found"
        })
        }
        const user = result.rows[0]

        req.user = user


      if(!roles.length && roles.includes(user.role)){
        sendResponse(res, {
            statusCode: 403,
            success: false,
            message: "Forbidden. Only contributors and maintainers can create issues.",
         
        })
      }
      if(!roles.length && user.role=== 'maintainer'){
        sendResponse(res, {
            statusCode: 403,
            success: false,
            message: "Forbidden. Only maintainers can delete issues.",
         
        })
      }

    next();
   } catch (error) {
    next(error)
   }
  };
};

export default auth;

