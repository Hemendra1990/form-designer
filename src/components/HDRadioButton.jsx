import React, { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useMetaContext } from "../context/MetaContext";
 
const HDRadioButton = React.forwardRef((props, ref) => {
    const meta = useMetaContext();

    /**Below are the sample code for radio button coped from primeng */
    const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
    const [city, setCity] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(categories[1]);

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                    <label htmlFor="city1">Chicago</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city2" name="city" value="Los Angeles" onChange={(e) => setCity(e.value)} checked={city === 'Los Angeles'} />
                    <label htmlFor="city2">Los Angeles</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city3" name="city" value="New York" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
                    <label htmlFor="city3">New York</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city4" name="city" value="San Francisco" onChange={(e) => setCity(e.value)} checked={city === 'San Francisco'} />
                    <label htmlFor="city4">San Francisco</label>
                </div>

                {/* <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>
                {
                    categories.map((category) => {
                        return (
                            <div key={category.key} className="field-radiobutton">
                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)}  checked={selectedCategory.key === category.key} disabled={category.key === 'R'} />
                                <label htmlFor={category.key}>{category.name}</label>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
});

export default HDRadioButton;
