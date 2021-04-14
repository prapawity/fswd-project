import React, { useState, useMemo, useCallback } from "react";
import { SearchIcon, ShoppingCartIcon, MenuIcon } from '@heroicons/react/solid'
import ProductDropdown from '../ProductDropdown'
import UserDropdown from "../UserDropdown";
import { useHistory } from 'react-router-dom'
import { useSession } from "../../contexts/SessionContext";

const UserNavBar = (props) => {
    const history = useHistory()
    const { cart } = useSession()
    const [navbarOpen, setNavbarOpen] = useState(false);

    console.log(cart, "CHECK Cart")
    const redirectToRegister = useCallback(
        () => {
            history.push('/register')
        },
        [history],
    )

    const redirectToLogin = useCallback(
        () => {
            history.push('/login')
        },
        [history],
    )

    const userBox = useMemo(
        () => {
            if (props.isGuest) {
                return (
                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " block" : " hidden")}>
                        <ul className="flex flex-col lg:flex-row list-none ml-auto">
                            <li className="nav-item">
                                <button
                                    className="bg-white text-black active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={redirectToLogin}
                                >
                                    Log in</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="bg-gray-800 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={redirectToRegister}
                                >
                                    Sign up</button>
                            </li>
                        </ul>
                    </div>
                )
            }
            else {
                return (
                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " block" : " hidden")}>
                        <ul className="flex flex-col lg:flex-row list-none ml-auto">
                            <li className="nav-item" style={{ paddingRight: '15px' }}>
                                <SearchIcon className="h-7 w-7 text-white-500" />
                            </li>
                            <li className="nav-item" style={{ paddingRight: '15px' }}>
                                <UserDropdown />
                            </li>
                            <li className="nav-item" style={{ paddingRight: '5px' }}>
                                <ShoppingCartIcon className="h-7 w-7 text-white-500" />
                            </li>
                            <li className="nav-item">
                                <span style={{ padding: '0px 5px', borderRadius: '5px', color: '#000', background: 'white' }}>{cart.length}</span>
                            </li>
                        </ul>
                    </div>
                )
            }
        },
        [props.isGuest],
    )

    return (
        <div>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-500 mb-0">
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

                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " block" : " hidden")}>
                        <ul className="flex flex-col lg:flex-row list-none ml-auto">
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                    Promotions
                                </a>
                            </li>
                            <li className="nav-item">
                                <ProductDropdown />
                            </li>
                        </ul>
                    </div>
                    {userBox}
                </div>
            </nav>
        </div>
    )

}

export default UserNavBar