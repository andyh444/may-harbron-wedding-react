import React from "react";
import invite from "../Images/Invitep1 day.jpg"
import eveningInvite from "../Images/Invitep2 eve.jpg"
import { Link } from "react-router-dom";

function HomePage({isEvening}) {

    function noOfDaysToGo() {
        var today = new Date();
        var targetDate = new Date('2023-07-23T00:00:01'); //'2023-07-23T00:00:01'
        var diffInMs = targetDate - today; // gives a timespan in milliseconds
        return Math.ceil(diffInMs / (1000 * 3600 * 24));
    }

    function getNoOfDaysText() {
        const daysToGo = noOfDaysToGo();
        var message;
        if (daysToGo < 0) {
            message = "the wedding has happened already! What are you doing back here?";
        }
        else if (daysToGo === 0) {
            message = "we're saying I do today!";
        }
        else if (daysToGo === 1) {
            message = `we're saying I do tomorrow!`;
        }
        else {
            message = `we're saying I do in ${daysToGo} days!`;
        }
        return message;
    }

    return (
    <div className="page">
        <img className="InviteImage" alt="" src={isEvening ? eveningInvite : invite} />
        <div className="HomePageText">
            <p>Hello, we're Andy and Molly, and {getNoOfDaysText()}</p>
            {
                !isEvening && <p>If you're an evening guest, you need the evening website, <Link to="/Evening/Home">here</Link></p>
            }
            {
                isEvening && <p>If you're a day guest, you need the day website, <Link to="/Home">here</Link></p>
            }
            <br/>
            <p>All the details for the wedding can be found under "Wedding Info"</p>
            <br/>
            <p>If you are doing a confuse you can contact us here:</p>
            <p>mayharbronwedding@gmail.com</p>
            <p><strong>Andy:</strong> 07000000000</p>
            <p><strong>Molly:</strong> 07000000000</p>
        </div>
    </div>);
}

export default HomePage;