import React, { useRef, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import "./RSVP.css"
import TextInput from "../components/textInput";
import EucalyptusHeader from "../components/eucalyptusHeader";
import NamesTable from "../components/RSVP/namesTable";
import DietTable from "../components/RSVP/dietTable";
import SendRequest from "../components/RSVP/sendRequest";

function RSVP({ props, isEvening }) {
	const SHOWING_FORM = "showingForm";

	const history = useHistory();

	const nameRef = useRef("");
	const yesCheckedRef = useRef(false);
	const noCheckedRef = useRef(false);
	const dietaryRef = useRef("");
	const otherCommentsRef = useRef("");
	const [currentFormStatus, updateFormStatus] = useState(SHOWING_FORM);
	const [currentValidationMessage, updateValidationMessage] = useState("");

	const [currentNames, setCurrentNames] = useState(null);
	const [currentRSVPRequest, setCurrentRSVPRequest] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);

	console.log("isEvening", isEvening);
	console.log("match", props.match.params.name);

	async function sendRSVP() {
		if (!validate()) {
			return;
		}
		console.log(yesCheckedRef.current.checked);
		console.log(noCheckedRef.current.checked);

		const canAttend = yesCheckedRef.current.checked && !noCheckedRef.current.checked;
		
		// TODO: Add evening/day guest info
		const newEntry = {
			name: nameRef.current.value,
			canAttend: canAttend,
			dietaryRequirements: dietaryRef.current.value,
			comments: otherCommentsRef.current.value,
			timeStamp: new Date(),
			isEvening: isEvening
		}
		console.log("new Entry:", newEntry);
		try {
			updateFormStatus(s => "Sending RSVP...");
			const fetchResult = await fetch("https://eu-west-1.aws.data.mongodb-api.com/app/wedding_rsvp-uquic/endpoint/rsvpentry",
			{
				method: "POST",
				body: JSON.stringify(newEntry),
				headers: {"Content-type": "application/json; charset=UTF-8"}
			})
			const json = await fetchResult.json();
			console.log("response", json);
			if (json.response.error) {
				updateFormStatus(s => "Failed!");
			}
			else {
				updateFormStatus(s => "Sent!");
			}
		}
		catch (error) {
			console.log(error);
			updateFormStatus(s => "Failed!");
		}
	}

	function validate() {
		let validationMessages = [];
		
		if (nameRef.current.value === "") {
			validationMessages.push("Please enter a name");
		}
		if (!yesCheckedRef.current.checked
			&& !noCheckedRef.current.checked) {
			validationMessages.push("Please say if you can attend");
		}
		updateValidationMessage(validationMessages.join(", "));
		return validationMessages.length === 0;
	}

	function getContents() {
		if (currentFormStatus === SHOWING_FORM) {
			return getInputForm();
		}
		return (
			<div>
				<p>{currentFormStatus}</p>
				<button onClick={() => updateFormStatus(s => SHOWING_FORM)}>Send another</button>
			</div>
		)
	}

	function next() {
		var location = "/";
		if (isEvening) {
			location += "Evening/";
		}
		location += "RSVP/";
		
		history.push(location + nameRef.current.value);
	}

	function getInputForm() {
		return (
			<div>
				<p>Please enter your details in the form below, or send your RSVP to <a href="mailto:mayharbronwedding@gmail.com">mayharbronwedding@gmail.com</a></p>
				<p className="asterisk">* = Required Field</p>
				<table>
					<tbody>
						<tr>
							<td><label>What are your name(s)?<span className="asterisk">*</span></label></td>
							<td><TextInput reference={nameRef} placeholder="E.g. Andy Harbron and Molly May"></TextInput></td>
						</tr>
						<tr>
							<td><label>Can you attend?<span className="asterisk">*</span></label></td>
							<td>
								<input ref={yesCheckedRef} type="radio" name="attend" value="Yes"></input><span>Yes</span>
								<input ref={noCheckedRef} type="radio" name="attend" value="No"></input><span>No</span>
							</td>
						</tr>
						<tr>
							<td><label>Any dietary requirements?</label></td>
							<td><TextInput reference={dietaryRef} placeholder="E.g. Vegan, allergies, etc"></TextInput></td>
						</tr>
						<tr>
							<td><label>Any other comments?</label></td>
							<td><TextInput reference={otherCommentsRef} placeholder="E.g. song requests"></TextInput></td>
						</tr>
					</tbody>
				</table>
				<p className="validationMessage">{currentValidationMessage}</p>
				<Link to={"/RSVP/"+nameRef.current.value}>Next</Link>
			</div>
		)
	}

	function submitNames(names) {
		console.log("submitting names", names);
		setCurrentStep(s => 2);
		setCurrentNames(n => names);
	}

	function goBack(names) {
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

	function getContentsFromStep() {
		switch (currentStep) {
			case 1:
				return <NamesTable initialNames={currentNames} submitNames={submitNames}></NamesTable>
			case 2: 
				return <DietTable names={currentNames} submitRSVP={submitRSVP} goBack={goBack}></DietTable>;
			case 3:
				return <SendRequest request={currentRSVPRequest}></SendRequest>
		}
	}

    return (
        <div className="page">
			<EucalyptusHeader title="RSVP" />
			{
				getContentsFromStep()
			}
			{getContents()}
			{/*<p>Please enter your details in the form below, or send your RSVP to <a href="mailto:mayharbronwedding@gmail.com">mayharbronwedding@gmail.com</a></p>
			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSfRww-tzc_-UnwY4P5y7pXY0PtHNuoogAKkoNWFUG4LHowPEw/viewform?embedded=true"
				width="100%" height="960" frameBorder="0" marginHeight="0" marginWidth="0">
				Loading…
	</iframe>*/}
		</div>
    );
}

export default withRouter(RSVP)