const CardOrderDetailPdt = (props) => {
  
  const dataOfColumn = props.dataColumn ?? [];
  return (
    <tr>
      {dataOfColumn.map((data, index) => {
        return index === 0 ? (
          <th
            key={index}
            className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
          >
            <img
            src={process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"}
            className="h-12 w-12 bg-white rounded-full border"
            alt="..."
          ></img>{" "}
            <span className={"ml-3 font-bold text-blueGray-600"}>
              {data}
            </span>
          </th>
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

export default CardOrderDetailPdt;
