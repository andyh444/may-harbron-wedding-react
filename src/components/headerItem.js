import React from "react";
import "./headerItem.css"

function HeaderItem({name, isActive, headerButtonClick}) {

    return (
        <div className="headerItem" data-name="Home" data-activepage={isActive ? "true" : "false"} onClick={headerButtonClick}>
            <p>{name}</p>
            <div className="headerItemUnderline"></div>
        </div>
    );
}

export default HeaderItem;