import logo from '../images/ims.jpg'
function Navbar(props) {
    return (
        <div className="bg-gray-100 p-2" >
            <img src={logo} alt="logo" className="mx-auto" />
            <p className="uppercase font-black text-2xl text-center ">
                IMS Customer Portal
            </p>
            <div className="flex justify-center mt-2 flex-col md:flex-row">
                <button onClick={() => props.tab('Home')} className="px-2 py-1 bg-gray-400 ring ring-gray-500">Home</button>
                <button onClick={() => props.tab('Redeem')} className="px-2 py-1 bg-gray-400 ring ring-gray-500">Redeem Coins</button>
                <button onClick={() => props.tab('About')} className="px-2 py-1 bg-gray-400 ring ring-gray-500">About Us</button>
            </div>
        </div >
    )
}

export default Navbar
