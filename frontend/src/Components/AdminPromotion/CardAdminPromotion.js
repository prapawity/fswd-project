import CardAdminPromotionRow from "./CardAdminPromotionRow";

const CardAdminPromotion = (props) => {
    const test = ["test","100",20,5]
    // console.log(props.data)
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
                      "px-6 align-middle border border-solid py-3 text-normal uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    {data}
                  </th>
                  )
              })}
          </tr>
        </thead>
        <tbody>
            {props?.data?.promotions?.map((promotion) => {
                return <CardAdminPromotionRow data={promotion}/>
      })}
            {/* <CardPromotionRow data={query?.data?.promotions}/> */}
        </tbody>
      </table>
    </div>
  );
};
export default CardAdminPromotion;
