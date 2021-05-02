import { Fragment, useCallback, useEffect, useState } from "react"
import { useSession } from "../contexts/SessionContext";
import { PROMOTION_QUERY } from "../graphql/promotionQuery";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import { useQuery } from "@apollo/client"
import Accordion from "../Components/General/Accordion"

const typeStyle = {
    fontSize: "22px",
};

const titleStyle = {
    fontSize: "38px",
};

const priceStyle = {
    fontSize: "18px",
    textAlign: "end",
    color: "#757575",
};

const imageStyle = {
    width: "100%",
};

const PromotionDetail = (props) => {
    const { addProductToCart, userCookies, setLoading, cart } = useSession()
    const { addToast } = useToasts()
    const history = useHistory()
    const id = props?.match?.params?.id?.replace('/promotion/detail', '') ?? ""
    const { loading, data, error, refetch } = useQuery(PROMOTION_QUERY, { variables: { id } })
    const [imageIndex, setImage] = useState(0)
    const [size, setSize] = useState(0)
    const [stock, setStock] = useState(0)
    const [limit, setLimit] = useState(0)
    const product = data?.promotionByID?.productDetail ?? {}
    const total = parseFloat(data?.promotionByID?.productDetail?.price ?? 0) - (parseFloat(data?.promotionByID?.productDetail?.price ?? 0) * (parseFloat(data?.promotionByID?.discount ?? 0) / 100))
    const [mockData, setMock] = useState()
    const handleIndexImage = (index) => {
        setImage(index);
    };

    const handleSize = (index) => {
        setSize(product.size[index].size_number)
        if (cart === undefined) {
            setStock(product.size[index].stock)
            setLimit(data?.promotionByID?.limit)
        } else {
            setStock(product.size[index].stock - cart.filter(prod => (prod.id === product._id && prod.size === product?.size[index].size_number) || (prod.id === id && prod.size === product?.size[index].size_number)).length)
            setLimit(data?.promotionByID?.limit - cart.filter(prod => (prod.id === id)).length)
        }
    }

    const redirectToProductAll = useCallback(
        () => {
            history.push('/promotions')
        },
        [history],
    )

    const redirectToLogin = useCallback(
        () => {
            history.push('/login')
        },
        [history],
    )

    console.log(data)

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
        } else if (stock <= 0) {
            alert("Product is out of stock")
        } else if (limit <= 0) {
            alert("Promotion is out of limit")
        } else if (data?.promotionByID) {
            const result = {
                id: data.promotionByID._id,
                size: size,
                type: data.promotionByID.type
            }
            addProductToCart(result)
            addToast(`Add ${data.promotionByID.name} Success `, { appearance: 'success', autoDismiss: true });
        }
    }

    const shouldShowAlert = () => {
        if (size === 0) {
            alert("Please Select Size")
        } else {
            if (data?.promotionByID && product) {
                handleAddToCart()
            }
        }

    }

    if (mockData === undefined && !loading && data === undefined) {
        refetch()
    }

    useEffect(() => {
        if (loading && mockData === undefined) {
            setLoading(true)
        } else if (!loading || error || mockData) {
            setLoading(false)
        }

        if (mockData === undefined && data) {
            setMock(data)
        }
    }, [loading, data, mockData])
    return (
        <Fragment>
            <Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        {product && product?.imageList && <img className="mb-5" src={product?.imageList[imageIndex] ?? ""} style={imageStyle} />}
                    </div>
                    <div className="pr-0 md:pr-10 mt-0 md:mt-5 pl-10 pr-10 md:pl-0 md:pr-0">
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div>
                                <p style={typeStyle}>{product?.category ?? ""}</p>
                            </div>
                            <div className="grid grid-cols-1">
                                <p className="line-through" style={priceStyle}>{(parseInt(product?.price)).toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                }) ?? ""}</p>
                                <p style={{
                                    fontSize: "20px",
                                    textAlign: "end",
                                    color: "red",
                                }}>{(total).toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                }) ?? ""}</p>
                            </div>
                        </div>
                        <p style={titleStyle}>{product?.name ?? ""}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                            {data &&
                                product?.imageList?.map((img, index) => {
                                    const buttonStyle = {
                                        width: "125px",
                                        height: "125px",
                                        position: "relative",
                                        margin: "auto",
                                        border: index === imageIndex ? "2px solid black" : "none",
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                    };

                                    return <button className="focus:outline-none" onClick={() => handleIndexImage(index)} key={index} style={buttonStyle}>
                                        <img height="100%" width="100%" className="mb-5" style={{ position: 'relative', margin: 'auto' }} src={img} />
                                    </button>
                                })}
                        </div>
                        <p className="mt-5">Select Size</p>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-3 mt-5">
                            {data && product?.size?.map((sz, index) => {
                                const buttonStyle = {
                                    width: '38px',
                                    height: '38px',
                                    position: 'relative',
                                    margin: 'auto',
                                    border: sz?.size_number === size ? "2px solid black" : "none",
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    padding: '5px'
                                }

                                return <button hidden={parseInt(sz?.stock ?? 0) <= 0} className="focus:outline-none" onClick={() => handleSize(index)} key={index} style={buttonStyle}>{sz.size_number}</button>
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
        </Fragment>
    )
}

export default PromotionDetail