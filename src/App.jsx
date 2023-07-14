import { useState, useEffect } from 'react';
import { ethers, parseEther } from 'ethers';
import Nav from "./Components/Nav";
import Form from './Components/Form';
import FormWithdraw from './Components/FormWithdraw'
import AccountData from './Components/AccountData';
import {
  fetchBalance,
  readContract,
  writeContract,
  prepareWriteContract
} from '@wagmi/core'
import { CONTRACT_ADDRESS } from './Constants/constants'
import { getContract } from 'wagmi/actions'
import ABI from '../contracts/EtherWallet.json'
import { useWalletClient, useBalance, useAccount } from 'wagmi'
import { formatEther } from 'viem';


function App() {

  const [ethToDeposit, setEthToDeposit] = useState(0);
  const [scBalance, setScBalance] = useState(0);

  //Initial data
  const { data: walletClient } = useWalletClient({});
  const { address } = useAccount();

  const contract = getContract({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    walletClient
  })

  const { data: balance } = useBalance({
    address: address
  })



  //Read contract balance & update state
  useEffect(() => {
    if (contract) {
      const readBalance = async () => {
        const result = await contract.read.balanceOf();
        setScBalance(formatEther(result));
      }
      readBalance();
    }
  }, [contract])


  //DEPOSIT
  const handleDeposit = async () => {
    const config = await prepareWriteContract({
      address: CONTRACT_ADDRESS,
      abi: ABI.abi,
      functionName: 'deposit',
      value: parseEther(ethToDeposit)
    })
    const { hash } = await writeContract(config);
  }

  return (
    <div className='container mx-auto'>
      <Nav
        walletClient={walletClient}

      />
      {walletClient &&
        <div className='mt-12 flex'>
          <div className='md:w-1/2 lg:w-2/5'>
            <Form
              setEthToDeposit={setEthToDeposit}
              ethToDeposit={ethToDeposit}
              handleDeposit={handleDeposit}
              balance={balance.formatted}
              walletClient={walletClient}
            />
            <FormWithdraw

            />
          </div>

          <AccountData
            balance={balance.formatted}
            scBalance={scBalance}
          />
        </div>}
      {!walletClient &&
        <h1>Please connect with MetaMask</h1>

      }

    </div>
  )
}

export default App
