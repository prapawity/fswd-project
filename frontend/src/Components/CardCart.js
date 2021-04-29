import CardCartRow from "../Components/CardCartRow";
import { useSession } from "../contexts/SessionContext";

const CardCart = (props) => {
  const { cart } = useSession()
  const dataOfColumn = cart ?? null;
  let dataShow = [];
  const calculateContent = () => {
    dataShow = [];
    dataOfColumn?.map((prod) => {
      let inData = false;
      inData =
        dataShow?.filter(
          (dataProd) => dataProd?.id === prod?.id && dataProd?.size === prod?.size
        ).length === 0;
      if (inData) {
        dataShow?.push(prod);
      }
    });
  };
  calculateContent();

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-2xl text-gray-700"}>Cart</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props?.head?.map((head) => {
                  return (
                    <th
                      key={head}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100"
                      }
                    >
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {dataShow?.map((prod, index) => (
                <CardCartRow type={props?.type} key={prod?._id ?? index} dataColumn={prod} all={dataOfColumn} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default CardCart;
