import { Fragment, useEffect, useState } from "react";

const Tabs = (props) => {
    const index = props.index ?? 0
    const [openTab, setOpenTab] = useState(index);

    const handleTab = (index) => {
        setOpenTab(index)
        props.updateIndex(index)
    }
    useEffect(() => {
        setOpenTab(index)
    }, [index])
    return (
        <div className="flex flex-wrap mb-5">
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                >
                    {props.type.map((data, index) => {
                        return (
                            <Fragment key={index}>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center mt-5">
                                    <a
                                        className={
                                            "text-xs font-bold uppercase px-5 py-3 shadow-md rounded block leading-normal " +
                                            (openTab === index
                                                ? "text-white bg-gray-600"
                                                : "text-gray-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            handleTab(index);
                                        }}
                                        data-toggle="tab"
                                        href={"#link" + index.toString()}
                                        role="tablist"
                                    >
                                        {data}
                                    </a>
                                </li>
                            </Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Tabs;