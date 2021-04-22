import {
  MailIcon,
  PencilIcon,
  UserIcon,
  PhoneIcon,
  SaveIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import { useState, useCallback, Fragment, useEffect } from "react";
import { UPDATE_CUSTOMER } from "../graphql/customerMutation";
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../graphql/userQuery";

const CardInfo = (props) => {
  const customer = props?.customerById ?? {};
  const username = customer?.username ?? "";
  const name = customer?.name_surname ?? "";
  const [isDisable, setDisable] = useState(true);
  const [email, setEmail] = useState(customer?.email ?? "");
  const [tel, setTel] = useState(customer?.tel ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const img =
    customer?.img === undefined || customer?.img === ""
      ? process.env.PUBLIC_URL + "/img/profile-user.png"
      : customer?.img ?? process.env.PUBLIC_URL + "/img/profile-user.png";

  const { loading, data } = useQuery(USER_QUERY, {
    variables: { id: customer?._id ?? "0" },
  });
  const refetchQuery = {
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id: customer?._id ?? "0" },
      },
    ],
  };
  const [update_customer, response] = useMutation(
    UPDATE_CUSTOMER,
    refetchQuery
  );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTelChange = useCallback((e) => {
    setTel(e.target.value);
  }, []);
  const handleAddressChange = useCallback((e) => {
    setAddress(e.target.value);
  }, []);
  const clickEdit = () => {
    setDisable(!isDisable);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await update_customer({
        variables: {
          id: customer?._id ?? 0,
          email: email ?? "promo",
          tel: tel ?? "Tel",
          address: address ?? "Address",
          img: "",
        },
      });
      alert("Update Success");
      setDisable(true);
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <section
      className="relatives py-16 bg-blueGray-200"
      style={{ paddingTop: "350px" }}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">
            {data ? (
              <form onSubmit={handleEdit}>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={img}
                        className="shadow-xl rounded-full align-middle border-none max-w-150-px"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-right">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={clickEdit}
                        hidden={!isDisable}
                      >
                        <div className="flex flex-wrap justify-center">
                          <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                          Edit
                        </div>
                      </button>
                      <button
                        className="bg-green-600 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        hidden={isDisable}
                      >
                        <div className="flex flex-wrap justify-center">
                          <SaveIcon className="text-white-600 h-4 w-4 mr-1" />
                          Save
                        </div>
                      </button>
                      <button
                        className="bg-red-600 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        hidden={isDisable}
                        onClick={clickEdit}
                      >
                        <div className="flex flex-wrap justify-center">
                          <XCircleIcon className="text-white-600 h-4 w-4 mr-1" />
                          Cancle
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>

                <div className="text-center mt-6">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-4">
                    @{username}
                  </h3>
                  <div className="mb-2 text-lg text-blueGray-600">
                    <div className="flex flex-wrap justify-center">
                      <UserIcon className="text-gray-600 h-7 w-7 mr-2" />
                      <b>Name Surname:</b> <p className="ml-2">{name}</p>
                    </div>
                  </div>
                  <div className="mb-2 text-lg text-blueGray-600">
                    <div className="flex flex-wrap justify-center">
                      <MailIcon className="text-gray-600 h-7 w-7 mr-2" />
                      <b>Email:</b>
                      <input
                        type="email"
                        disabled={isDisable}
                        value={email}
                        name={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="ml-2 px-8 py-1 pl-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  <div className="mb-2 text-lg text-blueGray-600 ">
                    <div className="flex flex-wrap justify-center">
                      <PhoneIcon className="text-gray-600 h-7 w-7 mr-2" />
                      <b>Tel:</b>
                      <input
                        disabled={isDisable}
                        type="tel"
                        value={tel}
                        name={tel}
                        onChange={handleTelChange}
                        placeholder="Phone number"
                        className="ml-2 px-8 py-1 pl-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                        required={true}
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-8 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <h5 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      Address
                    </h5>
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-2 text-lg leading-relaxed text-blueGray-700">
                        <input
                          type="text"
                          disabled={isDisable}
                          value={address}
                          name={address}
                          onChange={handleAddressChange}
                          className="pt-1 px-3 py-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default CardInfo;
