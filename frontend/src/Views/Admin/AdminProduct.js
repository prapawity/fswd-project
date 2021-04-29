import CardAdminProduct from '../../Components/General/CardAdminProduct'
import { useQuery } from "@apollo/client"
import { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import { PRODUCTS_QUERY } from '../../graphql/productQuery'
import Tabs from '../../Components/Product/Tab'
import Pagination from '../../Components/General/Pagination'
import CardProductAdmin from '../../Components/Product/CardProductAdmin'
import { useSession } from '../../contexts/SessionContext'

const AdminProduct = (props) => {
    const history = useHistory()
    const { setLoading } = useSession()
    const [reload, setReload] = useState(props?.location?.state?.shouldReload ?? false)
    const { loading, data, error, refetch } = useQuery(PRODUCTS_QUERY)
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
            setLoading(true)
        } else if (!loading || error) {
            setLoading(false)
        }

        if (reload) {
            setReload(false)
            refetch()
        }
    }, [loading, reload])

    useEffect(() => {
        if (stateIndex !== indexFromPath) {
            setIndex(indexFromPath)
        }
    }, [pathName, stateIndex])

    const reloadDetail = () => {
        refetch()
    }
    return (
        <Fragment>
            <div className="w-full">
                <CardAdminProduct />
            </div>
            <div className="mr-10 ml-10 ">
                <Tabs index={stateIndex} updateIndex={handleUpdateIndex} type={typeOfTab} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-10 md:mb-0">
                    {dataShow.filter((_, dataIndex) => (((1 * pageIndex) * 8 <= dataIndex) && (dataIndex <= ((1 * pageIndex) * 8 + 7)))).map((detail, index) => {
                        return <CardProductAdmin reloadData={reloadDetail} detail={detail} key={detail._id} img={detail.thumpnail} />
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