import React, { useState } from "react";
import polaroidsList from "../polaroids.json"
import "../polaroids.css"
import Polaroid from "../components/polaroid";
import $ from 'jquery'

function OurStory() {
    const [polaroidLeftPositions, updatePolaroidLeftPositions] = useState(getPolaroidPositions())
    const [polaroidTopPositions, updatePolaroidTopPositions] = useState(getPolaroidPositions())
    const [polaroidRotations, updatePolaroidRotations] = useState(getPolaroidRotations());

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

    function getPolaroidPositions() {
        var newPolaroidsLeft = Array(polaroidsList.Polaroids.length);
        for (var i = 0; i < newPolaroidsLeft.length; i++) {
            newPolaroidsLeft[i] = 20 + 60 * Math.random();
        }
        return newPolaroidsLeft;
    }

    function getPolaroids() {
        return polaroidsList.Polaroids.map((x, i) => {
            return <Polaroid
                key={i}
                index={i}
                left={polaroidLeftPositions[i]}
                top={polaroidTopPositions[i]}
                rotation={polaroidRotations[i]}
                polaroidData={x}
                onEnter = {() => polaroidEnter(i)}
                onLeave = {() => polaroidLeave(i)}
                onClick = {() => polaroidClick(i)}/>
        });
    }

    function polaroidClick(number) {
        var polaroid = document.getElementsByClassName("polaroid")[number];
        var status = polaroid.dataset.status;
        polaroid.style.removeProperty("left");
        polaroid.style.removeProperty("top");
        polaroid.children[0].style.removeProperty("transform");
        if (status === "normal" || status === "hover") {
            polaroid.dataset.status = "zoomAndCentre";
        }
        else if (status === "zoomAndCentre") {
            polaroid.dataset.status = "flip";
        }
        else if (status === "flip") {
            polaroid.dataset.status = "zoomAndCentrePostFlip";
        }
        else if (status === "zoomAndCentrePostFlip") {
            polaroid.dataset.status = "normal";
            polaroidLeave(number);
        }
        if (polaroid.dataset.status != "normal")
        {
            $(".blackoverlay").fadeIn();
        }
        else
        {
            $(".blackoverlay").fadeOut();
        }
    }

    function polaroidEnter(number) {
        var polaroids = document.getElementsByClassName("polaroid");
        var thisPolaroid = polaroids[number];
        if (thisPolaroid.dataset.status != "normal")
        {
            console.log(thisPolaroid.dataset.status);
            return;
        }
        var thisleft = parseInt(thisPolaroid.dataset.originalleft);
        var thistop = parseInt(thisPolaroid.dataset.originaltop);
        for (var i = 0; i < polaroids.length; i++)
        {
            if (i != number)
            {
                var left = parseInt(polaroids[i].dataset.originalleft);
                var top = parseInt(polaroids[i].dataset.originaltop);
                var diffX = left - thisleft;
                var diffY = top - thistop;
                var distance = Math.sqrt(diffX * diffX + diffY * diffY);
                var directionX = diffX / distance;
                var directionY = diffY / distance;
                
                // the closer the polaroid is to the active polaroid, the more it gets displaced
                var amount = 4.0 * Math.pow(distance / 100, -0.5);

                var thisLeft = left + amount * directionX;
                var thisTop = top + amount * directionY;
                
                polaroids[i].style.left = "clamp(0%," + thisLeft + '%' + ",100%)";
                polaroids[i].style.top = "clamp(0%," + thisTop + '%' + ",100%)";
    
                //var newLeft = amount * directionX;
                //var newTop = amount * directionY;
                //polaroids[i].style.transform = "translate(" + (10* polaroids[i].dataset.originalleft + newLeft) + "vw, " + 10 * newTop + "px)"; 
                
                var rotation = parseInt(polaroids[i].dataset.rotation) + 30 * (Math.random()-0.5);
                polaroids[i].children[0].style.transform = "rotate(" + rotation +  "deg) scale(1)";
            }
        }
        //thisPolaroid.children[0].style.transform = "rotate(0deg) scale(1.5)";
        thisPolaroid.children[0].style.removeProperty("transform");
        thisPolaroid.dataset.status = "hover";
    }
    
    function polaroidLeave(number) {
        var polaroids = document.getElementsByClassName("polaroid");
        var polaroid = polaroids[number];
        if (polaroid.dataset.status === "hover" || polaroid.dataset.status === "normal")
        {
            allPolaroidsToOriginalPosition(true);
            polaroid.children[0].style.transform = "rotate(" + parseInt(polaroid.dataset.rotation) +  "deg) scale(1)";
            polaroid.dataset.status = "normal";
        }
    }

    function allPolaroidsToOriginalPosition(includeRotation) {
        var polaroids = document.getElementsByClassName("polaroid");
        $(".blackoverlay").fadeOut();
        for (var i = 0; i < polaroids.length; i++)
        {
            if (includeRotation === true)
            {
                polaroids[i].children[0].style.transform = "rotate(" + parseInt(polaroids[i].dataset.rotation) +  "deg) scale(1)";
        
            }
            polaroids[i].dataset.status = "normal";
            polaroids[i].style.left = polaroids[i].dataset.originalleft + '%';
            polaroids[i].style.top = polaroids[i].dataset.originaltop + '%';
            
            //polaroids[i].style.transform = "translate(" + polaroids[i].dataset.originalleft + "vw, " + 10 * polaroids[i].dataset.originaltop + "px)"; 
                
        }
    }

    return (
        <div className="page">
            <p>We wanted to include a page about our story. I thought, hey, a picture is worth a thousand words so I just chucked some of our old polaroids on the table.</p>
            <p>I wrote on the back of each so you know what's going on.</p>
            <p>These polaroids are virtual, so please do not try to grab them off the screen - it won't work and you may hurt yourself. Instead, click on one to zoom it in, and click on it again to flip it over.</p>
            <div className="polaroidgroup" >
                <div className="blackoverlay" onClick={blackoverlayclick}>
                </div>
                { getPolaroids() }
            </div>
            <p>(Spoiler alert: These aren't really polaroids)</p>
        </div>
    );
}

export default OurStory