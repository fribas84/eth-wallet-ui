
import { useState, useEffect } from "react";




const FormWithdraw = ({ addressToWithdraw, setAddressToWithdraw, ethToWithdraw, handleWithdraw,walletClient }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            {walletClient &&
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
                                className="block text-gray-700 font-bold"
                            >
                                Amount:
                            </label>
                            <input
                                id="withdrawAmount"
                                className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md"
                                type="number"
                                placeholder="amount to withdraw"

                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="withdrawAddress"
                                className="block text-gray-700 font-bold"
                            >
                                Destination:
                            </label>
                            <input
                                id="withdrawAddress"
                                className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md"
                                type="text"
                                placeholder="address destination"
                                defaultValue={addressToWithdraw}

                            />
                        </div>

                        <button
                        className="bg-teal-500 w-full p-3 text-white  font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md mb-2">Max</button>
                        <input
                            type="submit"
                            className="bg-teal-500 w-full p-3 text-white  font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
                            value="Withdraw"
                        />
                    </form>
                </div>

            }
        </>
    );
};

export default FormWithdraw;
