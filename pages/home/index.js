import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'

import useWeb3 from '../../lib/useWeb3'
import Erc20Mock from '../../smart-contract-abi/ERC20Mock.json'
import { Button } from '../../components/Button'
import { SelectNetwork } from '../../components/SelectNetwork'


export default function Home({ status, tokensErc20 }) {
  const router = useRouter()

  const {
    provider,
    signer,
    chainIdUsed,
    accounts,
    balance,
    connectWallet
  } = useWeb3()

  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [networkSelected, setNetworkSelected] = useState([])
  const [tokenName, setTokenName] = useState('ERC20Mock')
  const [tokenSymbol, setTokenSymbol] = useState('ERC20M')
  const [totalSupplyEth, setTotalSupplyEth] = useState('1000')
  const [tokenDescription, setContractDescription] = useState('')
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [isLoading, setIsLoading]  = useState(false)

  const NEXT_PUBLIC_KEY_DEPLOYER = process.env.NEXT_PUBLIC_KEY_DEPLOYER
  const NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER = process.env.NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER
  const NEXT_PUBLIC_GOERLI_PROVIDER_URL = process.env.NEXT_PUBLIC_GOERLI_PROVIDER_URL
  const NEXT_PUBLIC_SOKOL_PROVIDER_URL = process.env.NEXT_PUBLIC_SOKOL_PROVIDER_URL
  const NEXT_PUBLIC_MUMBAI_PROVIDER_URL = process.env.NEXT_PUBLIC_MUMBAI_PROVIDER_URL
  const NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_HOST_URL

  const BLOCKCHAIN_EXPLORER_URL_MAP = {
    goerli: 'https://goerli.etherscan.io',
    sokol: 'https://blockscout.com/poa/sokol',
    mumbai: 'https://mumbai.polygonscan.com'
  };

  const CHAINS_ID_TO_NETWORKS_LIST = {
    5: 'goerli',
    77: 'sokol',
    80001: 'mumbai'
  }

  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    if (accounts.length > 0) {
      setIsConnectedWeb3(true)
      setIsDisabledButton(false)
    }

    const networkNameUsed = CHAINS_ID_TO_NETWORKS_LIST[parseInt(chainIdUsed)] || ''
    if (networkNameUsed === networkSelected) setIsDisabledButton(false)
  }, [accounts, chainIdUsed])

  const createToken = async token => {
    const res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/erc20`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })

    return res
  }

  const handleGenerateErc20 = async () => {
    if (tokenName === '' || tokenSymbol === '' || totalSupplyEth === '') {
      return
    }
    const provider = new ethers.providers.JsonRpcProvider(eval(`NEXT_PUBLIC_${networkSelected.toUpperCase()}_PROVIDER_URL`))

    const signer = new ethers.Wallet(NEXT_PUBLIC_PRIVATE_KEY_DEPLOYER, provider)
    
    const totalSupplyWei = BigInt(Number(ethers.utils.parseEther(totalSupplyEth))).toString()
 
    const factory = new ethers.ContractFactory(Erc20Mock.abi, Erc20Mock.bytecode, signer)
    const contract = await factory.deploy(tokenName, tokenSymbol, NEXT_PUBLIC_KEY_DEPLOYER, totalSupplyWei)
    
    setIsLoading(true)
    const receiptErc20 = await contract.deployTransaction.wait()
    setIsLoading(false)

    const tokenErc20 = {
      contract_address: receiptErc20.contractAddress,
      token_network: networkSelected,
      token_name: tokenName,
      token_symbol: tokenSymbol,
      total_supply: totalSupplyWei,
      sender_address: accounts[0],
      token_description: tokenDescription
    }

    const { status } = await createToken(tokenErc20)
    if (status < 300) refreshData()

  }

  return (
    <section>
      <h1 className="text-center pt-3">POC Generate Token Erc20</h1>
      {!isConnectedWeb3
        ? <Button
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-5 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm mx-40 my-5"
          action={connectWallet}
          content="Connect to Web3"
          />
        : ''
      }
      <div className={`flex flex-wrap flex-row place-items-center mx-[189px] ${isConnectedWeb3 ? 'mt-[78px]' : ''}`}>
          <div className="w-screen ml-[65%]">
            <SelectNetwork
              network={networkSelected}
              setNetwork={value => setNetworkSelected(value)}
            />
          </div>
          <div className="w-screen pb-3 mr-[30%]">
            <label htmlFor="name" className="block text-xs text-[#2B2B2B]">Name ERC20</label>
            <div className="flex mt-1 relative rounded-md">
              <input
                type="text"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setTokenName(e.target.value)}
                value={tokenName}
              />
            </div>
          </div>
          <div className="w-screen pb-3 mr-[30%]">
            <label htmlFor="symbol" className="block text-xs text-[#2B2B2B]">Symbol ERC20</label>
            <div className="flex mt-1 relative rounded-md">
              <input
                type="text"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setTokenSymbol(e.target.value)}
                value={tokenSymbol}
              />
            </div> 
          </div>
          <div className="w-screen pb-3 mr-[30%]">
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
          <div className="w-screen pb-3 mr-[30%]">
            <label htmlFor="description" className="block text-xs text-[#2B2B2B]">Token Description</label>
            <div className="flex mt-1 relative rounded-md">
              <textarea
                name="description"
                rows="2"
                className="text-xs flex-1 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#008DEB] focus:border-transparent"
                onChange={e => setTokenDescription(e.target.value)}
                value={tokenDescription}
              />
            </div>
          </div>
          <Button
            className="inline-flex justify-center w-[200px] rounded-md border border-transparent shadow-sm px-10 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            action={handleGenerateErc20}
            content={isLoading ? (<><svg className="animate-spin -ml-6 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generate Erc20</>) : "Submit"}
            isDisabled={isDisabledButton}
          />
        </div>
        {!isConnectedWeb3
          ? <div className="p-5">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left ml-8">Smart Contract ERC20</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Network</div>
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
                    {tokensErc20.map((token, i) => 
                      <tr key={i}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 font-medium text-gray-800">
                              <a
                                href={`${BLOCKCHAIN_EXPLORER_URL_MAP[token.token_network]}/address/${token.contract_address}`}
                                className="underline text-blue-800 mr-3"
                                target="_blank"
                                rel="noreferrer"
                                rel="noopener"
                              >
                                ↗️
                              </a>
                              {token.contract_address}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 text-center font-medium text-gray-800">{token.token_network}</div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 text-center font-medium text-gray-800">{token.token_name}</div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 text-center font-medium text-green-800">
                              {`${parseInt(ethers.utils.formatEther(token.total_supply))} ${token.token_symbol}`}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          : ''
        }
    </section>
  )
}

export const getServerSideProps = async context => {
  const NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_HOST_URL

  const res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/erc20`)
  const receipt = await res.json()

  const { status, tokensErc20 } = receipt

  return {
    props: { status, tokensErc20 }
  }
}
