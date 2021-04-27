import { Fragment, useEffect, useState } from "react"

const Pagination = (props) => {
    const [stateIndex, setIndex] = useState(props?.index ?? 0)
    const numberOfPage = props?.pages ?? 5
    var pages = []
    const content = () => {
        pages = []
        for (var i = 0; i < numberOfPage; i++) {
            pages.push("")
        }
    }

    const updateIndex = (newIndex) => {
        setIndex(newIndex)
        props?.updateIndex(newIndex)
    }
    content()
    return (
        <Fragment>
            <div className="py-2" style={{ width: 'fit-content', margin: 'auto' }}>
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {pages.map((_, index) => {
                            return <li key={index}>
                                <button onClick={() => {
                                    updateIndex(index)
                                }} href="#pablo" className={`focus:outline-none first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500  ${stateIndex === index ? "text-white bg-gray-500" : "text-gray-500"}`}>
                                    {index + 1}
                                </button>
                                </li>
                        })}
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default Pagination