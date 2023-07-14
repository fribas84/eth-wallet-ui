
const AccountData = ({balance,scBalance}) => {
  console.log("scbalance insice accountdata: ", scBalance)
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-scroll m-10'>
        <div className='text-xl text-center mt-10'>
        <p>Current Account  balance: <span className="font-black">{balance} eth</span></p>
        <p>Current Eth Wallet balance: <span className="font-black">{scBalance} eth</span></p>
        </div>
    </div>
  )
}

export default AccountData