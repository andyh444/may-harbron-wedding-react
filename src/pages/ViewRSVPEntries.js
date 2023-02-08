import { React, useEffect, useState } from "react";
import RSVPEntry from "../components/RSVPEntry";

function ViewRSVPEntries() {
    const [entries, updateEntries] = useState([]);
    useEffect(() =>
    {
        getEntries();
    }, []);

    function getRSVPEntries() {
        return entries.map((x, i) => {
            return <RSVPEntry key={i} entry={x} />
        });
    }

    async function getEntries() {
        try {
            const fetchResult = await fetch("https://eu-west-1.aws.data.mongodb-api.com/app/wedding_rsvp-uquic/endpoint/getRSVPEntries");
            const json = await fetchResult.json();
            console.log("response", json.response);
            updateEntries(e => json.response);
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log("view rsvp entries");
    return (
        <div className="page">
            {
                getRSVPEntries()
            }
        </div>
    );
}

export default ViewRSVPEntries;