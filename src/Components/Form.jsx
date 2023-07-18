
import { formatEther, parseEther } from "ethers";
import { useState, useEffect } from "react";


const Form = ({
    setEthToDeposit,
    ethToDeposit,
    handleDeposit,
    balance,
    walletClient }) => {

    const [transferAmount, setTransferAmount] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        setEthToDeposit(transferAmount.toString());
        if (balance >= ethToDeposit) {
            handleDeposit();
            setTransferAmount(0);
        }
        else {
            console.log("error");
            console.log(balance);
            console.log(ethToDeposit);
        }

    }

    return (
        <>

            <div >
                <h2 className="font-black text-3xl text-center mb-1">
                    Deposit Eth
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="m-2 bg-white shadow-md rounded-lg py-10 px-5 mb-2"
                >
                    <div className="mb-2">
                        <label
                            htmlFor="depositAmount"
                            className="block text-gray-700 font-bold"
                        >
                            Amount:
                        </label>
                        <div className="flex">
                            <input
                                id="depositAmount"
                                className="border-2 p-2  placeholder-gray-400 rounded-md w-3/4"
                                type="number"
                                placeholder="amount to deposit"
                                onChange={(e) => setTransferAmount((e.target.value))}
                                value={transferAmount}
                                max={balance}
                                min="0"
                                step="any"

                            />
                            <button
                                className="bg-teal-500 w-1/4  text-white  font-bold hover:bg-teal-700 cursor-pointer rounded-md ml-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTransferAmount(balance * 0.99999999);
                                }}
                            >Max
                            </button>
                        </div>
                    </div>

                    <input
                        type="submit"
                        className="bg-teal-500 w-full p-3 text-white font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
                        value="Deposit"
                    />
                    <button
                        className="bg-red-500 w-full p-3 text-white  font-bold hover:bg-red-700 cursor-pointer transition-all rounded-md mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            setTransferAmount(0)
                        }}
                    >Cancel
                    </button>
                    <p className="font-bold mt-1 text-center"> Max button will leave some GWEI for gas.</p>
                </form>

            </div>


        </>
    );
};

export default Form;
