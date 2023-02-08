import React from "react";
import "./RSVPEntry.css"

function RSVPEntry({ entry }) {
    return (
        <div className="RSVPEntry">
            {
                entry.names.map(x => {
                    return <p>{x.name}, {x.canAttend ? "Can attend" : "Can't attend"}, Diet: {x.dietaryRequirements}</p>
                })
            }
            <p>{entry.isEvening ? "Evening" : "Day"}</p>
            <p>Other comments: {entry.otherComments}</p>
        </div>
    )
}

export default RSVPEntry;