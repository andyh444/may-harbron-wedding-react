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
    let rotation = 0;
    if (state === "normal" || state === "hover") {
        translateX = `calc(${polaroidPosition.left - 50}vw - 50%)`;
        translateY = `calc(${polaroidPosition.top - 60}vh - 50%)`;
        scaleX = scaleY = 1;
        if (state === "hover") {
            scaleX = scaleY = 1.5;
        }
        else {
            rotation = polaroidPosition.rotation;
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
    let rotationStyle = {
        transform: `rotate(${rotation}deg)`
    }

    return (
            
            <div className="polaroidContainer noBlueBack" data-status={state} >
                <div className="polaroidTranslator noBlueBack" style={style} onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                    <div className="polaroidScaler noBlueBack" style={scaleStyle} >
                        <div className="polaroid" style={rotationStyle}>
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