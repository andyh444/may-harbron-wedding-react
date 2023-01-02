import React from "react";
import "./hotelCard.css"

function HotelCard({linkUrl, imageUrl, name, noOfMiles}) {
    return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <div className="hotelCard">
                <img className="hotelCardImage" src={imageUrl} alt=""/>
                <p>{name}</p>
                <p>{noOfMiles} miles from the venue</p>
            </div>
        </a>
    );
}

export default HotelCard;