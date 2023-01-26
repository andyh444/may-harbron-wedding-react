import { React, useState, useEffect } from "react";

function SendRequest({ request }) {

    const [currentMessage, updateCurrentMessage] = useState("Sending...");

    useEffect(() => {
        send();
    }, []);

    async function send() {
        try {
            const fetchResult = await fetch("https://eu-west-1.aws.data.mongodb-api.com/app/wedding_rsvp-uquic/endpoint/rsvpentry",
            {
                method: "POST",
                body: JSON.stringify(request),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            const json = await fetchResult.json();
            console.log("response", json);
            if (json.response.error) {
                updateCurrentMessage(s => "Failed!");
            }
            else {
                updateCurrentMessage(s => "Sent!");
            }
        }
        catch (error) {
            console.log(error);
            updateCurrentMessage(s => "Failed!");
        }
    }

    

    return (
        <div>
            <p>{currentMessage}</p>
            <button>Send Another</button>
        </div>
    )
}

export default SendRequest;