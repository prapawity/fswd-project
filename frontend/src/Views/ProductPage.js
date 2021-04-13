import { useQuery } from "@apollo/client"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import Jumbotron from "../Components/General/Jumbotron"
import CardProduct from "../Components/Product/CardProduct"
import Tabs from "../Components/Product/Tab"
import { PRODUCT_QUERTY } from "../graphql/productQuery"

const ProductPage = (props) => {
    const history = useHistory()
    const { loading, data } = useQuery(PRODUCT_QUERTY)
    const typeOfTab = ["ALL", "Running", "Casual", "Football", "Basketball", "Sandals"]
    const pathName = props?.match?.params?.type?.replace('/product/', '') ?? "all"
    const handleIndex = useMemo(() => {
        let currentIndex = 0
        if (pathName !== undefined) {
            typeOfTab.map((type, index) => {
                if (type.toLowerCase() == pathName) {
                    currentIndex = index
                }
            })
        }
        return currentIndex
    }, [pathName])
    const indexFromPath = handleIndex
    const redirectToState = useCallback(
        (index) => {
            history.push('/product' + (index === 0 ? "" : ("/" + typeOfTab[index].toLowerCase())))
        },
        [history],
    )

    const [stateIndex, setIndex] = useState(indexFromPath)
    const dataShow = useMemo(() => {
        return data?.products?.filter((dataIndex) => stateIndex === 0 ? true : typeOfTab[stateIndex].toLowerCase() === dataIndex.category.toLowerCase()) ?? []
    }, [stateIndex, data])

    const handleUpdateIndex = (index) => {
        setIndex(index)
        redirectToState(index)
    }

    useEffect(() => {
        setIndex(indexFromPath)
    }, [pathName, stateIndex])
    return (
        <Fragment>
            <Jumbotron img={(process.env.PUBLIC_URL + '/img/Banner2.jpeg')} />
            <div className="mr-10 ml-10 ">
                <Tabs index={stateIndex} updateIndex={handleUpdateIndex} type={typeOfTab} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10 md:mb-0">
                    {dataShow.map((detail, index) => {
                        return <CardProduct detail={detail} key={index} img="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6081451-e5e6-44a2-a4f4-21558717782f/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-classic-cortez-GdrCtp.png" />
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductPage;