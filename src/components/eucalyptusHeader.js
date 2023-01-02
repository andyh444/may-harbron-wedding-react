import React from "react";
import eucalyptusImage from "../Images/Eucalyptus.png"

function EucalyptusHeader({title}) {
    return (
        <div className="eucalyptusImageContainer" >
            <img className="eucalyptusImage" src={eucalyptusImage} alt=""  />
            <h2>{title}</h2>
        </div>
    );
}

export default EucalyptusHeader;