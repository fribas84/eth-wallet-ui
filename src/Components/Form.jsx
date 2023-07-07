
import { useState, useEffect } from "react";


const Form = ({isActive}) => {



  

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    
    return (
        <>
            {isActive && 
                <div className="md:w-1/2 lg:w-2/5">
                <h2 className="font-black text-3xl text-center mb-5">
                    Deposit Eth
                </h2>
    
                
                <form
                
                    onSubmit={handleSubmit}
                    className="m-3 bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                    >
        
                    <di v className="mb-5">
                           <input
                            id="depositAmount"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            type="number"
                            placeholder="amount to deposit"
                   
                        />
                    </di>
                    
                    <input
                        type="submit"
                        className="bg-teal-500 w-full p-3 text-white uppercase font-bold hover:bg-teal-700 cursor-pointer transition-all rounded-md"
               
                    />
                </form>
            </div>
            
            } 
        </>
    );
};

export default Form;
