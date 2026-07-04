import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    access_secret: process.env.ACCESS_SECRET,
    access_expired_time: process.env.ACCESS_EXPIRES_IN as string,

}

export default config