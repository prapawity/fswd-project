import CardAdminProduct from '../../Components/General/CardAdminProduct'
import ButtonAdminProduct from '../../Components/General/ButtonAdminProduct'
import { useQuery } from "@apollo/client"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import { PRODUCTS_QUERTY } from '../../graphql/productQuery'
import Tabs from '../../Components/Product/Tab'
import CardProduct from '../../Components/Product/CardProduct'
import Pagination from '../../Components/General/Pagination'

const AdminProduct = (props) => {
    const history = useHistory()
    const { loading, data, error } = useQuery(PRODUCTS_QUERTY)
    const typeOfTab = ["ALL", "Running", "Casual", "Football", "Basketball", "Sandals"]
    const pathName = props?.match?.params?.type?.replace('/product/', '') ?? "all"
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
            history.push('/admin/product' + (index === 0 ? "s" : ("s/" + typeOfTab[index].toLowerCase())))
        },
        [history],
    )

    const updatePageIndex = (newIndex) => {
        setPageIndex(newIndex)
    }

    const [stateIndex, setIndex] = useState(indexFromPath)
    const dataShow = useMemo(() => {
        return data?.products?.filter((dataIndex) => stateIndex === 0 ? true : typeOfTab[stateIndex].toLowerCase() === dataIndex.category.toLowerCase()) ?? []
    }, [stateIndex, data])

    const handleUpdateIndex = (index) => {
        setIndex(index)
        redirectToState(index)
    }

    useEffect(() => {
        if (loading) {
            props?.showLoading(true)
        } else if (!loading || error) {
            props?.showLoading(false)
        }
    }, [loading])

    useEffect(() => {
        if (stateIndex !== indexFromPath) {
            setIndex(indexFromPath)
        }

    }, [pathName, stateIndex])
    return (
        <Fragment>
            <CardAdminProduct title='Product' description='Add, Edit and Remove product' />
            <div className="mr-10 ml-10 ">
                <Tabs index={stateIndex} updateIndex={handleUpdateIndex} type={typeOfTab} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10 md:mb-0">
                    {dataShow.filter((_, dataIndex) => (((1 * pageIndex) * 8 <= dataIndex) && (dataIndex <= ((1 * pageIndex) * 8 + 7)))).map((detail, index) => {
                        return <CardProduct detail={detail} key={index} img={detail.thumpnail} />
                    })}
                </div>
                <div className="w-full mt-5">
                    <Pagination updateIndex={updatePageIndex} index={pageIndex} pages={Math.floor(dataShow.length / 8) + (dataShow.length % 8 === 0 ? 0 : 1)} />
                </div>
            </div>
        </Fragment>
    )
}

export default AdminProduct