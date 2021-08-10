function Table(props) {
    return (
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
    );
}

export default Table;
