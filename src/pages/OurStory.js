import React, { useState } from "react";
import polaroidsList from "../polaroids.json"
import "../polaroids.css"
import Polaroid from "../components/polaroid";
import $ from 'jquery'

function OurStory() {

    // TODO: It seems like there should be a better way to get the originalRotations...
    const [originalRotations, _] = useState(getPolaroidRotations());
    const [polaroidRotations, updatePolaroidRotations] = useState(originalRotations);

    const [polaroidLefts, updatePolaroidLefts] = useState(polaroidsList.Polaroids.map(x => x.left));
    const [polaroidTops, updatePolaroidTops] = useState(polaroidsList.Polaroids.map(x => x.top));
    const [activePolaroid, updateActivePolaroid] = useState({ index: -1, state: "normal"});

    function blackoverlayclick() {
        allPolaroidsToOriginalPosition(true);
    }

    function getPolaroidRotations() {
        var rotations = Array(polaroidsList.Polaroids.length);
        for (var i = 0; i < rotations.length; i++) {
            rotations[i] = Math.round(60 * (Math.random() - 0.5));
        }
        return rotations;
    }

    function getPolaroids() {
        return polaroidsList.Polaroids.map((x, i) => {
            return <Polaroid
                key={i}
                index={i}
                left={polaroidLefts[i]}
                top={polaroidTops[i]}
                rotation={polaroidRotations[i]}
                polaroidData={x}
                state={activePolaroid.index === i ? activePolaroid.state : "normal"}
                onEnter = {() => polaroidEnter(i)}
                onLeave = {() => polaroidLeave(i)}
                onClick = {() => polaroidClick(i)}/>
        });
    }

    function polaroidClick(number) {
        let newActivePolaroid;
        if (activePolaroid.state === "normal" || activePolaroid.state === "hover") {
                newActivePolaroid = { index: number, state: "zoomAndCentre" };
        }
        else if (activePolaroid.state === "zoomAndCentre") {
            newActivePolaroid = { index: number, state: "flip" };
        }
        else if (activePolaroid.state === "flip") {
            newActivePolaroid = { index: number, state: "zoomAndCentrePostFlip" };

        }
        else if (activePolaroid.state === "zoomAndCentrePostFlip") {
            newActivePolaroid = { index: -1, state: "normal" };
        }
        updateActivePolaroid(p => newActivePolaroid);

        console.log(number, newActivePolaroid);

        if (newActivePolaroid.state !== "normal") {
            // cheeky DOM manipulation - should be safe enough but check if there's a more React-friendly way of doing this, e.g. https://kbenbeneck.medium.com/using-scrollintoview-with-react-components-ba41df3ff12
            $(".blackoverlay").fadeIn();
            document.getElementsByClassName("blackoverlay")[0].scrollIntoView({block: "center", behavior: "smooth"});
        }
        else {
            polaroidLeave(number);
            $(".blackoverlay").fadeOut();
        }
    }

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    function polaroidEnter(number) {
        if (number === activePolaroid.index) {
            return;
        }

        let thisleft = polaroidsList.Polaroids[number].left;
        let thistop = polaroidsList.Polaroids[number].top;

        let newLefts = [];
        let newTops = [];
        let newRotations = [];
        for (var i = 0; i < polaroidsList.Polaroids.length; i++)
        {
            if (i === number) {
                newLefts.push(thisleft);
                newTops.push(thistop);
                newRotations.push(originalRotations[i]);
            }
            else {
                var left = polaroidsList.Polaroids[i].left;
                var top = polaroidsList.Polaroids[i].top;
                var diffX = left - thisleft;
                var diffY = top - thistop;
                var distance = Math.sqrt(diffX * diffX + diffY * diffY);
                if (distance < 20) {
                    var directionX = diffX / distance;
                    var directionY = diffY / distance;
                    
                    // the closer the polaroid is to the active polaroid, the more it gets displaced
                    var amount = 4.0 * Math.pow(distance / 100, -0.5);

                    newLefts.push(clamp(0, left + amount * directionX, 100));
                    newTops.push(clamp(0, top + amount * directionY, 100));
                    newRotations.push(originalRotations[i] + 30 * (Math.random() - 0.5));
                }
                else {
                    newLefts.push(left);
                    newTops.push(top);
                    newRotations.push(originalRotations[i]);
                }
            }
        }
        let newActivePolaroid = {
            index: number,
            state: "hover"
        };
        updateActivePolaroid(p => newActivePolaroid);
        updatePolaroidLefts(l => newLefts);
        updatePolaroidTops(t => newTops);
        updatePolaroidRotations(r => newRotations);
    }
    
    function polaroidLeave(number) {
        if (activePolaroid.index !== -1
            && (activePolaroid.state === "hover" || activePolaroid.state === "normal"))
        {
            allPolaroidsToOriginalPosition(true);
        }
    }

    function allPolaroidsToOriginalPosition(includeRotation) {
        $(".blackoverlay").fadeOut();

        let newLefts = [];
        let newTops = [];
        for (var i = 0; i < polaroidsList.Polaroids.length; i++) {
            newLefts.push(polaroidsList.Polaroids[i].left);
            newTops.push(polaroidsList.Polaroids[i].top);
        }

        updatePolaroidLefts(l => newLefts);
        updatePolaroidTops(t => newTops);
        if (includeRotation) {
            updatePolaroidRotations(r => originalRotations);
        }
        let newActivePolaroid = {
            index: -1,
            state: "normal"
        };
        updateActivePolaroid(p => newActivePolaroid);
    }

    return (
        <div className="page">
            <p>We wanted to include a page about our story. We thought, hey, a picture is worth a thousand words so we just chucked some of our old polaroids down.</p>
            <p>We wrote on the back of each so you know what's going on.</p>
            <p>These polaroids are virtual, so please do not try to grab them off the screen - it won't work and you may hurt yourself. Instead, click on one to zoom it in, and click on it again to flip it over.</p>
            <div className="polaroidgroup" >
                <div className="polaroidSideArea left">
                    <div className="blackoverlay" onClick={blackoverlayclick}>
                    </div>
                </div>
                <div className="polaroidArea">
                    <div className="blackoverlay" onClick={blackoverlayclick}>
                    </div>
                    { getPolaroids() }
                </div>
                <div className="polaroidSideArea right">
                    <div className="blackoverlay" onClick={blackoverlayclick}>
                    </div>
                </div>
            </div>
            <p>(Spoiler alert: These aren't really polaroids)</p>
        </div>
    );
}

export default OurStory