import { Fragment } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

// ref: https://tailwindcomponents.com/component/button-component
const ButtonAdminProduct = (props) => {
  const type = props.type;
  const title = props.title;
  const color = props.color;
  const onClick = props.onClick;

  const checkType = () => {
    if (type === "primary") {
      return (
        <Fragment>
          <div className="inline-block w-full">
            <button
              type="button"
              onClick={onClick}
              className={
                "w-full focus:outline-none font-semibold text-white text-sm py-3 px-5 rounded-md bg-" +
                color +
                "-500 hover:bg-" +
                color +
                "-600 hover:shadow-lg"
              }
            >
              <div className="flex flex-wrap justify-center">
                <PlusCircleIcon className="text-white-600 h-5 w-5 mr-2" />
                {title}
              </div>
            </button>
          </div>
        </Fragment>
      );
    } else if (type === "default") {
      return (
        <Fragment>
          <div className="block">
            <button
              type="button"
              onClick={onClick}
              className={
                "w-full focus:outline-none text-" +
                color +
                "-600 text-sm py-2.5 px-5 rounded-md border border-" +
                color +
                "-600 hover:bg-" +
                color +
                "-50"
              }
            >
              {title}
            </button>
          </div>
        </Fragment>
      );
    }
  };

  return <>{checkType()}</>;
};
export default ButtonAdminProduct;
