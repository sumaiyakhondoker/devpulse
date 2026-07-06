import { pool } from "../../db"
import type { IGetAllIssues, IIssueBody, IIssueDetails, IStatus, IUser} from "./issue.interface"
import { UserRoles } from "../../types"
import sendResponse from "../../utility/sendResponse"

const createIssueIntoDB = async(payload: IIssueBody, reporterId: number)=>{
     const {title, description, type} = payload
    const IssueDetails = await pool.query(`
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES($1,$2,$3, $4)
        RETURNING *
        
        `, [title, description, type,reporterId])

       
const result = { ...IssueDetails.rows[0], reporter_id: reporterId }
        return result
}


const getAllIssuesFromDB =  async(queryParams: IGetAllIssues)=>{

    const sort = queryParams.sort === 'oldest' ? 'ASC' : 'DESC'
    const status = queryParams.status
    const type = queryParams.type
    const issuesData = await pool.query(`
         SELECT * FROM issues`
        )
        //  SELECT * FROM issues WHERE status=$1 AND type=$2 ORDER BY created_at ${sort}`,[status, type]

        

         const issues = issuesData.rows
         console.log(issues);
         const reporterIds = issues.map((issue) => issue.reporter_id)
         const uniqueReporterIds = [...new Set(reporterIds)];
         

          const usersData =  await pool.query(`
         SELECT * FROM users WHERE id = ANY($1) 
         `, [uniqueReporterIds])


          const users = usersData.rows;

          const result = issues.map((issue: IIssueDetails)=>{
            const issueReporter = users.find((user: IUser)=>user.id === issue.reporter_id)
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

       

    const issue = issueDetails.rows[0]
   
  
if(!issue){
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
const updateIssueIntoDB =async (payload: IIssueBody, id : string, user: IUser)=>{
    const {title, description, type} = payload


   
    const issuesData = await pool.query(`
         SELECT * FROM issues WHERE id=$1
        
         `,[id])

    const issue = issuesData.rows[0]
if(!issue){
    throw new Error("This issue is not found. Please provide a proper issue id")
}

// console.log(typeof user.role)


    if(user.role === "maintainer"){
        const IssueDetails = await pool.query(`
        UPDATE issues 
        SET title = COALESCE($1, title),
        description =COALESCE($2, description) ,
        type =COALESCE($3, type),
        updated_at = NOW()
        WHERE id=$4
        RETURNING *

        `, [title, description, type,id])

        const result = IssueDetails.rows[0]
        return result
        
    }
    else if(user.role === "contributor"){
        if(user.id === issue.reporter_id && issue.status === 'open'){
            const IssueDetails = await pool.query(`
        UPDATE issues 
        SET title = COALESCE($1, title),
        description =COALESCE($2, description) ,
        type =COALESCE($3, type),
        updated_at = NOW()
        WHERE id=$4
        RETURNING *

        `, [title, description, type,id])

        const result = IssueDetails.rows[0]
        return result

        }
       
    }

        
}
const updateIssueStatusIntoDB =async (payload: IStatus, id : string)=>{
    const {status} = payload

     const issuesData = await pool.query(`
         SELECT * FROM issues WHERE id=$1
        
         `,[id])

    const issue = issuesData.rows[0]
if(!issue){
    throw new Error("This issue is not found. Please provide a proper issue id")
}


    const issueData = await pool.query(`
        UPDATE issues 
        SET status = COALESCE($1, status),
        updated_at = NOW()
        WHERE id=$2
        RETURNING *

        `, [status,id])

        const result = issueData.rows[0]
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
    updateIssueStatusIntoDB,
    deleteIssueFromDB
}