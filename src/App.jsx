import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Nav from "./Components/Nav";
import Form from './Components/Form';
import FormWithdraw from './Components/FormWithdraw'
import EtherWallet from "../contracts/EtherWallet.json";



function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showDisable, setShouldDisable] = useState(false); //should disable connect button while connection 

  const [scBalance, setScBalance] = useState(0);
  const [ethToDeposit, setEthToDeposit] = useState(0);

  const etherWalletAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  useEffect(() => {
    const getEtherWalletBalance = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const contract = new ethers.Contract(
          etherWalletAddress,
          EtherWallet.abi,
          provider
        )
        let balance = await contract.balanceOf();
        balance = ethers.formatEther(balance);
        setScBalance(balance);
        console.log("SC Balance: ", balance);
      } catch (err) {
        console.log("Error while connnecting to contract: ", err);
      }
    }
    getEtherWalletBalance();
  }, []);

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
      <div>
        <Form
          isActive={isActive}
        />
        <FormWithdraw
          isActive={isActive}
        />
      </div>

    </div>
  )
}

export default App
