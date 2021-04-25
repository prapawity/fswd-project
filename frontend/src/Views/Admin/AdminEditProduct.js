import { Fragment, useCallback, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { PRODUCTS_QUERY } from "../../graphql/productQuery"
import { useHistory } from "react-router"
import './AdminEditProduct.css'
const AdminEditProduct = (props) => {
    const history = useHistory()
    const { loading, data, error } = useQuery(PRODUCTS_QUERY)


    const redirectToState = useCallback(
        (id) => {
            history.push(`/admin/products/edit/${id}`)
        },
        [history],
    )

    useEffect(() => {
        if (loading) {
            props?.showLoading(true)
        } else if (!loading || error) {
            props?.showLoading(false)
        }
    }, [loading])

    return (
        <Fragment>
            <div className="p-10" style={{width: '40%', margin: 'auto'}}>

                <div className="dropdown inline-block relative w-full">
                    <button className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span className="w-full mr-1">Select Product</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                        {data?.products?.map((product) => (<li key={product._id}><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-center" onClick={() => redirectToState(product._id)}>{product?.name ?? "NAME"}</a></li>))}
                    </ul>
                </div>

            </div>
        </Fragment>
    )
}

export default AdminEditProduct