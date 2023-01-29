import { React, useState, useRef, useEffect } from "react";
import TextInput from "../textInput";

function NamesTable({ initialNames, submitNames }) {

    const [namesCount, updateNamesCount] = useState(initialNames?.length ?? 1);
    const [validationMessage, updateValidationMessage] = useState("");
    const refs = useRef({});
    const yesRefs = useRef({});
    const noRefs = useRef({});

    useEffect(() => {
        if (initialNames) {
            for (var i = 0; i < initialNames.length; i++) {
                refs.current[i].value = initialNames[i].name;
                if (initialNames[i].canAttend) {
                    yesRefs.current["attend" + i].checked = true;
                }
                else {
                    noRefs.current["attend" + i].checked = true;
                }

            }
        }
    }, [initialNames]);

    function AddName() {
        const newNameCount = namesCount + 1;
        if (newNameCount > 10) {
            updateValidationMessage("You cannot add more than 10 names!");
            return;
        }
        updateNamesCount(n => newNameCount);
        updateValidationMessage(m => "");
    }

    function Submit() {
        console.log("yesRefs", yesRefs);
        console.log("noRefs", noRefs);
        
        var nameCount = Object.keys(refs.current).length;
        if (!Object.keys(refs.current).some(t => refs.current[t].value !== "")) {
            updateValidationMessage(m => "Please enter at least one name");
            return;
        }
        console.log(nameCount);
        var names = [];
        for (var i = 0; i < nameCount; i++) {
            if (refs.current[i].value !== "") {
                var canAttend = yesRefs.current["attend" + i].checked;
                var cannotAttend = noRefs.current["attend" + i].checked;

                console.log("yesRef", canAttend, "noRef", cannotAttend)

                let thisName = refs.current[i].value;
                if (!canAttend && !cannotAttend) {
                    updateValidationMessage(m => `Please say if ${thisName} is attending`);
                    return;
                }
                if (canAttend && cannotAttend) {
                    updateValidationMessage(m => `${thisName} cannot be both attending and not attending!`);
                    return;
                }

                console.log("pushing", thisName);
                names.push({
                        name: thisName,
                        canAttend: canAttend
                    });
            }
        }
        console.log("names", names);
        submitNames(names);
    }
    console.log("initialNames", initialNames);
    return (
        <div>
            <p>Please enter your details in the form below, or send your RSVP to <a href="mailto:mayharbronwedding@gmail.com">mayharbronwedding<wbr/>@gmail.com</a></p>
            <p>Step 1: For each person on the invitation, add their name into the Person field and tick if they can attend. Dietary requirements can be specified in the next step</p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Can you Attend?</th>
                    </tr>
                    {
                        (Array(namesCount).fill(0)).map((x, i) =>
                        {
                            return (
                                <tr key={i}>
                                    <td>Person {i + 1}</td>
                                    <td><TextInput reference={ref => refs.current[i] = ref} placeholder="E.g. Andy"></TextInput></td>
                                    <td>
                                        <input type="radio" ref={ref => yesRefs.current["attend" + i] = ref} name={"attend" + i} value="Yes"></input><span>Yes</span>
                                        <br/>
                                        <input type="radio" ref={ref => noRefs.current["attend" + i] = ref} name={"attend" + i} value="No"></input><span>No</span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                validationMessage && <p className="validationMessage">{validationMessage}</p>
            }
            <button onClick={AddName}>Add Name</button>
            <button onClick={Submit}>Next</button>
        </div>
    );
}

export default NamesTable;