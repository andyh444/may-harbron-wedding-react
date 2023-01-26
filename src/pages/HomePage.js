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
            message = "We will be saying our vows today!";
        }
        else if (daysToGo === 1) {
            message = `We will be saying our vows tomorrow!`;
        }
        else {
            message = `We will be saying our vows in ${daysToGo} days!`;
        }
        return message;
    }

    return (
    <div className="page">
        <img className="InviteImage" alt="" src={isEvening ? eveningInvite : invite} />
        <div className="HomePageText">
            <p>Hello there</p>    
            <p>If you are here then chances are you've just received one of these long awaited invitations. If not, I don't what you're doing here, but please leave.</p>
            <p>{getNoOfDaysText()}</p>
            {
                !isEvening && <p>If you're an evening guest, you need the <Link to="/Evening/Home">evening website</Link></p>
            }
            {
                isEvening && <p>If you're a day guest, you need the <Link to="/Home">day website</Link></p>
            }
            <br/>
            <p>All the details for the wedding can be found under <Link to="Info">{isEvening ? "Reception Info" :"Wedding Info"}</Link></p>
            <br/>
            <p></p>
            <br />
            <p>If you have any questions that aren't answered on the site, please feel free to contact us at:</p>
            <p>mayharbronwedding@gmail.com</p>
        </div>
    </div>);
}

export default HomePage;