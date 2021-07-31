import logo from '../images/ims.jpg'
function Navbar() {
    return (
        <div className="bg-gray-100 p-2" >
            <img src={logo} alt="logo" className="mx-auto" />
            <p className="uppercase font-black text-2xl text-center ">
                IMS Customer Portal
            </p>
            <div className="flex justify-center mt-2 flex-col md:flex-row">
                <button className="px-2 py-1 bg-gray-400 ring ring-gray-500">Home</button>
                <button className="px-2 py-1 bg-gray-400 ring ring-gray-500">Redeem Coins</button>
                <button className="px-2 py-1 bg-gray-400 ring ring-gray-500">About Us</button>
            </div>
        </div >
    )
}

export default Navbar
