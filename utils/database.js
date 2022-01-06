import { Pool } from 'pg'

let db

if (!db) {
  db = new Pool({
    user: 'admin',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'development',
  })
}

export { db }