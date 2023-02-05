import React, { useState, useRef } from "react";
import polaroidsList from "../polaroids.json"
import "../polaroids.css"
import Polaroid from "../components/polaroid";
import $ from 'jquery'

function OurStory() {

    // TODO: It seems like there should be a better way to get the originalRotations...
    const [originalRotations, _] = useState(getPolaroidRotations());

    const [polaroidPositions, updatePolaroidPositions] = useState(polaroidsList.Polaroids.map((x, i) => {return { left: x.left, top: x.top, rotation: originalRotations[i] }}));
    const [activePolaroid, updateActivePolaroid] = useState({ index: -1, state: "normal"});
    const overlayRef = useRef();

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
                polaroidPosition={polaroidPositions[i]}
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
            if (activePolaroid.state === "normal") {
                polaroidEnter(number);
            }
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

        if (newActivePolaroid.state !== "normal") {
            $(overlayRef.current).fadeIn();
            overlayRef.current.scrollIntoView({block: "center", behavior: "smooth"});
        }
        else {
            allPolaroidsToOriginalPosition(true);
            $(overlayRef.current).fadeOut();
        }
    }

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    function polaroidEnter(number) {
        console.log("polaroidEnter");
        if (number === activePolaroid.index) {
            console.log("number is active polaroid");
            return;
        }
        let thisleft = polaroidsList.Polaroids[number].left;
        let thistop = polaroidsList.Polaroids[number].top;
        let newPositions = [];
        for (var i = 0; i < polaroidsList.Polaroids.length; i++)
        {
            let newPosition;
            if (i === number) {
                newPosition = { left: thisleft, top: thistop, rotation: originalRotations[i]};
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

                    newPosition = { left: clamp(0, left + amount * directionX, 100), top: clamp(0, top + amount * directionY, 100), rotation: originalRotations[i] + 30 * (Math.random() - 0.5)};
                }
                else {
                    newPosition = { left: left, top: top, rotation: originalRotations[i]};
                }
            }
            newPositions.push(newPosition);
        }
        let newActivePolaroid = {
            index: number,
            state: "hover"
        };
        updatePolaroidPositions(p => newPositions);
        updateActivePolaroid(p => newActivePolaroid);
    }
    
    function polaroidLeave(number) {
        if (activePolaroid.index !== -1
            && (activePolaroid.state === "hover" || activePolaroid.state === "normal")) {
            allPolaroidsToOriginalPosition(true);
        }
    }

    function allPolaroidsToOriginalPosition(includeRotation) {
        $(overlayRef.current).fadeOut();

        let newPositions = [];
        for (var i = 0; i < polaroidsList.Polaroids.length; i++) {
            newPositions.push({ left: polaroidsList.Polaroids[i].left, top: polaroidsList.Polaroids[i].top, rotation: includeRotation ? originalRotations[i] : polaroidPositions[i].rotation});
        }
        updatePolaroidPositions(p => newPositions);
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
                    <div ref={overlayRef} className="blackoverlay" onClick={blackoverlayclick}>
                    </div>
                    { getPolaroids() }
            </div>
            <p>(Spoiler alert: These aren't really polaroids)</p>
        </div>
    );
}

export default OurStory