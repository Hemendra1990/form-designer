import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Fragment, useEffect, useState } from "react";
import { ProductService } from "../components/grid/ProductService";
import { CONTROL } from "../constants/Elements";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import AttrButtonComp from "./attr-button/AttrButtonComp";
import { UserService } from "../components/grid/UserService";
import AttrGrid from "./attr-grid/AttrGridComp";
import AttrInput from "./attr-input/AttrInput";
import AttrRadio from "./attr-radio/AttrRadio";
import { Sidebar } from "primereact/sidebar";
import ControlStyles from "../control-styles/ControlStyles";
import AttrLabel from "./attr-label/AttrLabel";
import AttrPassword from "./attr-password/AttrPassword";
import { Button } from "primereact/button";
import AttrButtonConfig from "./attr-button/AttrButtonConfig";
import AttrInputConfig from "./attr-input/AttrInputConfig";
import AttrLableConfig from "./attr-label/AttrLabelConfig";
import AttrPasswordConfig from "./attr-password/AttrPasswordConfig";
import AttrRadioConfig from "./attr-radio/AttrRadioConfig";
import AttrTextArea from "./attr-textarea/AttrTextArea";
import AttrContainer from "./attr-container/AttrContainer";
import AttrDropDown from "./attr-dropdown/AttrDropDown";
import AttrNumeric from "./attr-numeric/AttrNumeric";
import AttrNumericConfig from "./attr-numeric/AttrNumericConfig";
import AttrDropDownConfig from "./attr-dropdown/AttrDropDownConfig";
import AttrDataConnector from "./data-connector/AttrDataConnector";
import AttrAutoComplete from "./attr-autocomplete/AttrAutoComplete";
import AttrAutoCompleteConfig from "./attr-autocomplete/AttrAutoCompleteConfig";
import AttrMultiSelect from "./attr-multiselect/AttrMultiSelect";
import AttrMultiSelectConfig from "./attr-multiselect/AttrMultiSelectConfig";
import AttrListboxConfig from "./attr-ListBox/AttrListBoxConfig";
import AttrListBox from "./attr-ListBox/AttrListBox";

