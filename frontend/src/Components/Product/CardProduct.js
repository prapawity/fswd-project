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
    const image = (props?.img ?? "") === "" ? "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6081451-e5e6-44a2-a4f4-21558717782f/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-classic-cortez-GdrCtp.png" : props.img
    const detail = props?.detail ?? {}
    const redirectToProductDetail = useCallback(
        () => {
            history.push(`/product/detail/${detail._id}`)
        },
        [history],
    )

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