import { Fragment, useCallback, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../../graphql/productQuery"
import { useHistory } from "react-router"
import { DELETE_PRODUCT } from "../../graphql/productMutation";
import { useToasts } from 'react-toast-notifications'

import './AdminEditProduct.css'

const AdminDeleteProduct = (props) => {
    const history = useHistory()
    const { loading, data, error } = useQuery(PRODUCTS_QUERY)
    const [deleteProduct, { loading: loadingDelete, data: dataDelete, error: errorDelete }] = useMutation(DELETE_PRODUCT)
    const { addToast } = useToasts()
    const removeProduct = async (id) => {
        try {
            await deleteProduct({ variables: { id } })
            addToast(`DELETE Success `, { appearance: 'success', autoDismiss: true })
            redirectToAdminProduct()
        } catch (error) {
            console.log(error)
            alert("DELETE FAIL")
        }
    }
    const redirectToAdminProduct = useCallback(
        () => {
          history.push('/admin/products')
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
            <div className="p-10" style={{ width: '80%', margin: 'auto' }}>
                <div className="dropdown inline-block relative w-full">
                    <button className="w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span className="w-full mr-1">Select Product</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                        {data?.products?.map((product) => (<li key={product._id}><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap text-center" onClick={() => removeProduct(product._id)}>{product?.name ?? "NAME"}</a></li>))}
                    </ul>
                </div>

            </div>
        </Fragment>
    )
}

export default AdminDeleteProduct