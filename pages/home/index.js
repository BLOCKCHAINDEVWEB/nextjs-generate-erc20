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
  const [totalSypplyErc20, setTotalSupplyErc20] = useState('1000')
  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const [smartContractErc20, setSmartContractErc20] = useState('0x5BD37d9831E8aF6013b141C516076F4cFe3AB8c1')
  const [contractName, setContractName] = useState('')
  const [contractSymbol, setContractSymbol] = useState('')
  const [contractSupply, setContractSupply] = useState(0)

  useEffect(() => {
    if (accounts.length > 0) setIsConnectedWeb3(true)
  }, [accounts])

  useEffect(async () => {
    const contractErc20 = new ethers.Contract(smartContractErc20, Erc20Mock.abi, provider)
    if (provider) {
      const constractErc20Name = await contractErc20.name()
      setContractName(constractErc20Name)
      const constractErc20Symbol = await contractErc20.symbol()
      setContractSymbol(constractErc20Symbol)
      const contractErC20Supply = await contractErc20.totalSupply()
      const contractErc20SupplyEth = ethers.utils.formatEther(BigInt(Number(contractErC20Supply)))
      setContractSupply(parseInt(contractErc20SupplyEth))
    }
  }, [provider])

  const handleGenerateErc20 = async () => {
    if (nameErc20 === '' || symbolErc20 === '' || totalSypplyErc20 === '') {
      return
    }

    const totalSupplyWei = ethers.utils.parseEther(totalSypplyErc20)
    const receiptErc20 = await fetch('./api/generate-erc20', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        abi: Erc20Mock.abi,
        bytecode: Erc20Mock.bytecode,
        name: nameErc20,
        symbol: symbolErc20,
        supply: totalSupplyWei
      })
    })
    console.log(receiptErc20)
  }

  return (
    <section>
      <div className={`flex flex-wrap flex-row place-items-center mx-40 ${isConnectedWeb3 ? 'mt-[118px]' : ''}`}>
          {isConnectedWeb3 ? '' : <Button
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm m-10"
            action={connectWallet}
            content="Connect to Web3"
          />
          }
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
                onChange={e => setTotalSupplyErc20(e.target.value)}
                value={totalSypplyErc20}
              />
            </div>
          </div>
          <Button
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm m-10"
            action={handleGenerateErc20}
            content="Generate Erc20"
            isDisabled={isDisabledButton}
          />
        </div>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Smart Contract ERC20</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Token Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Total Supply</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                <tr>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">{smartContractErc20}</div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">{contractName}</div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">{`${contractSupply} ${contractSymbol}`}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </section>
  )
}