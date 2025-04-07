import { config } from 'dotenv'

config()

export const database = {
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "mypassword",
    database: process.env.DB_DATABASE || 'TEAM_MANAGER_DB',
    port: process.env.DB_PORT || 3306,
  };
  
export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'some_secret_key';