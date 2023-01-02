import React from "react";
import "./textInput.css"

function TextInput({ placeholder, reference }) {
    return (
        <div className="textInputContainer">
            <input className="textInput" type="text" placeholder={placeholder} ref={reference}></input>
        </div>
    );
}

export default TextInput