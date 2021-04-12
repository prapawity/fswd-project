import { Fragment, useState } from "react"
import Accordion from "../Components/General/Accordion"
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
    const type = "รองเท้าผู้ชาย"
    const name = "Nike Mercuria Vapor"
    const price = "3200"
    const imageList = [
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/50425a6a-2e19-4bbc-840e-695798f6a5e1/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5ddf5930-bcd3-4482-909b-42fe984bb4eb/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/764b22fb-f69e-4917-a3ef-61a1b823a9d1/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5a3de22c-3411-4c4e-89e6-75f177e1f5bf/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6e41a6e5-da89-462d-8f4c-2ddd9cc483e9/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/54b93829-3674-40b4-9ee6-f044fb5e44e7/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/dd17bb74-b8a4-43fe-b206-6dea038bd11f/air-zoom-gtcut-sfrvRJ.png",
        "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/70949c0e-65b0-4dd2-a523-71ab082e8db4/air-zoom-gtcut-sfrvRJ.png"
    ]
    const [image, setImage] = useState(imageList[0])
    const sizeList = [
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "42.5",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48"
    ]
    const [size, setSize] = useState(sizeList[0])

    const handleIndexImage = (index) => {
        setImage(imageList[index])
    }

    const handleSize = (index) => {
        setSize(sizeList[index])
    }

    const handleAddToCart = () => {

    }
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <img className="mb-5" src={image} style={imageStyle} />
                </div>
                <div className="pr-0 md:pr-10 mt-0 md:mt-5 pl-10 pr-10 md:pl-0 md:pr-0">
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <div>
                            <p style={typeStyle}>{type}</p>
                        </div>
                        <div>
                            <p style={priceStyle}>฿{price}</p>
                        </div>
                    </div>
                    <p style={titleStyle}>{name}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                        {imageList.map((img, index) => {
                            const buttonStyle = {
                                width: "125px",
                                height: "125px",
                                position: 'relative',
                                margin: 'auto',
                                border: img === image ? "2px solid black" : "none",
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
                        {sizeList.map((sz, index) => {
                            const buttonStyle = {
                                width: '38px',
                                height: '38px',
                                position: 'relative',
                                margin: 'auto',
                                border: sz === size ? "2px solid black" : "none",
                                borderRadius: '5px',
                                overflow: 'hidden',
                                padding: '5px'
                            }

                            return <button className="focus:outline-none" onClick={() => handleSize(index)} key={index} style={buttonStyle}>{sz}</button>
                        })}
                    </div>
                    <button onClick={handleAddToCart} className="focus:outline-none mt-10 mb-10" style={{ backgroundColor: "#111", color: 'white', padding: '10px', width: '100%', borderRadius: '30px' }}>Add to Cart</button>
                    <p>Nike Air Zoom G.T.Cut คือรองเท้าสำหรับสเปซเมกเกอร์ ผู้เล่นที่ใช้ลีลาทักษะเพื่อสร้างพื้นที่ในการทำเกมให้ตัวเองและเพื่อนในทีมซิลลูเอทของรองเท้าออกแบบให้มีน้ำหนักเบาและแนบชิดติดพื้น ซึ่งจะลดการสัมผัสพื้นให้น้อยที่สุด ทำให้คุณควบคุมฝีเท้าได้ดั่งใจและมีเสถียรภาพในการเคลื่อนไหวไปด้านข้างนอกจากนี้ Air Zoom G.T. Cut ยังมีการติดตั้งพื้นรองเท้าแบบลาดลงของ React แบบเต็มความยาวเท้า โดยซ้อนทับเหนือส่วนโค้งพาราโบลิกของ Air Zoom Strobel และส่วน Air Zoom ที่ส้นเพื่อสร้างสัมผัสที่ฉับไวและตอบสนองได้ดี

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
