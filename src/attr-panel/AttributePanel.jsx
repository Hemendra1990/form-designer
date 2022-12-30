import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Fragment, useEffect, useState } from "react";
import { ProductService } from "../components/grid/ProductService";
import { CONTROL } from "../constants/Elements";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import AttrButtonComp from "./attr-button/AttrButtonComp";
import { UserService } from "../components/grid/UserService";
import AttrGrid from "./attr-grid/AttrGridComp";
import AttrInput from "./attr-input/AttrInput";
import AttrRadio from "./attr-radio/AttrRadio";
import AttrListBox from "./attr-ListBox/AttrListBox";
import { Sidebar } from "primereact/sidebar";
import ControlStyles from "../control-styles/ControlStyles";
import AttrLabel from "./attr-label/AttrLabel";
import AttrPassword from "./attr-password/AttrPassword";
import { Button } from "primereact/button";
import AttrButtonConfig from "./attr-button/AttrButtonConfig";
import AttrInputConfig from "./attr-input/AttrInputConfig";
import AttrLableConfig from "./attr-label/AttrLabelConfig";
import AttrListboxConfig from "./attr-ListBox/AttrListBoxConfig";
import AttrPasswordConfig from "./attr-password/AttrPasswordConfig";
import AttrRadioConfig from "./attr-radio/AttrRadioConfig";
import AttrGridDataMapper from "./attr-grid/AttrGridDataMapper";
import AttrTextArea from "./attr-textarea/AttrTextArea";
import AttrContainer from "./attr-container/AttrContainer";

