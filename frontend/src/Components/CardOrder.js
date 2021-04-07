
import { PencilIcon } from '@heroicons/react/solid'

const CardOrder = () => {
    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-500"
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg text-gray-700"
                                }
                            >
                                Orders
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Order Number
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Order Date
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Quantity
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Products
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {/* <img
                                        src={(process.env.PUBLIC_URL + '/img/shoes/casual1.jpeg')}
                                        className="h-12 w-12 bg-white rounded-full border"
                                        alt="..."
                                    ></img>{" "} */}
                                    <span
                                        className={
                                            " font-bold text-blueGray-600"
                                        }
                                    >
                                        xxxxxx
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                                    28 Mar 2021 10:38:48
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    2
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    Product1, Product2, Product3
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    <div className="flex items-center ">
                                        <button
                                            className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            <div className="flex flex-wrap justify-center">
                                                <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                                                Manage
                                                </div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    {/* <img
                                        src={(process.env.PUBLIC_URL + '/img/shoes/casual1.jpeg')}
                                        className="h-12 w-12 bg-white rounded-full border"
                                        alt="..."
                                    ></img>{" "} */}
                                    <span
                                        className={
                                            " font-bold text-blueGray-600"
                                        }
                                    >
                                        xxxxxx
                                    </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
                                    28 Mar 2021 10:38:48
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    2
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    Product1, Product2, Product3
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    <div className="flex items-center ">
                                        <button
                                            className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            <div className="flex flex-wrap justify-center">
                                                <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                                                Manage
                                                </div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default CardOrder;