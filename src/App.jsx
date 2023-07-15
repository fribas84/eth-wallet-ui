import { useState, useEffect } from 'react';
import { formatEther, parseEther } from 'ethers';
import Nav from "./Components/Nav";
import Form from './Components/Form';
import FormWithdraw from './Components/FormWithdraw'
import AccountData from './Components/AccountData';
import { CONTRACT_ADDRESS } from './Constants/constants'
import { getContract } from 'wagmi/actions'
import ABI from '../contracts/EtherWallet.json'
import {
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useAccount
} from 'wagmi'



function App() {

  const [ethToDeposit, setEthToDeposit] = useState("0");
  //const [scBalance, setScBalance] = useState(0);


  //Initial data
  const { data: walletClient } = useWalletClient({});
  const { address } = useAccount();


  //read Balances
  const { data: scBalance } = useBalance({
    address: CONTRACT_ADDRESS,
    watch: true
  })

  const { data: balance } = useBalance({
    address: address,
    watch: true
  })
  

  //DEPOSIT
  const { config: configDeposit } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    functionName: 'deposit',
    value: parseEther(ethToDeposit),
    onSuccess(data) {
      console.log('Success', data)
    }
  })
  const { write: deposit } = useContractWrite(configDeposit);



  const handleDeposit = async () => {
    deposit?.();
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
            scBalance={scBalance.formatted}
          />
        </div>}
      {!walletClient &&
        <h1>Please connect with MetaMask</h1>

      }

    </div>
  )
}

export default App
