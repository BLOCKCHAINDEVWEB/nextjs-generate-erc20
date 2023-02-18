import { db } from '../../lib/db/conf.js'


export default async function handler(req, res) {
  const response = await db.query('SELECT NOW()')

  return res.status(200).json({ message: 'Pong!', time: response.rows[0].now })
}