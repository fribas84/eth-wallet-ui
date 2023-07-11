import { useEffect, useState } from "react";
import ABI from "../../contracts/EtherWallet.json";
import { HARDHAT_ADDRESS } from '../Constants/constants';
import { ethers } from 'ethers';


export const useContract = ()=>{
    const [contract, setContract] = useState(null);

    useEffect(()=>{
        (async ()=>{
            try {
                const provider = new ethers.BrowserProvider(window.ethereum, "any");
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                  HARDHAT_ADDRESS,
                  ABI.abi,
                  signer
                )
                setContract(contract);
              }catch(err){
                console.log("Error fetching contract: ", err);
                setContract(null);
              }
        })();
    },[])
    return contract;
}
