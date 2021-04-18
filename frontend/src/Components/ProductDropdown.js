import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useDetectClickOutside } from 'react-detect-click-outside'
const ProductDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef()
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  const ref = useDetectClickOutside({ onTriggered: closeDropdownPopover })
  return (
    <div ref={ref}>
      <a
        className="hover:text-blueGray-500 text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Products <ChevronDownIcon className="h-4 w-4 text-white-500" />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to="/products"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          All
        </Link>
        <Link
          to="/products/running"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Running
        </Link>
        <Link
          to="/products/casual"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Casual
        </Link>
        <Link
          to="/products/football"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Football
        </Link>
        <Link
          to="/products/basketball"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Basketball
        </Link>
        <Link
          to="/products/sandals"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Sandals
        </Link>
        
      </div>
    </div>
  );
};

export default ProductDropdown;
