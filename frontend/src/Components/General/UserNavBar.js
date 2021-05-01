import React, { useState, useMemo, useCallback } from "react";
import { SearchIcon, ShoppingCartIcon, MenuIcon } from "@heroicons/react/solid";
import ProductDropdown from "../ProductDropdown";
import UserDropdown from "../UserDropdown";
import { useHistory, Link } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

const UserNavBar = (props) => {
  const history = useHistory();
  const { cart } = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);

  console.log(cart, "CHECK Cart");
  const redirectToRegister = useCallback(() => {
    history.push("/register");
  }, [history]);

  const redirectToLogin = useCallback(() => {
    history.push("/login");
  }, [history]);


  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg  mb-0">
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
            <ul className="flex flex-col lg:flex-row list-none ml-auto mr-10 items-center">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                  to="/promotions"
                >
                  Promotions
                </Link>
              </li>
              <li className="nav-item">
                <ProductDropdown />
              </li>
            </ul>
          </div>
          {props.isGuest ? (
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " block" : " hidden")
              }
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <button
                    className="bg-white text-black active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    onClick={redirectToLogin}
                  >
                    Sign in
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="bg-gray-800 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    onClick={redirectToRegister}
                  >
                    Sign up
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " block" : " hidden")
              }
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item" style={{ marginRight: "15px" }}>
                  <UserDropdown />
                </li>
                <li className="nav-item" style={{ marginRight: "15px" }}>
                  <div className="w-full">
                    <span className="relative inline-block">
                    <Link to="/customer/cart">
                      <ShoppingCartIcon className="h-7 w-7 text-white-500"  /></Link>
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {cart?.length ?? 0}
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <hr className="mb-0 mx-auto px-4 border-b-1 border-blueGray-200 shadow-xl" /> 
    </div>
  );
};

export default UserNavBar;
