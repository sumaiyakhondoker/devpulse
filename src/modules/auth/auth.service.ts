import bcrypt from "bcryptjs"
import { pool } from "../../db"
import type { IUserRegisterInfo, IUserLoginInfo } from "./auth.interface"
import jwt from 'jsonwebtoken'
import config from "../../config"
import ms from 'ms';

const createUserIntoDB = async(payload: IUserRegisterInfo)=>{
    const {name, email, password, role} = payload

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES($1,$2,$3, COALESCE($4, 'contributor'))
            RETURNING *
            
            `, [name, email, hashedPassword, role])
    
            delete result.rows[0].password
            return result
}

const loginUserIntoDB = async(payload:IUserLoginInfo)=>{
const {email, password} = payload

const result = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email])

    if(result.rows.length === 0){
        throw new Error("Invalid Creadentials")
    }
    const userData = result.rows[0]
    // console.log(userData);
    const isPasswordMatched =  await bcrypt.compare(password, userData.password)
    if(!isPasswordMatched){
        throw new Error("Invalid Creadentials")
    }

    const jwtPayload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role

    }

    const token = jwt.sign(jwtPayload, config.access_secret as string, {expiresIn: config.access_expired_time as ms.StringValue})
    
    const user = {
        id: userData.id,
        name: userData.name,
        email:userData.email,
        role: userData.role,
        created_at: userData.created_at,
        updated_at: userData.updated_at
        
        

    }
    
    return {token, user}
}

export const authService ={
    createUserIntoDB,
    loginUserIntoDB,

}