import React, { useState } from "react";
import "../polaroids.css"

function Polaroid({index, polaroidPosition, state, polaroidData, onEnter, onLeave, onClick}) {
    const [opacity, setOpacity] = useState(1)

    setTimeout(() => {
        setOpacity(o => 0);
    }, 100);
    const imageSrc = '..//Images//' + polaroidData.imageUrl;

    let translateX = "-50%";
    let translateY = "-50%";
    let scaleX = 3;
    let scaleY = 3;
    if (state === "normal" || state === "hover") {
        translateX = `calc(${polaroidPosition.left - 50}vw - 50%)`;
        translateY = `calc(${polaroidPosition.top - 60}vh - 50%)`;
        scaleX = scaleY = 1;
        if (state === "hover") {
            scaleX = scaleY = 1.5;
        }
    }
    if (state === "flip") {
        scaleX *= -1;
    }

    let style = {
        transform: `translate(${translateX},${translateY})`,
    }
    let scaleStyle = {
        transform: `scale(${scaleX},${scaleY})`,
    }
    console.log(scaleStyle);

    return (
            
            <div className="polaroidContainer noBlueBack" data-status={state} >
                <div className="polaroidTranslator" style={style} onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                    <div className="polaroidScaler noBlueBack" style={scaleStyle} >
                        <div className="polaroid" style={state !== "normal" ? {} : {transform: "rotate(" + polaroidPosition.rotation + "deg) scale(1)" }}>
                            <div className="polaroidimagecontainer">
                                <img alt={polaroidData.description} loading='lazy' className='polaroidimage' src={imageSrc} />
                                <div style={{"opacity": opacity}} className='polaroidimagecover'></div>
                            </div>
                            <div className="polaroidbackcontainer">
                                <div className='polaroidback'>{polaroidData.description}<br/>{polaroidData.timestamp}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Polaroid;