import { useState, useEffect} from 'react';
import { ethers } from 'ethers';
import Nav from "./Components/Nav";
import Form from './Components/Form';
import FormWithdraw from './Components/FormWithdraw'
import AccountData from './Components/AccountData';
import { useContract } from './Hooks/useContract';


function App() {
  const USEContract = useContract();
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showDisable, setShouldDisable] = useState(false); //should disable connect button while connection 
  const [ethToDeposit, setEthToDeposit] = useState(0);

  const [scBalance, setScBalance] = useState(0);
  

  useEffect(() => {
    const getEtherWalletBalance = async () => {
        let balance = await USEContract.balanceOf();
        balance = ethers.formatEther(balance);
        setScBalance(balance);
    }
    getEtherWalletBalance();
  },[USEContract]);

  //conecto to metamask wallet
  const connectToMetamask = async () => {
    console.log("connecting to metamask...");
    setShouldDisable(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const signer = await provider.getSigner();
      await provider.send('eth_requestAccounts', []);
      const account = await signer.getAddress();
      let balance = await provider.getBalance(account);
      balance = ethers.formatEther(balance);

      setAccount(account);
      setBalance(balance);
      setIsActive(true);
      setShouldDisable(false);
    }
    catch (error) {
      console.log(error);
    }
  }
  const disconnetToMetamask = async () => {
    console.log("disconnecting to metamask...");
    setAccount('');
    setBalance('');
    setIsActive(false);
  }




  const handleDeposit = async () => {
    try {
      
      const transaction = await USEContract.deposit({
        value: ethers.parseEther(ethToDeposit)}
        );
      console.log("Trasaction", transaction);
    }catch(err){
      console.log("Error ocurred while doing transfer: ",err);
    }
  }

  return (
    <div className='container mx-auto'>
      <Nav
        account={account}
        balance={balance}
        isActive={isActive}
        showDisable={showDisable}
        connectToMetamask={connectToMetamask}
        disconnetToMetamask={disconnetToMetamask}
      />
      {isActive &&
        <div className='mt-12 flex'>
          <div className='md:w-1/2 lg:w-2/5'>
          <Form
            isActive={isActive}
            setEthToDeposit = {setEthToDeposit}
            ethToDeposit = {ethToDeposit}
            handleDeposit = {handleDeposit}
            balance = {balance}
          />
          <FormWithdraw
            isActive={isActive}
          />
          </div>

          <AccountData 
          balance= {balance}
          scBalance = {scBalance}
          />
        </div>}
      {!isActive &&
        <h1>Please connect with MetaMask</h1>

      }

    </div>
  )
}

export default App
