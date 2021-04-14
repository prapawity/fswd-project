import { useCallback } from "react"
import { useHistory } from "react-router"

const newLabelStyle = {
    color: "rgb(250, 84, 0)",
    fontSize: "14px"
}

const productTypeTextStyle = {
    color: "rgb(117, 117, 117)",
    fontSize: "14px" 

}

const productNameTextStyle = {
    fontSize: "18px"
}

const imageStyle = {
    borderRadius: "5px"
}

const buttonStyle = {
    textAlign: 'inherit'
}

const CardProduct = (props) => {
    const history = useHistory()
    const image = props.img
    const detail = props?.detail ?? {}
    
    const redirectToProductDetail = useCallback(
        () => {
            history.push(`/product/detail/${detail._id}`)
        },
        [history],
    )
    console.log(detail)
    return (
        <button className="focus:outline-none" style={buttonStyle}  onClick={redirectToProductDetail}>
            <div className="shadow-md p-5">
                <img className="mb-5" src={image} style={imageStyle} />
                <p style={newLabelStyle}>New Arrival</p>
                <p style={productNameTextStyle}>{detail.name}</p>
                <p style={productTypeTextStyle}>{detail.category}</p>
                <p>{(parseInt(detail.price)).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            }) ?? ""}</p>
            </div>
        </button>
    )
}

export default CardProduct