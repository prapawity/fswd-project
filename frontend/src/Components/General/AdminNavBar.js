import React, { useState } from "react";
import { MenuIcon, UserIcon } from '@heroicons/react/solid'


const AdminNavBar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <div>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-500 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="#pablo">
                            Longthao
                        </a>
                        
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <MenuIcon className="h-7 w-7 text-white-500" />
                        </button>
                    </div>

                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " block" : " hidden")} >
                        <ul className="flex flex-col lg:flex-row list-none ml-auto">
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Dashboards
                            </a>
                            </li>
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Promotions
                            </a>
                            </li>
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="bg-gray-800 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    <i className="fas fa-arrow-alt-circle-down"></i> Log out</button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    )

}

export default AdminNavBar;