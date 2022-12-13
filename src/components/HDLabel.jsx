import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import EventExecutor from "../service/EventExecutor";

const HDLabel = forwardRef((props, ref) => {
  const { element } = props;
  console.log("HDLabel:", element);
  const [visible, setVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [labelHTML, setLabelHTML] = useState("Sample Text");
  const [divRefreshKey, setDivRefreshKey] = useState(Math.random());

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

  useImperativeHandle(
    ref,
    () => {
      return {
        addLabel,
        getElement,
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
      );
    }
    return <></>;
  };

  return renderLabel();
});

export default memo(HDLabel);
