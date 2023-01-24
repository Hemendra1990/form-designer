import {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from "../service/EventExecutor";

const HDLabel = forwardRef((props, ref) => {
  const { element } = props;
  const meta = useMetaContext();

  console.log("HDLabel:", element);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [labelHTML, setLabelHTML] = useState("Sample Text");
  const [divRefreshKey, setDivRefreshKey] = useState(Math.random());
  const [controlStyle, setControlStyle] = useState("");
  const [isRefInitialize, setRefInitialize] = useState(false);

  const labelRef = useRef();
  const [showHideFlag, setShowHideFlag] = useState(true);

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }

  const handleClick = (event) => {
    if (element.attributes && element.attributes.onclick) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(props.meta, element.attributes.onclick);
    }
  };

  const handleChange = (e) => {
    const html = e.target.innerText;
    setLabelHTML(html);
    setDivRefreshKey(Math.random());
    element.labelHTML = html;
  };

  const operations = {
    getElement() {
      return labelRef.current
    },

    addLabel(value) {
      if (this.getElement()) {
        const element = this.getElement();
        element.innerHTML = value;
      }
    },

    getStyleAttributes() {
      return ControlStyleModel.getLabelStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },
    showHide
  }

  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations;
  });

  useEffect(() => {
    setLabelHTML(element.labelHTML || labelHTML);
    //Apply style if the element already has
    if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
      if (element.style) {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }
    }
  }, [isRefInitialize]);

  const renderLabel = () => {
    if (visible) {
      return (
        <>
          <style>{controlStyle}</style>
          <div id={element.id}>
            <div
              style={showHideFlag ? { display: 'block' } : { display: 'none' }}
              key={divRefreshKey}
              ref={labelRef}
              disabled={disabled}
              contentEditable={element.attributes.contentEditable}
              className="p-float-label"
              spellCheck={false}
              onClick={handleClick}
              onBlur={handleChange}
              dangerouslySetInnerHTML={{ __html: labelHTML }}
            ></div>
          </div>
        </>
      );
    }
    return <></>;
  };

  return renderLabel();
});

export default memo(HDLabel);
