import { db } from './conf.js'

export const getTokens = async () => {
  try {
    const { rows: resFetchTokens } = await db.query('SELECT * FROM tokens_erc20')

    return resFetchTokens || []
  } catch (error) {
    console.error(error)
  }
}

export const setTokens = async ({
  contractAddress,
  tokenNetwork,
  tokenName,
  tokenSymbol,
  totalSupply,
  senderAddress,
  tokenDescription,
}) => {
  try {
    const { rows: resSetTokens } = await db.query(
      'INSERT INTO tokens_erc20 (contract_address, token_network, token_name, token_symbol, total_supply, sender_address, token_description) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [contractAddress, tokenNetwork, tokenName, tokenSymbol, totalSupply, senderAddress, tokenDescription]
    )

    return resSetTokens || []
  } catch (error) {
    console.error(error)
  }
}
