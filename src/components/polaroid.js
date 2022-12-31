import React, { useState } from "react";
import "../polaroids.css"

function Polaroid({index, left, top, rotation, polaroidData, onEnter, onLeave, onClick}) {
    const [opacity, setOpacity] = useState(1)

    setTimeout(() => {
        setOpacity(o => 0);
    }, 100);
    const imageSrc = '..//Images//' + polaroidData.imageUrl;
    return (
        <div style={{left: left + "%", top: top + "%"}} className="polaroid" data-originalleft={left} data-originaltop={top} data-rotation={rotation} data-status="normal" onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div style={{transform: "rotate(" + rotation + "deg) scale(1)" }} className="polaroidcontainer">
                <div className="polaroidimagecontainer">
                    <img loading='lazy' className='polaroidimage' src={imageSrc} />
                    <div style={{"opacity": opacity}} className='polaroidimagecover'></div>
                </div>
                <div className="polaroidbackcontainer">
                    <div className='polaroidback'>{polaroidData.description}<br/>{polaroidData.timestamp}</div>
                </div>
            </div>
        </div>
    )
}

export default Polaroid;