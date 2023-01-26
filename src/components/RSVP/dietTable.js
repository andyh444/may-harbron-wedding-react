import { React, useRef } from "react";
import TextInput from "../textInput";

function DietTable({ names, goBack, submitRSVP }) {

    var refs = useRef({});
    var otherCommentsRef = useRef("");

    function GoBack() {
        goBack(names);
    }

    function Submit() {
        let namesAndDiet = [];
        for (let i = 0; i < names.length; i++) {
            namesAndDiet.push({
                name: names[i].name,
                canAttend: names[i].canAttend,
                dietaryRequirements: refs.current[i]?.value ?? ""
            });
        }
        let finalNames = {
            names: namesAndDiet,
            otherComments: otherCommentsRef.current.value
        };
        console.log(finalNames);
        submitRSVP(finalNames);
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Dietary Requirements?</th>
                    </tr>
                    {
                        names.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td><p>{x.name}</p></td>
                                    <td>{x.canAttend ? <TextInput reference={ref => refs.current[i] = ref} placeholder={"E.g. Vegan, No gluten, etc"}></TextInput> : <p>Cannot attend</p>}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <br/>
            <p>---</p> {/*TODO: Replace*/}
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Any other comments?</td>
                        <td><TextInput reference={otherCommentsRef} placeholder={"E.g. song requests, etc"}></TextInput></td>
                    </tr>
                </tbody>
            </table>
            
            <button onClick={Submit}>Submit</button>
            <button onClick={GoBack}>Back</button>
        </div>
    );
}

export default DietTable;