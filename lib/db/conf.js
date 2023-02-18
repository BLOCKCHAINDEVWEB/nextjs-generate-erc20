import 'dotenv/config'
import PG from 'pg'

const { Pool } = PG

const user = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const host = process.env.POSTGRES_HOST
const port = process.env.POSTGRES_PORT
const database = process.env.POSTGRES_DATABASE

const auth = {
  user,
  password,
  database,
  port,
  host,
  ssl: process.env.ENV === 'PRODUCTION' ? { rejectUnauthorized: false } : false,
}

export const db = new Pool(auth)