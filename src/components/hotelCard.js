import React from "react";
import "./hotelCard.css"

function HotelCard({linkUrl, imageUrl, name, noOfMiles}) {

    function getMilesString() {
        if (noOfMiles === 1) {
            return "mile";
        }
        return "miles";
    }

    return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <div className="hotelCard">
                <div className="hotelCardImageContainer">
                    <img className="hotelCardImage" src={imageUrl} alt=""/>
                </div>
                <p className="hotelCardName">{name}</p>
                <p>{noOfMiles} {getMilesString()} from the venue</p>
            </div>
        </a>
    );
}

export default HotelCard;