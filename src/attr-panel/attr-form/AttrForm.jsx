import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar';


function FormFieldEditOptions({ hideSideBar, meta, currAttribute }) {

    return (
        <Sidebar visible position="bottom" onHide={() => hideSideBar()}>
            Content
        </Sidebar>
    )
}

const AttrForm = (props) => {
    const meta = props.meta;
    const { eventOptions, handleAttributeChange } = props;
    const currAttribute = meta?.currentElement?.attributes;

    const [showEditSideBar, setShowEditSideBar] = useState(false);

    const editOptionSidebarProps = {
        hideSideBar: () => {
            setShowEditSideBar(false);
        },
        meta,
        currAttribute
    }

    return (
        <>
            <div className="field col-12">
                <label htmlFor="controlId" className="block">Control ID</label>
                <InputText
                    style={{ width: '100%' }}
                    name="placeholder"
                    value={meta.currentElement.id}
                    disabled
                />
            </div>
            <div className="field col-12">
                <Button
                    style={{ width: '100%' }}
                    label="Edit Fields"
                    onClick={(e) => setShowEditSideBar(true)}
                />
            </div>
            {showEditSideBar && <FormFieldEditOptions {...editOptionSidebarProps} ></FormFieldEditOptions>}
        </>
    )
}

export default AttrForm