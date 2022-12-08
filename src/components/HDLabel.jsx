import { forwardRef, memo, useState } from "react";

const HDLabel = forwardRef((props, ref)=> {

    const [visible, setVisible] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        console.info('Lable clicked!!');
    }

    const renderLabel = () => {
        if(visible) {
            return <div disabled={disabled} contentEditable={false} 
                        className="p-float-label" 
                        spellCheck={false} onClick={handleClick}>

            </div>
        }
        return <></>
    }

    return (

        renderLabel
    )
});

export default memo(HDLabel);