const AttributePanel = (props) => {
  const productService = new ProductService();
  const userService = new UserService();
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const [showSidebar, setShowSidebar] = useState(false);

  useState(false);
  const [showControlStyle, setShowControlStyle] = useState(false);

  const [classNameValue, setClassNameValue] = useState(
    meta.currentElement?.attributes?.className || ""
  );

  const [showConfigure, setShowConfigure] = useState(false);
  const [showAttributs, setShowAttributs] = useState(false);
  const [showDataMapper, setShowDataMapper] = useState(false);
  const [colValue, setColValue] = useState(4);

  const handleAttributeChange = (e) => {
    if (!meta.currentElement.attributes) {
      meta.currentElement.attributes = {};
    }
    if (e.checked !== undefined) {
      //Radio, Dropdowl
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
    setClassNameValue((e.target || e.originalEvent.target).value);
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
            eventOptions={availableEvents}
          />
        );
      }
      /* Render Input configuration */
      if (meta.currentElement.type === CONTROL.INPUT) {
        return (
          <AttrInputConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        );
      }
      /* Render Label configuration */
      if (meta.currentElement.type === CONTROL.LABEL) {
        return (
          <AttrLableConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        );
      }
      /* Render Listbox configuration */
      if (meta.currentElement.type === CONTROL.LISTBOX) {
        return (
          <AttrListboxConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        );
      }
      /* Render Numeric configuration */
      if (meta.currentElement.type === CONTROL.NUMERIC) {
        return (
          <AttrNumericConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
            eventOptions={availableEvents}
          />
        );
      }
      /* Render Password configuration */
      if (meta.currentElement.type === CONTROL.PASSWORD) {
        return (
          <>
            <AttrPasswordConfig
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              currentElement={meta.currentElement}
              availableEvents={availableEvents}
            />
          </>
        );
      }
      /* Render Radio configuration */
      if (meta.currentElement.type === CONTROL.RADIO) {
        return (
          <AttrRadioConfig
            meta={meta}
            eventOptions={availableEvents}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
          />
        );
      }
      /* Render DropDown configuration */
      if (meta.currentElement.type === CONTROL.DROPDOWN) {
        return (
          <AttrDropDownConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
            eventOptions={availableEvents}
          />
        );
      }
      /* Render DropDown configuration */
      if (meta.currentElement.type === CONTROL.AUTOCOMPLETE) {
        return (
          <AttrAutoCompleteConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            currentElement={meta.currentElement}
            availableEvents={availableEvents}
          />
        );
      }

      /* Render MultiSelect configuration */
      if (meta.currentElement.type === CONTROL.MULTISELECT) {
        return (
          <AttrMultiSelectConfig
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            eventOptions={availableEvents}
          />
        );
      }
    }
    return (
      <Fragment>
        <h1>default</h1>
      </Fragment>
    );
  };

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
            Width ( col-{currAttribute.classNameSlider || 4} )
          </label>
          <InputText
            name="className"
            placeholder="col-12 md:col-6 lg:col-3"
            value={currAttribute?.className || ""}
            style={{ width: "100%" }}
            onChange={updateClass}
          />
          <Slider
            name="classNameSlider"
            value={currAttribute.classNameSlider || 4}
            className="mt-3"
            onChange={(e) => {
              setColValue(e.value);
              if (!currAttribute) {
                currAttribute = {};
              }
              currAttribute.classNameSlider = e.value;
              currAttribute.className = 'col-' + colValue;
              updateClass(e);
            }}
            min={1}
            max={12}
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
            <AttrNumeric
              meta={meta}
              currentElement={meta.currentElement}
              handleAttributeChange={handleAttributeChange}
              eventOptions={availableEvents}
            />
            {classDiv}
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
              updateClass={updateClass}
              eventOptions={availableEvents}
            />
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
              updateClass={updateClass}
              eventOptions={availableEvents}
            />
          </>
        );
      }
      /* Render DropDown attributes */
      if (meta.currentElement.type === CONTROL.DROPDOWN) {
        return (
          <>
            <AttrDropDown
              meta={meta}
              currentElement={meta.currentElement}
              handleAttributeChange={handleAttributeChange}
              updateClass={updateClass}
              eventOptions={availableEvents}
            />
          </>
        );
      }

      /* Render Auto complete attributes */
      if (meta.currentElement.type === CONTROL.AUTOCOMPLETE) {
        return (
          <>
            <AttrAutoComplete
              meta={meta}
              handleAttributeChange={handleAttributeChange}
              currentElement={meta.currentElement}
              availableEvents={availableEvents}
            />
            {classDiv}
          </>
        );
      }
      /* Render Multiselect attributes */
      if (meta.currentElement.type === CONTROL.MULTISELECT) {
        return (
          <>
            <AttrMultiSelect
              meta={meta}
              currentElement={meta.currentElement}
              handleAttributeChange={handleAttributeChange}
              updateClass={updateClass}
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
      if (
        meta.currentElement.type === CONTROL.GRID ||
        meta.currentElement.type === CONTROL.LISTBOX ||
        meta.currentElement.type === CONTROL.DROPDOWN ||
        meta.currentElement.type === CONTROL.RADIO ||
        meta.currentElement.type === CONTROL.AUTOCOMPLETE ||
        meta.currentElement.type === CONTROL.MULTISELECT
      ) {
        return (
          <AttrDataConnector
            meta={meta}
            handleAttributeChange={handleAttributeChange}
            updateClass={updateClass}
          />
        );
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
      case "configure":
        setShowConfigure(true);
        setShowAttributs(false);
        setShowDataMapper(false);
        setShowSidebar(true);
        break;
      case "attributes":
        setShowConfigure(false);
        setShowAttributs(true);
        setShowDataMapper(false);
        setShowSidebar(true);
        break;
      case "dataMapper":
        setShowConfigure(false);
        setShowAttributs(false);
        setShowDataMapper(true);
        setShowSidebar(true);
        break;
    }
  };

  return (
    <>
      {meta.currentElement && (
        <>
          <div className="control-attr-panel">
            <button
              type="button"
              value={true}
              name="configure"
              title="Configure"
              onClick={handelAttributeOptionChange}
            >
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
      <Sidebar
        dismissable={false}
        showCloseIcon={false}
        closeOnEscape={true}
        modal={false}
        position="right"
        visible={showSidebar}
        height="85vh"
        onHide={() => {
          setShowSidebar(false);
        }}
      >
        <div className="attribute-panel-slidebar">
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-text"
            aria-label="Cancel"
            style={{
              float: "right",
              width: "30px",
              height: "30px",
              marginTop: "5px",
            }}
            onClick={() => {
              setShowSidebar(false);
            }}
          />

          <div style={{ height: '70vh', overflowY: "scroll" }} className="col-12">
            {showConfigure && renderConfiguration()}
            {showAttributs && renderAttributes()}
            {showDataMapper && renderDataConnector()}
          </div>
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
      {getControlStyle()}
    </>
  );
};

/* value={meta.currentElement?.attributes?.className} */

const testEvents = [{ label: "Execute Script", value: "script-Sc23ab3W" }];

export default AttributePanel;
