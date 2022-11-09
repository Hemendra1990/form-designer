import React from 'react'
import AppContext from '../constants/AppContext'

const ComponentList = () => {
    const handleClick = (e) => {
        AppContext.push(e.target.name);
        console.log(AppContext);
    }
    return(
        <>
            <button name='HemendraTextArea' onClick={handleClick}>Input</button>
            <button name='HemendraInput' onClick={handleClick}>TextArea</button>
        </>
    )
}

export default ComponentList;