import { useState } from 'react';

function Redeem(props) {

    const [uid, setUid] = useState('');
    return (
        <div className="max-w-4xl bg-gray-100  mx-auto mt-4 p-4">
            <div className="flex flex-col w-1/4 items-center mx-auto">
                <input type="text" value={uid} className="ring ring-blue-400 font-semibold text-xl w-80 h-10 rounded" placeholder="Unique ID here" onChange={(data) => {
                    setUid(data.target.value);
                }} />
                <div className="h-5"></div>
                <button className="px-2 py-1 text-blue-50 bg-blue-800 ring ring-blue-500" onClick={() => props.transfer()}>Redeem Coins</button>

            </div>
        </div>
    )
}

export default Redeem
