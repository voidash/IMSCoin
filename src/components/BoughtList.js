function BoughtItems() {
    return (
        <div className="max-w-4xl bg-gray-100  mx-auto mt-4 p-4">
            <div className="flex flex-col w-1/4 items-center mx-auto">
                <input type="text" className="ring ring-blue-400 font-semibold text-xl w-80 h-10 rounded" placeholder="Unique ID here" />
                <div className="h-5"></div>
                <button className="px-2 py-1 text-blue-50 bg-blue-800 ring ring-blue-500">View Bought Items</button>
            </div>
        </div>
    )
}

export default BoughtItems
