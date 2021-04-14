import { useSession } from "../contexts/SessionContext";
import { useEffect } from "react";

const { default: CardOrderRow } = require("./CardOrder-row");

const CardOrder = (props) => {
    const adminHeader = ["Order Number", "Date", "Username", "Name-Surname", "Total", "Quantity", "Address", "Status" ]
    const adminDetail = [["xxxxxx", "28 Mar 2021 10:38:48", "@username", "Pannita Hamego", "2500฿", "2", "1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520", "Paid", ""], ["xxxxxx", "28 Mar 2021 10:38:48", "@username", "Pannita Hamego", "2500฿", "2", "1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520", "Paid", ""]]
    const customerHeader = ["Order Number", "Order Date", "Quantity", "Products"]
    const customerDetail = [["xxxxxx", "28 Mar 2021 10:38:48", "2", "Product1, Product2", ""], ["xxxxxx", "28 Mar 2021 10:38:48", "2", "Product1, Product2", ""]]
    const { userCookies } = useSession()
    useEffect(() => {
        console.log(userCookies, "userCookies")
      });

      const isCustomer = () => {
          return userCookies?.user.type === "Customer" ?? true
      }
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
              {props.type.map((data) => {
                  return(
                    <th
                    key={data}
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    {data}
                  </th>
                  )
              })}
          </tr>
        </thead>
        <tbody>
           {customerDetail.map((colDetail) => {
               return <CardOrderRow column={isCustomer ? customerHeader : adminHeader} dataColumn={colDetail} key={colDetail} />
           })}
        </tbody>
      </table>
    </div>
  );
};
export default CardOrder;
