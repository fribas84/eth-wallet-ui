const Nav = ({
    account,
    balance,
    isActive,
    showDisable,
    connectToMetamask,
    disconnetToMetamask
}) => {
    return (
        <nav className="flex  bg-teal-500 p-6 shadow-xl mb-5 rounded-md mt-5">
            <div className="flex items-center  text-white mr-4">
                <span className="font-semibold text-4xl tracking-tight shadow-xle">Eth Wallet</span>
            </div>
            {account &&
                <div
                    className="w-full block flex-grow lg:flex lg:items-center lg:w-auto flex-col justify-center border-white border rounded-md p-2 text-white mr-6 hover:border-transparent hover:text-teal-500 hover:bg-white">
                    <p><span className="text-sm mr-2 font-semibold">Connected Account:</span> <span className="uppercase">{account}</span></p>
                    <p><span className="text-sm mr-2 font-semibold">Balance:</span> <span>{balance} eth</span></p>
                </div>}

            <div className="m-auto">

                {!isActive &&
                    <button className="w-full flex text-l px-4 py-6 leading-none border rounded-md text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                        disabled={showDisable}
                        onClick={connectToMetamask}
                    >
                        <img className="w-8 h-8 mr-1" src="../../public/images/metamask.svg" />
                        <span className="py-2">Connect to MetaMask</span>
                    </button>

                }
                {isActive &&
                    <button className="w-30 flex text-l px-4 py-6 leading-none border rounded-md text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={disconnetToMetamask}
                    >
                        <span className="py-2">Disconnect</span>
                    </button>
                }

            </div>

        </nav>

    )
}

export default Nav
