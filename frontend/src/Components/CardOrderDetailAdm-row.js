import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const CardOrderDetailAdmRow = (props) => {
  const dataOfColumn = props.dataColumn ?? [];
  const typeOfColumn = props?.column ?? [];
  return (
    <tr>
      {dataOfColumn.map((data, index) => {
        return index === 0 ? (
          <th
            key={index}
            className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left flex items-center`}
          >
            <img
            src={process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"}
            className="h-12 w-12 bg-white rounded-full border"
            alt="..."
          ></img>{" "}
            <span className={"ml-3 font-bold text-blueGray-600"}>{data}</span>
          </th>
        ) : index === typeOfColumn.length ? (
          <td
            key={index}
            className="border-t-0 px-3 align-center border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left flex flex-wrap justify-center"
          >
            <div className="flex items-center ">
              <button
                className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                <div className="flex flex-wrap justify-center">
                  <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                  Edit
                </div>
              </button>
            </div>
            <div className="ml-2 flex items-center ">
              <button
                className="bg-red-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                <div className="flex flex-wrap justify-center">
                  <TrashIcon className="text-white-600 h-4 w-4 mr-1" />
                  Delete
                </div>
              </button>
            </div>
          </td>
        ) : (
          <td
            key={index}
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left "
          >
            {data}
          </td>
        );
      })}
    </tr>
  );
};
export default CardOrderDetailAdmRow;
