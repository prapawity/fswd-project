import { Fragment } from "react"

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

const CardProduct = (props) => {
    const image = props.img
    return (
        <Fragment>
            <div className="shadow-md p-5">
                <img className="mb-5" src={image} style={imageStyle} />
                <p style={newLabelStyle}>New Arrival</p>
                <p style={productNameTextStyle}>Product Name</p>
                <p style={productTypeTextStyle}>Product Type</p>
                <p>Price</p>
            </div>
        </Fragment>
    )
}

export default CardProduct