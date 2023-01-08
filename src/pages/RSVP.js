import React, { useRef, useState } from "react";
import "./RSVP.css"
import TextInput from "../components/textInput";
import EucalyptusHeader from "../components/eucalyptusHeader";

function RSVP({ isEvening }) {
	const SHOWING_FORM = "showingForm";

	const nameRef = useRef("");
	const yesCheckedRef = useRef(false);
	const noCheckedRef = useRef(false);
	const dietaryRef = useRef("");
	const otherCommentsRef = useRef("");
	const [currentFormStatus, updateFormStatus] = useState(SHOWING_FORM);
	const [currentValidationMessage, updateValidationMessage] = useState("");

	console.log("isEvening", isEvening);

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
				<button onClick={sendRSVP}>Submit</button>
			</div>
		)
	}

    return (
        <div className="page">
			<EucalyptusHeader title="RSVP" />
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

export default RSVP