import dotenv from "dotenv";
dotenv.config();

const config = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
}

export default config