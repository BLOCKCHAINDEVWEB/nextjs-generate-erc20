import { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'

import useWeb3 from '../../lib/useWeb3'
import Erc20Mock from '../../smart-contract-abi/ERC20Mock.json'
import { Button } from '../../components/Button'


export default function Home() {
  const {
    provider,
    signer,
    accounts,
    balance,
    connectWallet
  } = useWeb3()

  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [nameErc20, setNameErc20] = useState('ERC20Mock')
  const [symbolErc20, setSymbolErc20] = useState('ERC20M')
  const [totalSupplyEth, setTotalSupplyEth] = useState('1000')
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [smartContractErc20, setSmartContractErc20] = useState([{ name: 'ERC20Mock', symbol: 'ERC20M', contractAddress: '0x771BbBA78cD9CB11AD7481D5F157efDa2b0dAC60', totalSupply: 10000 }])
  const [contractName, setContractName] = useState('')
  const [contractSymbol, setContractSymbol] = useState('')
  const [contractSupply, setContractSupply] = useState(0)
  const [isLoading, setIsLoading]  = useState(false)

  const NEXT_PUBLIC_KEY_DEPLOYER = process.env.NEXT_PUBLIC_KEY_DEPLOYER
  const NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER = process.env.NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER

  useEffect(() => {
    if (accounts.length > 0) setIsConnectedWeb3(true)
  }, [accounts])

  const handleGenerateErc20 = async () => {
    if (nameErc20 === '' || symbolErc20 === '' || totalSupplyEth === '') {
      return
    }

    const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.alchemyapi.io/v2/On8ctqGnm8FciK-a4Q5FnC7btoY68uTg')
    const signer = new ethers.Wallet(NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER, provider)
    
    const totalSupplyWei = ethers.utils.parseEther(totalSupplyEth)

    const factory = new ethers.ContractFactory(Erc20Mock.abi, Erc20Mock.bytecode, signer)
    const contract = await factory.deploy(nameErc20, symbolErc20, NEXT_PUBLIC_KEY_DEPLOYER, totalSupplyWei)
    
    setIsLoading(true)
    const receiptErc20 = await contract.deployTransaction.wait()
    setIsLoading(false)
    setSmartContractErc20([...smartContractErc20, { name: nameErc20, symbol: symbolErc20, contractAddress: receiptErc20.contractAddress, totalSupply: totalSupplyEth }])
  }

  return (
    <section>
      <h1 className="text-center pt-3">POC Generate Token Erc20</h1>
      {isConnectedWeb3 ? '' : <Button
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-6 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm mx-40 my-5"
        action={connectWallet}
        content="Connect to Web3"
      />
      }
      <div className={`flex flex-wrap flex-row place-items-center mx-[90px] ${isConnectedWeb3 ? 'mt-[78px]' : ''}`}>
          <div className="w-screen pb-3">
            <label htmlFor="name" className="block text-xs text-[#2B2B2B]">Name ERC20</label>
            <div className="flex mt-1 relative rounded-md">
              <input
                type="text"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setNameErc20(e.target.value)}
                value={nameErc20}
              />
            </div>
          </div>
          <div className="w-screen pb-3">
            <label htmlFor="symbol" className="block text-xs text-[#2B2B2B]">Symbol ERC20</label>
            <div className="flex mt-1 relative rounded-md">
              <input
                type="text"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setSymbolErc20(e.target.value)}
                value={symbolErc20}
              />
            </div> 
          </div>
          <div className="w-screen pb-3">
            <label htmlFor="supply" className="block text-xs text-[#2B2B2B]">Total supply (ETH)</label>
            <div className="flex mt-1 relative rounded-md">
              <input
                type="text"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setTotalSupplyEth(e.target.value)}
                value={totalSupplyEth}
              />
            </div>
          </div>
          <Button
            className="inline-flex justify-center w-[200px] rounded-md border border-transparent shadow-sm px-10 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm m-3"
            action={handleGenerateErc20}
            content={isLoading ? (<><svg className="animate-spin -ml-6 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generate Erc20</>) : "Submit"}
            isDisabled={isDisabledButton}
          />
        </div>
        {isConnectedWeb3
          ? <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Smart Contract ERC20</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Token Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Total Supply</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {smartContractErc20?.map((smartContract, i) => {
                      return (
                        <tr key={i}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 font-medium text-gray-800">{smartContract.contractAddress}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 text-center font-medium text-gray-800">{smartContract.symbol}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 text-center font-medium text-gray-800">{`${smartContract.totalSupply} ${contractSymbol}`}</div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          : ''
        }
    </section>
  )
}