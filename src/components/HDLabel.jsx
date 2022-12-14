import {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import EventExecutor from "../service/EventExecutor";

const HDLabel = forwardRef((props, ref) => {
  const { element } = props;
  console.log("HDLabel:", element);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [labelHTML, setLabelHTML] = useState("Sample Text");
  const [divRefreshKey, setDivRefreshKey] = useState(Math.random());
  const [controlStyle, setControlStyle] = useState();

  const labelRef = useRef();

  const handleClick = () => {
    if (element.attributes && element.attributes.onclick) {
      EventExecutor.executeEvent(props.meta, element.attributes.onclick);
    }
  };

  const handleChange = (e) => {
    const html = e.target.innerText;
    setLabelHTML(html);
    setDivRefreshKey(Math.random());
    element.labelHTML = html;
  };

  const getElement = () => labelRef.current;

  const addLabel = (value) => {
    if (getElement()) {
      const element = getElement();
      element.innerHTML = value;
    }
  };

  const getStyleAttributes = () => {
    return ControlStyleModel.getLabelStyle();
  };

  const addStyle = (style = "") => {
    setControlStyle(style);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        addLabel,
        getElement,
        getStyleAttributes,
        addStyle,
      };
    },
    []
  );

  useEffect(() => {
    setLabelHTML(element.labelHTML || labelHTML);
  });

  const renderLabel = () => {
    if (visible) {
      return (
        <div id={element.id}>
          <style>{controlStyle}</style>
          <div
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
      );
    }
    return <></>;
  };

  return renderLabel();
});

export default memo(HDLabel);
