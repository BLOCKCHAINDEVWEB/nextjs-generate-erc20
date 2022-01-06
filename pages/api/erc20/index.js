import { db } from '../../../utils/database'

export default async function handler(req, res) {
  const { method, body } = req

  if (method === "GET") {
    try {
      const query = 'SELECT * FROM tokensERC20'
      const receipt = await db.query(query)

      return res.status(200).json({ status: 'success', tokensErc20: receipt.rows })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  } else if (method === "POST") {
    if (!body) {
      res.status(404).end('Error empty body')

      return
    }

    try {
      const { contract_address, token_network, token_name, token_symbol, total_supply, sender_address, token_description } = body

      const query = 'INSERT INTO tokensERC20(contract_address, token_network, token_name, token_symbol, total_supply, sender_address, token_description) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
      const values = [contract_address, token_network, token_name, token_symbol, total_supply, sender_address, token_description]

      const receipt = await db.query(query, values)

      return res.status(200).json({ status: 'success', res: receipt.rows[0] })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    } else {
    return res.status(400).json({ message: "Method are not supported" });
  }
}