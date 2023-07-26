import { ConnectButton } from '@rainbow-me/rainbowkit';

const Nav = ({walletClient}) => {
    return (
        <nav className="flex  bg-teal-500 p-6 shadow-xl mb-5 rounded-md mt-5">
            <div className="flex items-center  text-white mr-4">
                <span className="font-semibold text-4xl tracking-tight shadow-xle">Eth Bank!</span>
            </div>
        

            <div className="ml-auto">


                    <ConnectButton
                        label="Connect your wallet"
                        accountStatus={{
                            smallScreen: 'avatar',
                            largeScreen: 'full',
                        }}
                        chainStatus="icon"
                        showBalance={{
                            smallScreen: false,
                            largeScreen: true,
                          }}

                    />

                

            </div>

        </nav>

    )
}

export default Nav
