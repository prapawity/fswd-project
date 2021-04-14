import { PencilIcon } from "@heroicons/react/solid";

const CardOrderRow = (props) => {
  const typeOfColumn = props?.column ?? [];
  const dataOfColumn = props.dataColumn ?? [];
  return (
    <tr>
      {dataOfColumn.map((data, index) => {
        return index === 0 ? (
          <th
            key={index}
            className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
          >
            <span className={" font-bold text-blueGray-600"}>
              {data}
            </span>
          </th>
        ) : index === typeOfColumn.length ? (
          <td
            key={index}
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >
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
        ) : (
          <td
            key={index}
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left "
          >
            {data}
          </td>
        );
      })}
    </tr>
  );
};
export default CardOrderRow;
