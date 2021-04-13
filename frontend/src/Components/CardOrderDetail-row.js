const CardOrderDetailPdt = () => {
  return (
    <tbody>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img
            src={process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"}
            className="h-12 w-12 bg-white rounded-full border"
            alt="..."
          ></img>{" "}
          <span className={"ml-3 font-bold text-gray-600"}>
            Nike Joyride Run Flykni
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          White/University Red/Pure Platinum/Midnight
          <p className="font-semibold">Size 37</p>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          $2,500 USD
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          1
        </td>
      </tr>
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img
            src={process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"}
            className="h-12 w-12 bg-white rounded-full border"
            alt="..."
          ></img>{" "}
          <span className={"ml-3 font-bold text-gray-600"}>
            Nike Joyride Run Flykni
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          White/University Red/Pure Platinum/Midnight
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          $1,800 USD
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          1
        </td>
      </tr>
    </tbody>
  );
};

export default CardOrderDetailPdt;
