import { useQuery } from "@apollo/client"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import Jumbotron from "../Components/General/Jumbotron"
import Pagination from "../Components/General/Pagination"
import CardProduct from "../Components/Product/CardProduct"
import Tabs from "../Components/Product/Tab"
import { PRODUCTS_QUERY } from "../graphql/productQuery"

const ProductPage = (props) => {
    const history = useHistory()
    const { loading, data, error } = useQuery(PRODUCTS_QUERY, { fetchPolicy: 'network-only' })
    const typeOfTab = ["ALL", "Running", "Casual", "Football", "Basketball", "Sandals"]
    const pathName = props?.match?.params?.type?.replace('/product/', '') ?? "all"
    const [mockData, setMock] = useState()
    const [pageIndex, setPageIndex] = useState(0)
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
            history.push('/product' + (index === 0 ? "s" : ("s/" + typeOfTab[index].toLowerCase())))
        },
        [history],
    )
    const [stateIndex, setIndex] = useState(indexFromPath)
    const dataShow = useMemo(() => {
        return data?.products?.filter((dataIndex) => stateIndex === 0 ? true : typeOfTab[stateIndex].toLowerCase() === dataIndex?.category?.toLowerCase()) ?? []
    }, [stateIndex, data])
    const numberOfPages = Math.floor(dataShow.length / 8) + (dataShow.length % 8 === 0 ? 0 : 1)

    const updatePageIndex = (newIndex) => {
        setPageIndex(newIndex)
    }



    const handleUpdateIndex = (index) => {
        setIndex(index)
        redirectToState(index)
    }

    useEffect(() => {
        if (stateIndex !== indexFromPath) {
            setIndex(indexFromPath)
        }

        if (pageIndex > numberOfPages) {
            setPageIndex(0)
        }

    }, [pathName, stateIndex, pageIndex])

    return (
        <Fragment>
            <Jumbotron img={process.env.PUBLIC_URL + "/img/banner5.png"} />
            <div className="mr-10 ml-10 ">
                <Tabs index={stateIndex} updateIndex={handleUpdateIndex} type={typeOfTab} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10 md:mb-0">
                    {dataShow.filter((_, dataIndex) => (((1 * pageIndex) * 8 <= dataIndex) && (dataIndex <= ((1 * pageIndex) * 8 + 7)))).map((detail, index) => {
                        return <CardProduct detail={detail} key={detail._id} img={detail.thumpnail} />
                    })}
                </div>
                <div className="w-full mt-5">
                    <Pagination updateIndex={updatePageIndex} index={pageIndex} pages={numberOfPages} />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductPage;