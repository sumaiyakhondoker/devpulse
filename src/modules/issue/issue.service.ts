import type { NextFunction } from "express"
import { pool } from "../../db"
import type { IIssueBody, IIssueDetails, Iuser } from "./issue.interface"
import sendResponse from "../../utility/sendResponse"

const createIssueIntoDB = async(payload: IIssueBody, reporterId: number)=>{
     const {title, description, type} = payload
    const result = await pool.query(`
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES($1,$2,$3, $4)
        RETURNING *
        
        `, [title, description, type,reporterId])

       

        return result
}


const getAllIssuesFromDB =  async()=>{
    const issuesData = await pool.query(`
         SELECT * FROM issues 
         `)

        

         const issues = issuesData.rows
         const reporterIds = issues.map((issue) => issue.reporter_id)
         const uniqueReporterIds = [...new Set(reporterIds)];
         

          const usersData =  await pool.query(`
         SELECT * FROM users WHERE id = ANY($1)
         `, [uniqueReporterIds])


          const users = usersData.rows;

          const result = issues.map((issue: IIssueDetails)=>{
            const issueReporter = users.find((user: Iuser)=>user.id === issue.reporter_id)
          const {reporter_id, created_at,updated_at, ...rest} = issue
            return {
                ...rest,
                reporter: {
                    id: issueReporter?.id,
                    name: issueReporter?.name,
                    role: issueReporter?.role

                },
                created_at,
                updated_at
            }
          })

       



        return result
}

const getSingleIssueFromDB =async (id : string)=>{
    const issueDetails = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `, [id])

        const issuesData = await pool.query(`
         SELECT * FROM issues 
        
         `)

    const issues = issuesData.rows
   
  
const issueIds = issues.map((issue:IIssueDetails) => Number(issue.id)) as Array<number>
if(!issueIds.includes(Number(id))){
    throw new Error("This issue is not found. Please provide a proper issue id")
}

        const {reporter_id, created_at, updated_at, ...issueRest} =  issueDetails.rows[0]

   
        if(!reporter_id){
           return null
        }

        const reporterDetials = await pool.query(`
       SELECT * FROM users WHERE id=$1        
        `, [reporter_id])

        const reporter = reporterDetials.rows[0]
      
    

        const result = {
            ...issueRest,
            reporter: {
                id: reporter?.id,
                name: reporter?.name,
                role: reporter?.role
            },
            created_at,
             updated_at
        }

       return result
}
const updateIssueIntoDB =async (payload: IIssueBody, id : string)=>{
    const {title, description, type} = payload

    const issuesData = await pool.query(`
         SELECT * FROM issues 
        
         `)

    const issues = issuesData.rows
   
  
const issueIds = issues.map((issue:IIssueDetails) => Number(issue.id)) as Array<number>
if(!issueIds.includes(Number(id))){
    throw new Error("This issue is not found. Please provide a proper issue id")
}


    const result = await pool.query(`
        UPDATE issues 
        SET title = COALESCE($1, title),
        description =COALESCE($2, description) ,
        type =COALESCE($3, type),
        updated_at = NOW()
        WHERE id=$4
        RETURNING *

        `, [title, description, type,id])

        return result
}

const deleteIssueFromDB = async (id : string)=>{
   
    const result = await pool.query(`
       DELETE FROM issues WHERE id=$1
        `, [id])

        return result
}


export const issueService = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB
}