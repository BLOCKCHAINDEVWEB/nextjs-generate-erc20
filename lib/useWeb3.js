import { useContext, useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'

export default function useWeb3() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainIdUsed, setChainIdUsed] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState(0)

  // TODO: check version of Metamask and send a warning if not enough recent.

  // connect to Ethereum wallet
  const connectWallet = useCallback(async () => {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      setProvider(provider)

      const chainIdUsedFromWallet = await ethereum.request({ method: 'eth_chainId' })

      setChainIdUsed(chainIdUsedFromWallet)

      try {
        const accountsConnected = await window.ethereum.request({ method: 'eth_requestAccounts' })

        setSigner(accountsConnected[0])
      } catch (error) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        if (error.code === 4001) console.log('Please connect to MetaMask.')
        else console.error(error)

        return
      }

      const signer = provider.getSigner()

      setSigner(signer)
      setAccounts([await signer.getAddress(), ...accounts])

      const balance = await provider.getBalance(await signer.getAddress())
      setBalance(Number(ethers.utils.formatEther(balance)))

    } else {
      console.log("The Dapp required to install Metamask.")
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      const displayChainChanged = async () => console.log('display chain changed')
      const displayAccChanged = async () => console.log('display acc changed')

      window.ethereum.on('chainChanged', displayChainChanged)
      window.ethereum.on('accountsChanged', displayAccChanged)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', displayAccChanged)
          window.ethereum.removeListener('chainChanged', displayChainChanged)
        }
      }
    }
  }, [])

  return {
    provider,
    signer,
    chainIdUsed,
    accounts,
    balance,
    connectWallet
  }
}
