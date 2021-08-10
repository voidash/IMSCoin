import axios from 'axios';
import { useState } from 'react';
import Table from './Table';

function Portal() {
    const [email, setEmail] = useState('');
    const [tableData, setTableData] = useState([]);
    const baseURL = "https://voidash.pythonanywhere.com"
    const receiptHistoryFetch = async (email) => {
        try {
            let recipts = await axios.get(baseURL + `/product/getReceiptHistory/${email}/`);
            console.log(recipts.data['results']);
            let buffer = recipts.data['results'];
            buffer = buffer.map((data, index) => {

                let l = data['products'].map((d, i) => {
                    return (<tr>
                        <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{d['product_name']}</th>
                        <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{data['quantity'][i]}</th>
                        <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{d['product_max_price']}</th>
                        <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{d['product_max_price'] * data['quantity'][i] / 1}</th>
                    </tr>);
                })

                return (
                    <>
                        <div className="h-5"></div>
                        <h2>Recipt UID: {data['recipt']} </h2>
                        <h2>Recipt redeemed : {data['redeemed'] + ''}  </h2>
                        <Table data={l} />
                        <div className="h-5"></div>
                        <hr className="w-full bg-blue-300 h-1" />
                    </>
                );
            });
            setTableData(buffer);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.staus);
            }
        }

    }
    return (
        <div>
            <div className="max-w-4xl bg-gray-100 mx-auto mt-4 p-4">
                <div className="flex flex-col text-center items-center w-1/3 mx-auto space-y-4 ">
                    <input type="text"
                        onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }
                        className="ring ring-blue-400 font-semibold text-xl w-80 h-10 rounded" placeholder="Your Email Address" value={email} />
                    <button className="px-2 py-1 w-full text-blue-50 bg-blue-800 ring ring-blue-500" onClick={async () => {
                        await receiptHistoryFetch(email);
                    }}> View Recipt History</button>
                    <button className="px-2 py-1 w-full text-blue-50 bg-blue-800 ring ring-blue-500" onClick={() => { }}>Recommended Items </button>
                </div>
                {tableData}
            </div>
        </div>
    )
}

export default Portal