import React, { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import EventExecutor from '../service/EventExecutor';

const HDListBox = React.forwardRef((props, ref) => {
    const { element } = props;
    const [selectedCity, setSelectedCity] = useState(null);

    const handleOnChangeEvent = (e) => {
        if(element.attributes && element.attributes.onchangeevent) {
            EventExecutor.executeEvent(props.meta, element.attributes.onchangeevent, null, null);
        }
    }
      const handleFilterValueChangeEvent = (e) => {
        if(element.attributes && element.attributes.onfiltervaluechange) {
            EventExecutor.executeEvent(props.meta, element.attributes.onfiltervaluechange, null, null);
        }
    }
    
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const groupedCities = [
        {
            label: 'Germany', code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA', code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan', code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

    const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

    return (
        <ListBox value={selectedCity} 
        options={cities}        
        onChange={(e) => {
            setSelectedCity(e.value);
            handleOnChangeEvent(e)
            handleFilterValueChangeEvent(e)
        }} 
        optionLabel="name"               
        disabled={element.attributes.disabled}
        multiple={element.attributes.multiple}
        filter={element.attributes.filter}
        filterBy={element.attributes.filterBy}
        tooltip={element.attributes.tooltip}
        />
    );
})

export default HDListBox;
 