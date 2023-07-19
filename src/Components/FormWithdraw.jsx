
import { useState, useEffect } from "react";
import { parseEther, formatEther } from 'ethers';



const FormWithdraw = ({
    addressToWithdraw,
    setAddressToWithdraw,
    ethToWithdraw,
    handleWithdraw,
    setEthToWithdraw,
    scBalance }) => {




    const handleSubmit = (e) => {
        e.preventDefault();
        handleWithdraw();
        setEthToWithdraw(0);
    }

    const handleValueChange = (e) => {
        const value = e.target.value;
        console.log("value", value);
        if (value) {
            setEthToWithdraw(value)
        } else {
            setEthToWithdraw(0);
        }
    }



    return (
        <>

            <div>
                <h2 className="font-black text-3xl text-center m-4">
                    Withdraw Eth
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="m-2 bg-white shadow-md rounded-lg py-10 px-5 mb-2"
                >
                    <div className="mb-2">

                        <label
                            htmlFor="withdrawAmount"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Amount:
                        </label>
                        <div className="flex">
                            <input
                                id="withdrawAmount"
                                className="border-2 p-2  placeholder-gray-400 rounded-md w-3/4"
                                type="number"
                                placeholder="amount to withdraw"
                                onChange={handleValueChange}
                                value={ethToWithdraw}
                                max={scBalance}
                                min="0"
                                step="any"


                            />
                            <button
                                className="bg-teal-500 w-1/4  text-white  font-bold hover:bg-teal-700 cursor-pointer rounded-md ml-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEthToWithdraw(scBalance.toString())
                                }}
                            >Max
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="withdrawAddress"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Destination:
                        </label>
                        <input
                            id="withdrawAddress"
                            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
                            type="text"
                            placeholder="address destination"
                            defaultValue={addressToWithdraw}

                            onChange={(e) => setAddressToWithdraw(e.target.value)}

                        />
                    </div>


                    <input
                        type="submit"
                        className="bg-teal-500 w-full p-3 text-white  font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
                        value="Withdraw"
                    />
                    <button
                        className="bg-red-500 w-full p-3 text-white  font-bold hover:bg-red-700 cursor-pointer transition-all rounded-md mt-3"
                        onClick={(e) => {
                            e.preventDefault();
                            setEthToWithdraw(0)
                        }}
                    >Cancel
                    </button>
                </form>
            </div>


        </>
    );
};

export default FormWithdraw;