const AttributePanel = (props) => {
  const productService = new ProductService();
  const userService = new UserService();
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDataConnectorSidebar, setShowDataConnectorSidebar] =
    useState(false);
  const [showControlStyle, setShowControlStyle] = useState(false);

  const [classNameValue, setClassNameValue] = useState(
    meta.currentElement?.attributes?.className || ""
  );

  const [showConfigure, setShowConfigure] = useState(false);
  const [showAttributs, setShowAttributs] = useState(false);
  const [showDataMapper, setShowDataMapper] = useState(false);

  const handleAttributeChange = (e) => {
    if (!meta.currentElement.attributes) {
      meta.currentElement.attributes = {};
    }
    if (e.checked !== undefined) {
      //Radio, Dropdown
      meta.currentElement.attributes[
        (e.target || e.originalEvent.target).name
      ] = e.checked;
    } else if (e.value !== undefined) {
      //Dropdowns, Autocomplete, Combobox
      meta.currentElement.attributes[
        (e.target || e.originalEvent.target).name
      ] = e.value;
    } else {
      //Other excpet above elements
      meta.currentElement.attributes[
        (e.target || e.originalEvent.target).name
      ] = (e.target || e.originalEvent.target).value;
    }
    updateMeta(meta);
    console.log(meta);
  };

  const updateClass = (e) => {
    setClassNameValue(e.target.value);
    handleAttributeChange(e);
  };

  const availableEvents = meta?.events?.map((ev) => {
    return { label: ev.name, value: ev.id };
  });

  const openControlStyle = (e) => {
    setShowControlStyle(true);
  };

  /**
   * RULES FOR RENDERING CONFIGURATION
   *  -Each event should have a name (As line:35) e.g: <InputText name="label" />
   *
   * @returns
   */
  const renderConfiguration = () => {
    if (meta && meta.currentElement) {
      /* Render Button configuration */
      if (meta.currentElement.type === CONTROL.BUTTON) {
        return (
          <AttrButtonConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents} />
        )
      }
      /* Render Input configuration */
      if (meta.currentElement.type === CONTROL.INPUT) {
        return (
          <AttrInputConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        )
      }
      /* Render Label configuration */
      if (meta.currentElement.type === CONTROL.LABEL) {
        return (
          <AttrLableConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        )
      }
      /* Render Listbox configuration */
      if (meta.currentElement.type === CONTROL.LISTBOX) {
        return (
          <AttrListboxConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        )
      }
      /* Render Password configuration */
      if (meta.currentElement.type === CONTROL.PASSWORD) {
        return (<>
          <AttrPasswordConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
            availableEvents={availableEvents}
          />
        </>
        )
      }
      /* Render Radio configuration */
      if (meta.currentElement.type === CONTROL.RADIO) {
        return (
          <AttrRadioConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
          />
        )
      }

    }
    return (
      <Fragment>
        <h1>default</h1>
      </Fragment>
    )
  }

  /**
   * RULES FOR RENDERING ATTRIBUTES
   *  -Each Attribute should have a name (As line:35) e.g: <InputText name="label" />
   *
   * @returns
   */
  const renderAttributes = () => {
    if (meta && meta.currentElement) {
      const currAttribute = meta.currentElement?.attributes;

      const classDiv = (
        <div className="field col-12">
          <label htmlFor="class" className="block">
            Class
          </label>
          <InputText
            name="className"
            placeholder="col-12 md:col-6 lg:col-3"
            value={currAttribute?.className || ""}
            style={{ width: "100%" }}
            onChange={updateClass}
          />
        </div>
      );

      /* Render Button Attributes */
      if (meta.currentElement.type === CONTROL.BUTTON) {
        return (
          <>
            <AttrButtonComp
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
            {classDiv}
          </>
        );
      }

      /* Render Input Attributes */
      if (meta.currentElement.type === CONTROL.INPUT) {
        return (
          <>
            <AttrInput
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
            {classDiv}
          </>
        );
      }

      /* Render Textarea Attributes */
      if (meta.currentElement.type === CONTROL.TEXTAREA) {
        return (
          <>
            <AttrTextArea
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              updateClass={updateClass}
            />
            {classDiv}
          </>
        );
      }
      /* Render Container Attributes */
      if (meta.currentElement.type === CONTROL.CONTAINER) {
        return (
          <>
            <AttrContainer
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              updateClass={updateClass}
            />
            {classDiv}
          </>
        );
      }
      /* Render Panel Attributes */
      if (meta.currentElement.type === CONTROL.PANEL) {
        return (
          <>
            <label>Panel Attributes</label>
            {classDiv}
          </>
        );
      }
      /* Render Fieldset Attributes */
      if (meta.currentElement.type === CONTROL.FIELDSET) {
        return (
          <>
            <label>Fieldset Attributes</label>
            {classDiv}
          </>
        );
      }
      /* Render Grid Attributes */
      if (meta.currentElement.type === CONTROL.GRID) {
        return (
          <>
            <AttrGrid
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              updateClass={updateClass}
            ></AttrGrid>
          </>
        );
      }
      /* Render Numeric Attributes */
      if (meta.currentElement.type === CONTROL.NUMERIC) {
        return (
          <>
            <div className="field col-12">
              <label htmlFor="controlId">Control ID</label>
              <InputText
                name="placeholder"
                value={meta.currentElement.id}
                disabled
              />
            </div>
            <div className="field col-12">
              <label htmlFor="maxLen">Max Length</label>
              <InputNumber
                style={{ width: "100%" }}
                name="maxLength"
                inputId="maxLen"
                onChange={handleAttributeChange}
                value={currAttribute?.maxLength}
              />
            </div>
          </>
        );
      }
      /* Render Radio attributes */
      if (meta.currentElement.type === CONTROL.RADIO) {
        return (
          <>
            <AttrRadio
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
            {classDiv}
          </>
        );
      }
      /* Render Label attributes */
      if (meta.currentElement.type === CONTROL.LABEL) {
        return (
          <>
            <AttrLabel
              meta={meta}
              currentElement={meta.currentElement}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
            {classDiv}
          </>
        );
      }

      /* Render Password Attributes */
      if (meta.currentElement.type === CONTROL.PASSWORD) {
        return (
          <Fragment>
            <AttrPassword
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              currentElement={meta.currentElement}
              availableEvents={availableEvents}
            ></AttrPassword>
            {classDiv}
          </Fragment>
        );
      }
      /* Render ListBox attributes */
      if (meta.currentElement.type === CONTROL.LISTBOX) {
        return (
          <>
            <AttrListBox
              meta={meta}
              currentElement={meta.currentElement}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
          </>
        );
      }
    }
    return <></>;
  };

  /**
   * RULES FOR RENDERING DATA SOURCE MAPPER
   *  -Each Data Source Mapper should have a name (As line:35) e.g: <InputText name="label" />
   *
   * @returns
   */
  const renderDataConnector = () => {
    if (meta || meta.currentElement) {

      /* Render Grid Data MApper */
      if (meta.currentElement.type === CONTROL.GRID) {
        return (
          <AttrGridDataMapper
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            updateClass={updateClass}
          />
        )
      }
    }
  };

  /**
   * RULES FOR STYLING CONTROL STYLE
   *
   * @returns
   */
  const getControlStyle = () => {
    if (showControlStyle) {
      return (
        <ControlStyles
          showControlStyle={showControlStyle}
          setShowControlStyle={setShowControlStyle}
        ></ControlStyles>
      );
    }

    return <></>;
  };

  const handelAttributeOptionChange = (e) => {
    const name = (e.currentTarget || e.target).name;
    switch (name) {
      case 'configure':
        setShowConfigure(true);
        setShowAttributs(false);
        setShowDataMapper(false);
        setShowSidebar(true);
        break;
      case 'attributes':
        setShowConfigure(false);
        setShowAttributs(true);
        setShowDataMapper(false);
        setShowSidebar(true);
        break;
      case 'dataMapper':
        setShowConfigure(false);
        setShowAttributs(false);
        setShowDataMapper(true);
        setShowSidebar(true);
        break;
    }
  }

  return (
    <>
      {meta.currentElement && (
        <>
          <div className="control-attr-panel">
            <button type="button" value={true}
              name="configure"
              title="Configure"
              onClick={handelAttributeOptionChange}>
              <span className="pi pi-cog"></span>
            </button>
            <button
              type="button"
              value="Attributes"
              name="attributes"
              onClick={handelAttributeOptionChange}
              title="Attributes"
            >
              <span className="pi pi-code"></span>
            </button>
            <button
              type="button"
              value="Data Mapper"
              name="dataMapper"
              title="Data Mapper"
              onClick={handelAttributeOptionChange}
            >
              <span className="pi pi-database"></span>
            </button>
            <button
              type="button"
              value="Control Style"
              title="Control Style"
              onClick={(e) => openControlStyle(e)}
            >
              <span className="pi pi-box"></span>
            </button>
          </div>
        </>
      )}
      <div className="p-fluid grid">
        <Sidebar
          dismissable={false}
          showCloseIcon={false}
          closeOnEscape={true}
          modal={false}
          position="right"
          visible={showSidebar}
          onHide={() => {
            setShowSidebar(false);
          }}
        >
          <div>
            <Button icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-text"
              aria-label="Cancel"
              style={{
                float: "right",
                width: "30px",
                height: "30px",
                marginTop: "5px"
              }} onClick={() => {
                setShowSidebar(false);
              }} />
          </div>

          <div style={{ marginTop: "25px" }}>
            {showConfigure && renderConfiguration()}
            {showAttributs && renderAttributes()}
            {showDataMapper && renderDataConnector()}
          </div>
        </Sidebar>
        {/* <Sidebar
          dismissable={false}
          showCloseIcon={false}
          closeOnEscape={true}
          modal={false}
          position="right"
          visible={showDataConnectorSidebar}
          onHide={() => {
            showDataConnectorSidebar(false);
          }}
        >
          {renderDataConnector()}
        </Sidebar> */}
      </div>
      {getControlStyle()}
    </>
  );
};

/* value={meta.currentElement?.attributes?.className} */

const testEvents = [{ label: "Execute Script", value: "script-Sc23ab3W" }];

export default AttributePanel;
