import { Pool } from 'pg'

let db

if (!db) {
  db = new Pool({
    user: 'root',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'tokens',
  })
}

export { db }