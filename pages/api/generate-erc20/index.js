import { ethers } from 'ethers'


export default async function handler(req, res) {
  const { method, body } = req

  if (!body) {
    res.status(404).end('Error empty body')
    return
  }

  const NEXT_PUBLIC_KEY_DEPLOYER = process.env.NEXT_PUBLIC_KEY_DEPLOYER
  const NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER = process.env.NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER

  const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.alchemyapi.io/v2/On8ctqGnm8FciK-a4Q5FnC7btoY68uTg')
  const signer = new ethers.Wallet(NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER, provider)

  if (method === "POST") {
    try {
      const { abi, bytecode, name, symbol, supply } = body
      const factory = new ethers.ContractFactory(abi, bytecode, signer)
      const contract = await factory.deploy(name, symbol, NEXT_PUBLIC_KEY_DEPLOYER, supply)

      const receipt = await contract.deployTransaction.wait()
  
      res.status(200).json({ status: 'success', receipt: receipt })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}