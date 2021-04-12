import { Fragment, useRef, useState } from "react"

import './Accordion.css'
import Chevron from "./Chevron";
const Accordion = (props) => {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");

    const content = useRef(null);
    const toggleAccordion = () => {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );
        setRotateState(
            setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
        );
    }
    return (
        <div className="mt-5">
            <hr style={{color: 'black', height: '1px', width: '100%'}}/>
            <div className="accordion__section">
                <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                    <p className="accordion__title">{props.title}</p>
                    <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
                </button>
                <div
                    ref={content}
                    style={{ maxHeight: `${setHeight}` }}
                    className="accordion__content"
                >
                    <div
                        className="accordion__text"
                        dangerouslySetInnerHTML={{ __html: props.content }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Accordion