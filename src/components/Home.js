function Home() {
    return (
        <div className=" max-w-4xl bg-gray-100  mx-auto mt-4 p-4">
            <p className="m-2 text-justify font-serif mb-10 font-medium text-lg">
                IMS Token is ERC-20 Token deployed on Ethereum Main Net network. You can use this Token to buy other products from store or convert to
                Other tokens like Ethereum or Bitcoin.
            </p>
            <div className="flex flex-col text-center w-1/3 mx-auto space-y-4">
                <button className="px-2 py-1 text-blue-50 bg-blue-800 ring ring-blue-500">Redeem Coins</button>
                <button href="a.com" className="px-2 py-1 text-blue-50 bg-blue-800 ring ring-blue-500">View Bought Items</button>
            </div>
        </div>
    );
}

export default Home

