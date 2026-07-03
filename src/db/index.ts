
import {Pool} from 'pg'
import config from '../config'

 export const pool  = new Pool({
   connectionString : config.database_url
 })

export const initDB = async()=>{
   try {
    // await pool.query(`
    //      
        
    //     `)

    console.log('Database connected successfully!!');
   } catch (error) {
    console.log('error from db folder', error);
   }
}