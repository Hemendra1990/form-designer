import React from "react";
import { useState } from "react";
import Playground from "./playground/Playground";


const Form = () => {

    const [form, setForm] = useState({})

    const handleFormChange = (event) => {
        setForm((prevValue) => {
            prevValue[event.target.name] = event.target.value;
            return prevValue;
        })
    }


    return (
        <>
            <h1>My Form Test</h1>
            <form>
                <label>First name:</label><br/>
                <input type="text" name="fname" value={form.fname} onChange={handleFormChange}/><br/>
                <label>Last name:</label><br/>
                <input type="text" name="lname" value={form.lname} onChange={handleFormChange}/>
                
                <br/>
                <hr/>
            </form>
        </>
    )

}

export default Form;