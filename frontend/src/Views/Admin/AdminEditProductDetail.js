import { Fragment, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { PRODUCT_QUERY } from '../../graphql/productQuery'
const AdminEditProductDetail = (props) => {
    const id = props?.match?.params?.id?.replace('/admin/products/edit/', '') ?? ""
    const { loading, data, error } = useQuery(PRODUCT_QUERY, { variables: { id } })
    useEffect(() => {
        if (loading) {
            props?.showLoading(true)
        } else if (!loading || error) {
            props?.showLoading(false)
        }
    }, [loading])

    if (data) {
        console.log(data)
    }
    return (
        <Fragment>

        </Fragment>
    )
}

export default AdminEditProductDetail