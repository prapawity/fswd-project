import CardAdminPromotionRow from "./CardAdminPromotionRow";

const CardAdminPromotion = (props) => {
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            {props?.type?.map((data) => {
              return (
                <th
                  key={data?._id}
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
          {props?.data?.promotions?.map((promotion, index) => {
            return <CardAdminPromotionRow key={promotion?._id ?? index} data={promotion} />
          })}
          {/* <CardPromotionRow data={query?.data?.promotions}/> */}
        </tbody>
      </table>
    </div>
  );
};
export default CardAdminPromotion;
