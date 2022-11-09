import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import getComponent from "../constants/HemendraConstants";

const ControlPanel = (props) => {
  /**
   * Add Element to the Playground
   *
   * @param  event
   */
  const addElement = (event) => {
    const id = createElementId();
    if (!props.meta.elements) {
      props.meta.elements = [];
    }
    const component = getComponent(event.target.name);
    const element = {
      type: event.target.name.toLowerCase(),
      name: `${event.target.name}-${id}`,
      id: id,
      component,
    };
    props.setMeta((prevValue) => {
      prevValue.elements.push(element);
      return {
        ...prevValue,
      };
    });
  };

  /**
   * Clear the Palyground
   */
  const clearAll = () => {
    props.setMeta((prevValue) => {
      prevValue.elements.length = 0;
      return {
        ...prevValue,
      };
    });
  };

  return (
    <>
      <Fieldset legend="Controls">
      <div className="grid">
        <div className="col-1">
          <Button name="textarea" onClick={addElement}>
            TextArea
          </Button>
        </div>
        <div className="col-1">
          <Button name="input" onClick={addElement}>
            Input
          </Button>
        </div>
        <div className="col-1">
          <Button name="button" onClick={addElement}>
            Button
          </Button>
        </div>
        <div className="col-1">
          <Button name="clear" className="p-button-danger" onClick={clearAll}>
            Clear Fields
          </Button>
        </div>
      </div>
      </Fieldset>
      
    </>
  );
};

function createElementId() {
  let length = 8;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default ControlPanel;
