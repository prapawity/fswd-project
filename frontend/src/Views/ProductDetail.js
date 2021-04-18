import { Fragment, useCallback, useEffect, useState } from "react"
import Accordion from "../Components/General/Accordion"
import { useHistory } from 'react-router-dom'
import { PRODUCT_QUERTY } from "../graphql/productQuery"
import { useQuery } from "@apollo/client"
import { useSession } from "../contexts/SessionContext"
import AlertModal from "../Components/General/AlertModal"
const typeStyle = {
    fontSize: '22px'
}

const titleStyle = {
    fontSize: '38px'
}

const priceStyle = {
    fontSize: '18px',
    textAlign: 'end',
    color: "#757575"
}

const imageStyle = {
    width: '100%'
}
const ProductDetail = (props) => {
    const { addProductToCart, userCookies } = useSession()
    const history = useHistory()
    const id = props?.match?.params?.id?.replace('/product/detail', '') ?? ""
    const { loading, data, error } = useQuery(PRODUCT_QUERTY, { variables: { id } })
    const [imageIndex, setImage] = useState(0)
    const [size, setSize] = useState(0)
    const [showAlert, setShowAlert] = useState(false)

    const handleIndexImage = (index) => {
        setImage(index)
    }

    const handleSize = (index) => {
        setSize(data?.productByID?.size[index].size_number)
    }

    const redirectToProductAll = useCallback(
        () => {
            history.push('/products')
        },
        [history],
    )

    const redirectToLogin= useCallback(
        () => {
            history.push('/login')
        },
        [history],
    )

    useEffect(() => {
        if (id === "") {
            redirectToProductAll()
        }
    }, [data])

    if (error) {
        redirectToProductAll()
    }

    const handleAddToCart = () => {
        if (userCookies === undefined) {
            redirectToLogin()
        } else if (data?.productByID) {
            const result = {
                id: data.productByID._id,
                size: size,
                type: data.productByID.type
            }
            addProductToCart(result)
            closeAlert()
        }
    }

    const closeAlert = () => {
        setShowAlert(false)
    }

    const shouldShowAlert = () => {
        if (size === 0) {
            alert("Please Select Size")
        } else {
            if (data?.productByID) {
                setShowAlert(true)
            }
        }
        
    }

    const alertProps = {
        title: `Do you want to Buy ${data?.productByID?.name ?? ""} ?`,
        description: "",
        confirm: handleAddToCart,
        cancle: closeAlert,
        show: showAlert
    }

    if (loading) {
        props?.showLoading(true)
    } else if (!loading || error) {
        props?.showLoading(false)
    }

    return (
        <Fragment>
            <AlertModal {...alertProps} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <img className="mb-5" src={data?.productByID?.imageList[imageIndex] ?? ""} style={imageStyle} />
                </div>
                <div className="pr-0 md:pr-10 mt-0 md:mt-5 pl-10 pr-10 md:pl-0 md:pr-0">
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <div>
                            <p style={typeStyle}>{data?.productByID?.category ?? ""}</p>
                        </div>
                        <div>
                            <p style={priceStyle}>{(parseInt(data?.productByID?.price)).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            }) ?? ""}</p>
                        </div>
                    </div>
                    <p style={titleStyle}>{data?.productByID?.name ?? ""}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                        {data && data.productByID?.imageList?.map((img, index) => {
                            const buttonStyle = {
                                width: "125px",
                                height: "125px",
                                position: 'relative',
                                margin: 'auto',
                                border: index === imageIndex ? "2px solid black" : "none",
                                borderRadius: '5px',
                                overflow: 'hidden'
                            }

                            return <button className="focus:outline-none" onClick={() => handleIndexImage(index)} key={index} style={buttonStyle}>
                                <img height="100%" width="100%" className="mb-5" style={{ position: 'relative', margin: 'auto' }} src={img} />
                            </button>
                        })}
                    </div>
                    <p className="mt-5">Select Size</p>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-3 mt-5">
                        {data && data.productByID.size.map((sz, index) => {
                            const buttonStyle = {
                                width: '38px',
                                height: '38px',
                                position: 'relative',
                                margin: 'auto',
                                border: sz.size_number === size ? "2px solid black" : "none",
                                borderRadius: '5px',
                                overflow: 'hidden',
                                padding: '5px'
                            }

                            return <button className="focus:outline-none" onClick={() => handleSize(index)} key={index} style={buttonStyle}>{sz.size_number}</button>
                        })}
                    </div>
                    <button onClick={shouldShowAlert} className="focus:outline-none mt-10 mb-10" style={{ backgroundColor: "#111", color: 'white', padding: '10px', width: '100%', borderRadius: '30px' }}>Add to Cart</button>
                    <p>
                        {data?.productByID?.description ?? ""}
                    </p>
                    <Accordion
                        title="Free Delivery and Return"
                        content="Free delivery for orders valued at THB 5500 or more.<br>
                        <br>Orders will be processed and delivered Monday - Friday. Except public holidays
Except for the holiday season for Nike members free shipping in case of return. Exceptions to the return policy"
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetail
