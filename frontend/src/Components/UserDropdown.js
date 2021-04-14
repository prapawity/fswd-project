import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { UserIcon } from '@heroicons/react/solid'
import { useSession } from "../contexts/SessionContext";
import { useDetectClickOutside } from "react-detect-click-outside";
import AlertModal from "./General/AlertModal";

const UserDropdown = () => {
  const { logout: handleLogout } = useSession()
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
  const btnDropdownRef = createRef()
  const popoverDropdownRef = createRef()
  const [showAlert, setShowAlert] = useState(false)
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  };

  const handleActionLogout = () => {
    setShowAlert(!showAlert)
    console.log("check here", showAlert)
}

  const alertProps = {
    title: "Do you want to Logout?",
    description: "",
    confirm: handleLogout,
    cancle: handleActionLogout,
    show: showAlert
}

  const ref = useDetectClickOutside({ onTriggered: closeDropdownPopover })

  return (
    <div ref={ref}>
      <AlertModal {...alertProps}/>
      <a
        className="hover:text-blueGray-500 text-black px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        style={{ paddingTop: '0px' }}
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <UserIcon className="h-7 w-7 text-white-500" />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >

        <Link
          to="/admin/dashboard"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Information
        </Link>
        <Link
          to="/admin/settings"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Orders
        </Link>
        <Link
          to="/"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={handleActionLogout}
        >
          Log out
        </Link>


      </div>
    </div>
  )
}

export default UserDropdown;
