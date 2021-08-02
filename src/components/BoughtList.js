import { useState } from 'react';

function BoughtItems(props) {
    let [inp, setInput] = useState('');
    return (
        <div className="max-w-4xl bg-gray-100  mx-auto mt-4 p-4">
            <div className="flex flex-col w-1/4 items-center mx-auto">
                <input type="text" className="ring ring-blue-400 font-semibold text-xl w-80 h-10 rounded" placeholder="Unique ID here"
                    onChange={
                        (e) => setInput(e.target.value)
                    } />
                <div className="h-5"></div>
                <button className="px-2 py-1 text-blue-50 bg-blue-800 ring ring-blue-500"
                    onClick={() => props.viewItems(inp)}
                >View Bought Items</button>
            </div>

            {props.message !== "" ? <div className="bg-green-400 w-full mx-auto mt-5 p-5 rounded">
                {props.message}
            </div> : <></>}

            <div className="mt-12">
                <p className="text-center font-semibold text-lg"> Items you bought are</p>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="z-20 font-semibold border-b-4">Items</th>
                        <th className="z-20 font-semibold border-b-4">Quantity</th>
                        <th className="z-20 font-semibold border-b-4">Price</th>
                        <th className="z-20 font-semibold border-b-4">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data}
                </tbody>
            </table>
        </div>
    )
}

export default BoughtItems
