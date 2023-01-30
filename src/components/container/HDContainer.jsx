import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useDrop } from "react-dnd";
import { CONTROL } from "../../constants/Elements";
import getComponent from "../../constants/HemendraConstants";
import { useMetaContext, useUpdateMetaContext } from "../../context/MetaContext";
import { useReportMetaContext, useReportUpdateMetaContext } from "../../context/ReportMetaContext";
import { HttpFormResourceService } from "../../http-service/HttpFormResourceService";
import { ItemType } from "../../model/ItemType";
import DraggableContainerElement from "../../playground/DraggableContainerElement";
import EventExecutor from "../../service/EventExecutor";
import { EventExecutorService } from "../../service/EventExecutorService";
import { createElementId, generateElementMap } from "../../utils/Utils";
import ContainerHelper from "../../_helpers/ContainerHelper";

const httpResourceService = new HttpFormResourceService();
const HDContainer = forwardRef(({ element, pgIndex, }, ref) => {

  /* const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext(); */

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateMeta } = element.isInReportContainer ? useReportUpdateMetaContext() : useUpdateMetaContext();//figured out contexts can be used conditionally

  const updateReportMeta = useReportUpdateMetaContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const meta = element.isInReportContainer ? useReportMetaContext() : useMetaContext();



  const containerElement = element;
  const helper = new ContainerHelper();

  const [containerChildren, setContainerChildren] = useState([]);
  const [controlElementHoveringOnIndex, setControlElementHoveringOnIndex] = useState(-999);

  const [resourceMeta, setResourceMeta] = useState(null);

  containerElement.attributes = containerElement.attributes || {};
  containerElement.attributes.children = containerElement.attributes.children || [];

  //New Code
  const [children, setChildren] = useState([]);

  useEffect(() => {
    setChildren(element.attributes.children || []);
  }, []);

  useEffect(() => {
    setChildren(element.attributes.children || []);
  }, [element.attributes.children]);

  useEffect(() => {
    console.log("Container children test", element);
  }, [element]);

  const [{ canDrop, isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: [ItemType.HD_ELEMENT, ItemType.HD_PG_ELEMENT],

    hover: (item, monitor) => {
      if (monitor.didDrop()) { //check if the element is dropped anywhere in pg or container
        return;
      }

      //we need to find the hover index, kaha upare hiover hauchi
      //We need to know dragIndex and hoverIndex, kahiniki kaina ame tapare meta.elements achhi seithi modify kariba


    },
    drop: (item, monitor) => {
      //check if the element is already dropped or not
      if (monitor.didDrop() && monitor.getItem().droppedLocation && monitor.getItem().droppedLocation.includes(CONTROL.CONTAINER)) {
        return;
      }

      if (item.resizingInsideContainer) {
        monitor.getItem().resizingInsideContainer = false;
        item.resizingInsideContainer = false;
        return;
      }

      if (monitor.getItemType() === ItemType.HD_ELEMENT) {
        const { controlItem } = item;
        let id = createElementId();
        id = `${controlItem.value}-${id}`
        const component = getComponent(controlItem.value);
        const element = {
          type: controlItem.value.toLowerCase(),
          name: `${id}`,
          id: id,
          component,
        };

        let foundElement = null;
        for (let obj of meta.elements) {
          foundElement = findElement(obj, containerElement.id);
          if (foundElement) {
            foundElement.attributes = foundElement.attributes || {};
            foundElement.attributes.children = foundElement.attributes.children || [];
            if (foundElement.attributes.children.length === 0) {
              foundElement.attributes.children.push({
                ...element,
                id: id,
                parentId: containerElement.id,
              });
            } else { //insert at hover index
              foundElement.attributes.children.splice(controlElementHoveringOnIndex, 0, element);
              foundElement.attributes.children = [...foundElement.attributes.children];
            }
            updateMeta(meta);
            break;
          }
        }
      } else if (monitor.getItemType() === ItemType.HD_PG_ELEMENT) {
        //hdPGElement
        const helper = new ContainerHelper();
        meta.elements = helper.updateParent(
          meta.elements,
          item.element.id,
          containerElement.id
        );

        const newObj = helper.findNodeAndParent(
          meta.elements,
          containerElement.id
        );
        console.log("New Obj", newObj);
        updateMeta(meta.elements)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }),
    [controlElementHoveringOnIndex, meta.elements]
  );

  function findElement(obj, elementId) {
    if (obj.id && obj.id === elementId) {
      return obj;
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result = findElement(child, elementId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  const moveContainerCard = useCallback(
    (dragIndex, hoverIndex, item, monitor) => {

      if (dragIndex === -1) {
        setControlElementHoveringOnIndex(hoverIndex);
        return;
      }

      if (dragIndex !== undefined && hoverIndex !== undefined) {
        console.log({ dragIndex, hoverIndex });
        const { node, parent } = helper.findNodeAndParent(meta.elements, item.element.id);
        if (node && parent.attributes['children'] && parent.attributes['children'][hoverIndex]) {//check if any element is already there at the index or not
          const children = parent.attributes['children'];
          const [draggedItem] = children.splice(dragIndex, 1);
          children.splice(hoverIndex, 0, draggedItem);
          parent.attributes['children'] = children;

          //setting another flag
          monitor.getItem().resizingInsideContainer = true;

          console.log({ parent, meta });
        }
      }
    },
    [controlElementHoveringOnIndex, setControlElementHoveringOnIndex, meta.elements]
  );

  useEffect(() => {
    if (resourceMeta) {
      setChildren(resourceMeta.elements || []);
    }
  }, [resourceMeta]);

  function initializeComponent(reportElements) {
    if (!reportElements) {
      return;
    }
    reportElements.forEach(el => {
      el.component = getComponent(el.type);
      if (el.attributes && el.attributes.children && el.attributes.children.length > 0) {
        initializeComponent(el.attributes.children);
      }
    })
  }

  function addFlagReportContainer(elements) {
    for (let ele of elements) {
      ele.isInReportContainer = true;
      if (ele.attributes && ele.attributes.children) {
        addFlagReportContainer(ele.attributes.children);
      }
    }

  }

  useImperativeHandle(ref, () => ({
    async loadReport(resourceId, data = {}) {
      //TODO: we need to make the server call taking the resourceId
      httpResourceService.getFormJson(resourceId).then(res => {
        const report = res.data

        const { json } = report
        initializeComponent(json.elements);

        const reportMeta = {};
        reportMeta.elementMap = {};
        reportMeta.resourceId = report.resourceId;
        reportMeta.sessionId = report.sessionId;
        reportMeta.description = report.description;
        reportMeta.name = report.resourceName;
        reportMeta.elements = json.elements; //Just check what elements came into it....
        const elements = [...reportMeta.elements];
        addFlagReportContainer(elements);

        reportMeta.configuration = json.configuration;
        reportMeta.sqlList = json.sqlList;
        reportMeta.apiList = json.apiList;
        reportMeta.events = json.events;
        reportMeta.elementMap = generateElementMap(reportMeta);
        //reportMeta.events.forEach((e) => initialiseScripts(e));
        reportMeta.editMode = false;
        reportMeta.sqlVariables = json.sqlVariables;
        meta.sqlVariables = json.sqlVariables; //Adding the sqlVariables to actual meta

        updateReportMeta.updateMeta(reportMeta); //Let's seee what magic is going on Here..........
        setResourceMeta(reportMeta);
        setTimeout(async () => {
          if (reportMeta.configuration) {
            if (reportMeta.configuration.beforeLoadEventId) {
              //Do not show the container untill the event is executed
              //element.hide(); //Hide the container 
              await EventExecutor.execute(reportMeta, reportMeta.configuration.beforeLoadEvent, {});
              //element.show(); //Show the container when completed
            }
            if (reportMeta.configuration.onLoadEventId) {
              await EventExecutor.execute(reportMeta, reportMeta.configuration.onLoadEvent, {});
            }
            if (reportMeta.configuration.viewInitEventId) {
              new Promise((resolve) => {
                setTimeout(() => {
                  EventExecutor.execute(reportMeta, reportMeta.configuration.onLoadEvent, {});
                  resolve(true);

                }, 100)
              })
            }
          }
        }, 10);
      }).catch(err => {
        console.error("Failed to fetch the form data from server.", err);
      });

      //This is for testing


    },
    addStyle(style = "") {
      //TODO: implementation of style
      /* code to add styles from the Style Control component */
    },
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "";
  if (isActive) {
    backgroundColor = "";
  } else if (canDrop) {
    backgroundColor = "#E4F8F0";
  }

  if (isOverCurrent) {
    backgroundColor = "#DCDCDC";
  }
  return (
    <div
      ref={drop}
      style={{
        minHeight: "100px",
        margin: "20px",
        paddingBottom: "30px",
        border: meta.editMode ? "1px dashed gray" : "",
        backgroundColor: backgroundColor,
      }}
      className="grid"
    >
      {children.map((childElement, containerIndex) => {
        childElement.currIndex = containerIndex;
        childElement.parent = element;//element means container
        return (
          <DraggableContainerElement
            {...childElement}
            key={childElement?.id}
            style={{ marginTop: 10, marginBottom: 10 }}
            element={childElement}
            pgIndex={pgIndex}
            meta={meta}
            parentId={containerElement.id}
            moveContainerCard={moveContainerCard}
            containerIndex={containerIndex}
            containerMeta={resourceMeta}
          />
        );
      })}
    </div>
  );
})

export default HDContainer;
