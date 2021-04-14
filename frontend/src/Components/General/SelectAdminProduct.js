
const SelectAdminProduct = () => {
    return (
        <div className="py-1 px-8 rounded-xl">
            <div className="my-1 text-sm">
                <label for="username" className="block text-black">Category</label>
                <select className="border p-2 rounded">
                    <option>Running</option>
                    <option>Training</option>
                    <option>Casual</option>
                </select>
            </div>
        </div>
    )
}

export default SelectAdminProduct