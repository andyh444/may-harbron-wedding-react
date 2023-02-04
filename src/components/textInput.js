import React from "react";
import "./textInput.css"

function TextInput({ placeholder, reference, className }) {
    return (
        <div className="textInputContainer">
            <input className={"textInput " + className} type="text" placeholder={placeholder} ref={reference}></input>
        </div>
    );
}

export default TextInput