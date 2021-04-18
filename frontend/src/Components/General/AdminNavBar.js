import React, { Fragment, useState } from "react";
import { MenuIcon, UserIcon } from "@heroicons/react/solid";
import { useSession } from "../../contexts/SessionContext";
import AlertModal from "./AlertModal";

const AdminNavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { logout: handleLogout } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const handleActionLogout = () => {
    setShowAlert(!showAlert);
    console.log("check here", showAlert);
  };

  const alertProps = {
    title: "Do you want to Logout?",
    description: "",
    confirm: handleLogout,
    cancle: handleActionLogout,
    show: showAlert,
  };

  return (
    <div>
      <AlertModal {...alertProps} />
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <img
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              className="w-36 "
              alt="..."
            ></img>{" "}
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon className="h-7 w-7 text-white-500" />
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " block" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  href="#pablo"
                >
                  Dashboards
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  href="#pablo"
                >
                  Promotions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  href="#pablo"
                >
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  href="#pablo"
                >
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="bg-gray-800 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleActionLogout}
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="mb-0 mx-auto px-4 border-b-1 border-blueGray-200 shadow-xl" /> 
    </div>
  );
};

export default AdminNavBar;
