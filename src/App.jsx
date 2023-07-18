import { useState } from 'react';
import { parseEther } from 'ethers';
import Nav from "./Components/Nav";
import Form from './Components/Form';
import FormWithdraw from './Components/FormWithdraw'
import AccountData from './Components/AccountData';
import { CONTRACT_ADDRESS } from './Constants/constants'
import ABI from '../contracts/EtherWallet.json'
import {
  useWalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
  useAccount
} from 'wagmi'



function App() {
  //Initial data
  const { data: walletClient } = useWalletClient({});
  const { address } = useAccount();
  const [ethToDeposit, setEthToDeposit] = useState("0");
  const [ethToWithdraw, setEthToWithdraw] = useState(0);
  const [addressToWithdraw,setAddressToWithdraw] = useState(address);

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

   //withdraw
   const { config: configWithdraw} = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    functionName: 'withdraw',
    args: [addressToWithdraw,parseEther(ethToWithdraw.toString())],
    onSuccess(data) {
      console.log('Success', data)
    }
  })
  const { write: withdraw } = useContractWrite(configWithdraw);

  const handleWithdraw = async () => {
    withdraw?.();
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
              
            />
            <FormWithdraw
              addressToWithdraw = {addressToWithdraw}
              setAddressToWithdraw = {setAddressToWithdraw}
              ethToWithdraw = {ethToWithdraw}
              handleWithdraw = {handleWithdraw}
              setEthToWithdraw = {setEthToWithdraw}
              scBalance = {scBalance.formatted}

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
