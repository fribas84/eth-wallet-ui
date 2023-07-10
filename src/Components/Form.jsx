
import { useState, useEffect } from "react";


const Form = ({
    isActive,
    setEthToDeposit,
    ethToDeposit,
    handleDeposit,
    balance }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance >= ethToDeposit){
            handleDeposit();
        }
        else {
            console.log("balance: ",balance);
            console.log("eth to deposit: ", ethToDeposit);
            console.log("error");
        }
    }

    return (
        <>
            {isActive &&
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
                            <input
                                id="depositAmount"
                                className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md"
                                type="number"
                                placeholder="amount to deposit"
                                onChange={(e) => setEthToDeposit(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-teal-500 w-full p-3 text-white font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
                            value="Deposit"
                        />
                    </form>
            
                </div>

            }
        </>
    );
};

export default Form;
