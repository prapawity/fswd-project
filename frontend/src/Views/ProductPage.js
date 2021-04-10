import { Fragment, useEffect, useMemo, useState } from "react"
import Jumbotron from "../Components/General/Jumbotron"
import CardProduct from "../Components/Product/CardProduct"
import Tabs from "../Components/Product/Tab"

const ProductPage = (props) => {
    const [stateIndex, setIndex] = useState(0)
    const typeOfTab = ["Running", "Casual", "Football", "Baseketball", "Sandals"]
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const dataShow = useMemo(() => {
        return data.filter((_, index) => (index % stateIndex) === 0)
    }, [stateIndex, data])

    const handleUpdateIndex = (index) => {
        console.log(index)
        setIndex(index)
    }

    useEffect(() => {
        console.log("use effect", dataShow.length, stateIndex, data.length)
    }, [])
    return (
        <Fragment>
            <Jumbotron img={(process.env.PUBLIC_URL + '/img/Banner2.jpeg')} />
            <div className="mr-10 ml-10 pb-20">
                <Tabs index={stateIndex} updateIndex={handleUpdateIndex} type={typeOfTab} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10 md:mb-0">
                    {dataShow.map((index) => {
                        return <CardProduct key={index} img="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6081451-e5e6-44a2-a4f4-21558717782f/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-classic-cortez-GdrCtp.png" />
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductPage;