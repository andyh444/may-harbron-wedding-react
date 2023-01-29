import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./RSVP.css"
import EucalyptusHeader from "../components/eucalyptusHeader";
import NamesTable from "../components/RSVP/namesTable";
import DietTable from "../components/RSVP/dietTable";
import SendRequest from "../components/RSVP/sendRequest";
import TextBreak from "../components/textBreak";

function RSVP({ props, isEvening }) {
	const SHOWING_FORM = "showingForm";

	const [currentNames, setCurrentNames] = useState(null);
	const [currentRSVPRequest, setCurrentRSVPRequest] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);

	console.log("isEvening", isEvening);

	function submitNames(names) {
		console.log("submitting names", names);
		setCurrentStep(s => 2);
		setCurrentNames(n => names);
	}

	function goBackToStep1(names) {
		console.log("in go back");
		setCurrentStep(s => 1);
	}

	function submitRSVP(names) {
		names.isEvening = isEvening;
		names.timeStamp = new Date();
		console.log("names with evening", names);
		setCurrentRSVPRequest(n => names);
		setCurrentStep(s => 3);
	}

	function Reset() {
		setCurrentNames(n => null);
		setCurrentStep(s => 1);
	}

	function getContentsFromStep() {
		switch (currentStep) {
			case 1:
				return (
					<div>
						<p>Please note this is the form for the {isEvening ? "Evening" : "Day"}. If you need the {isEvening ? "Day" : "Evening"} form, click <Link to={isEvening ? "/RSVP" : "/Evening/RSVP"}>here</Link></p>
						<p>Please aim to send your RSVP by the 31st March. If you do not, you may be chased.</p>
						<TextBreak></TextBreak>
						<NamesTable initialNames={currentNames} submitNames={submitNames}></NamesTable>
					</div>);
			case 2: 
				return <DietTable names={currentNames} submitRSVP={submitRSVP} goBack={goBackToStep1}></DietTable>;
			case 3:
				return <SendRequest request={currentRSVPRequest} reset={Reset}></SendRequest>
		}
	}

    return (
        <div className="page">
			<EucalyptusHeader title="RSVP" />
			{
				getContentsFromStep()
			}
		</div>
    );
}

export default RSVP