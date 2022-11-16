import { ListBox } from "primereact/listbox";
import { CONTROL_ITEMS } from "../constants/Elements";
import getComponent from "../constants/HemendraConstants";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { createElementId } from "../utils/Utils";

const ControlPanel = () => {
  const meta = useMetaContext();
  const {addElement} = useUpdateMetaContext();

  /**
   * Add Element to the Playground
   *
   * @param  event
   */
  const handleElementClick = (event) => {
    const id = createElementId();
    if (!meta.elements) {
      meta.elements = [];
    }
    const component = getComponent(event.value);
    const element = {
      type: event.value.toLowerCase(),
      name: `${event.value}-${id}`,
      id: `${event.value}-${id}`,
      component,
    };

    addElement(element);
  };

  return (
    <>
      <ListBox options={CONTROL_ITEMS()} onChange={handleElementClick} />
    </>
  );
};

export default ControlPanel;
