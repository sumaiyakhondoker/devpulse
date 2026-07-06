import { UserRoles } from './../types/index';
import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import config from '../config';
import { pool } from '../db';
import sendResponse from '../utility/sendResponse';
import type { TRoles } from '../types';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("from header", req.headers.authorization);
   try {
     const token = req.headers.authorization;
    if (!token) {
     return res.status(401).json({
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
          return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "User not found"
        })
        }
        const user = result.rows[0]

        req.user = user


console.log("User Role:",  user.role);
console.log("Passed Auth Middleware");
    next();
   } catch (error) {
    next(error)
   }
  };
};

export default auth;

