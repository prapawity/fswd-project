import { Fragment, useCallback, useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { PRODUCT_QUERY } from '../../graphql/productQuery'
import { UPDATE_PRODUCT } from "../../graphql/productMutation"
import { useHistory } from "react-router"
import { useToasts } from 'react-toast-notifications'

const AdminEditProductDetail = (props) => {
    const history = useHistory()
    const { addToast } = useToasts()
    const id = props?.match?.params?.id?.replace('/admin/products/edit/', '') ?? ""
    const { loading, data, error } = useQuery(PRODUCT_QUERY, { variables: { id } })
    const [updateProduct, { loading: loadingUpdate, data: dataUpdate, error: errorUpdate }] = useMutation(UPDATE_PRODUCT, { refetchQueries: { query: PRODUCT_QUERY } })
    const [productData, setProduct] = useState(null)
    const categoryType = ["RUNNING", "FOOTBALL", "CASUAL", "BASKETBALL", "SANDALS", "OTHER"]
    const [sizeData, setSize] = useState({ size_number: "", stock: "" })
    useEffect(() => {
        if (loading) {
            props?.showLoading(true)
        } else if (!loading || error) {
            props?.showLoading(false)
        }
    }, [loading])

    useEffect(() => {
        if (data && productData === null) {
            Object.keys(data?.productByID ?? {}).map((key) => {
                if (key !== "_id" && key !== "__typename" && key !== "type") {
                    setProduct(prev => ({ ...prev, [key]: data?.productByID[key] ?? "" }))
                }
            })
        }
    }, [data])

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target
            setProduct((prev) => ({ ...prev, [name]: value }))
        },
        [],
    )

    const redirectToProducts = useCallback(
        () => {
            history.push({ pathname: '/admin/products/', state: { shouldReload: true } })
        },
        [history],
    )

    const handleSize = useCallback(
        (e) => {
            const { name, value } = e.target
            setSize((prev) => ({ ...prev, [name]: value }))
        },
        [],
    )

    const handleForm = (e) => {
        e.preventDefault()
        let allSize = productData?.size.map((sz) => ({ size_number: sz.size_number, stock: sz.stock })) ?? []
        let inList = allSize.filter((size) => size.size_number === (sizeData?.size_number ?? "30")).length !== 0
        console.log("CHECK IN LIST", allSize)
        if (inList) {
            let mockSize = []
            allSize.map((size) => {
                if (size.size_number === (sizeData?.size_number ?? "30")) {
                    mockSize.push({ size_number: sizeData?.size_number ?? '30', stock: parseInt(sizeData?.stock ?? 1) })
                } else {
                    mockSize.push({ size_number: size.size_number, stock: size.stock })
                }
            })
            setProduct(prev => ({ ...prev, size: mockSize }))
        } else {
            if (allSize.length === 0) {
                allSize = [{ size_number: sizeData?.size_number ?? '30', stock: parseInt(sizeData?.stock ?? 1) }]
            } else {
                allSize.push({ size_number: sizeData?.size_number ?? '30', stock: parseInt(sizeData?.stock ?? 1) })
            }
            setProduct(prev => ({ ...prev, size: allSize }))
        }
        setSize({})
    }

    const saveProduct = async (e) => {
        e.preventDefault()
        console.log(productData)
        try {
            await updateProduct({
                variables: {
                    id: data?.productByID?._id ?? 0,
                    record: productData
                }
            })
            addToast(`Update Product Success `, { appearance: 'success', autoDismiss: true });
            redirectToProducts()
        } catch (error) {
            console.log(error)
            alert("Update Data Fail")
        }
    }

    useEffect(() => {
        console.log(productData)
    }, [productData])

    return (
        <Fragment>
            {data ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5 md:pt-10 px-2 md:px-10">
                <div className="grid grid-cols-1 gap-2 px-5">
                    <img src={data?.productByID?.thumpnail ?? ""} style={{ height: '60vh', margin: 'auto', marginTop: '0', objectFit: 'cover' }} />
                    <div className="grid grid-cols-4 gap-2 pt-5">
                        {data && data?.productByID?.imageList?.map((img) => <img key={img} src={img} />)}
                    </div>
                </div>
                <div className="p-5 shadow-md">
                    <div className="grid grid-cols-1 gap-3">
                        <form onSubmit={saveProduct}>
                            <div className="grid grid-cols-3 gap-4 pb-5">
                                <h3 className="text-3xl font-semibold">PRODUCT NAME</h3>
                                <div></div>
                                <button style={{ margin: 'auto', width: '100%' }} className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3  rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">
                                    SAVE
                            </button>
                            </div>
                            <input
                                type="text"
                                required={true}
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                name="name" value={productData?.name ?? ""} placeholder="Username" onChange={handleInputChange}
                                style={{ transition: "all .15s ease" }}
                            />
                            <h3 className="text-xl">Description</h3>
                            <input
                                type="text"
                                required={true}
                                className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                name="description" value={productData?.description ?? ""} placeholder="Username" onChange={handleInputChange}
                                style={{ transition: "all .15s ease" }}
                            />
                            <h3 className="text-xl">Price</h3>
                            <input
                                type="number"
                                required={true}
                                min={1}
                                className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                name="price" value={productData?.price ?? ""} placeholder="Username" onChange={handleInputChange}
                                style={{ transition: "all .15s ease" }}
                            />
                            <h3 className="text-xl">Category</h3>
                            <select name="category" value={productData?.category ?? ""} required={true} onChange={handleInputChange} className="border p-2 rounded">
                                {categoryType.map((cat, index) => <option value={cat} key={index}>{cat}</option>)}
                            </select>
                        </form>
                        <h3 className="text-xl">Stock</h3>
                        <table className="table-auto text-left">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Product in Stcok</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData?.size?.map((size) => {
                                    console.log("LOOP SIZE", size)
                                    return (<tr key={size?.size_number ?? 0}>
                                        <td className="pr-5">
                                            <input
                                                type="number"
                                                disabled={true}
                                                value={size?.size_number ?? ""}
                                                className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name={size?.size_number ?? ""}
                                                value={size?.stock ?? ""}
                                                disabled={true}
                                                className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                                style={{ transition: "all .15s ease" }}
                                            />
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>

                        <form onSubmit={handleForm}>
                            <div className="grid grid-cols-3 gap-5">
                                <input
                                    type="number"
                                    required={true}
                                    name="size_number"
                                    max="50"
                                    min="30"
                                    onChange={handleSize}
                                    className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    style={{ transition: "all .15s ease", margin: 'auto' }}
                                    placeholder="Size Number"
                                    value={sizeData?.size_number ?? ""}
                                />
                                <input
                                    type="number"
                                    name="stock"
                                    value={sizeData?.stock ?? ""}
                                    required={true}
                                    onChange={handleSize}
                                    min={1}
                                    placeholder="Stock"
                                    className="border-0 px-3 py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    style={{ transition: "all .15s ease", margin: 'auto' }}
                                />
                                <button style={{ margin: 'auto', width: '100%' }} className="bg-green-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>) : (<Fragment></Fragment>)}
        </Fragment>
    )
}

export default AdminEditProductDetail