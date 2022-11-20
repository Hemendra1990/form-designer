import React from 'react';
import { Fieldset } from 'primereact/fieldset';
import { useMetaContext } from '../context/MetaContext';

const HDFieldset = React.forwardRef((props, ref) => {
    const meta = useMetaContext();
    
    return (
        <Fieldset legend="Header">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</Fieldset>
    )
});

export default HDFieldset;