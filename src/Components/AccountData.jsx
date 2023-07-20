
const AccountData = ({balance,scBalance}) => {
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-scroll m-10'>
        <div className='text-xl text-center mt-10'>
        <p>Balance in Wallet: <span className="font-black">{parseFloat(balance).toFixed(8)} eth</span></p>
        <p>Balance in Eth Bank: <span className="font-black">{scBalance} eth</span></p>
        </div>
    </div>
  )
}

export default AccountData