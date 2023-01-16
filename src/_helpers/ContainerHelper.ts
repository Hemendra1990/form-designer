export default class ContainerHelper {
  IsParentDropedOnChildren(dropedEle:any ,newParentId:string){
    if(dropedEle && dropedEle.attributes && dropedEle.attributes.children && dropedEle.attributes?.children.length!==0)
    {
      if(dropedEle.attributes?.children.find((f:any)=>f.id===newParentId)!==undefined )
      {
        return true;
      }
      else
      {
        if(Array.isArray(dropedEle.attributes?.children))
        {
          let result:any=false;
          for(var i=0; i<dropedEle.attributes?.children.length;i++)
          {
            result =this.IsParentDropedOnChildren(Object.assign({},dropedEle.attributes?.children[i]) ,newParentId);
            if(result)
            {
              return result;
            }
          }

        
        }else{
          this.IsParentDropedOnChildren(Object.assign({},dropedEle.attributes?.children) ,newParentId);
        }
        
      }
      
    }
    else{
      return false
    }

  }
  updateParent(elements: Array<any>, elementId: string, newParentId: string) {
    console.log('Before Updation', elements);
    const result = this.findNodeAndParent([...elements], elementId);
    console.log(result);

    if(result) {
      const {node, parent} = result;
      //if droped element drop in itself
      if(newParentId === node.id)
      {
        return elements;
      }
      
      if(node && node.attributes?.children &&  this.IsParentDropedOnChildren(node,newParentId))
      {
        return elements;
      }
      //remove the node from the current parent
      if(parent && parent.attributes && parent.attributes.children) {
        parent.attributes.children = parent.attributes.children.filter((child: any) => child.id !== elementId); 
      }
      //remove from play ground
      if(!parent )
      {
        let indexOfElement=elements.findIndex(ele=> ele.id===elementId);
        if(indexOfElement!==undefined && indexOfElement>-1)
        {
          elements.splice(indexOfElement,1);
        }
        // elements=elements.splice(elements.indexOf(elements.find(f=>f.id===node.id)),1)
      }

      const newParentContainer = this.findNodeAndParent([...elements], newParentId)
      //After removing add to the new Parent
      if(newParentContainer.node) {
        newParentContainer.node.attributes = newParentContainer.node.attributes || {};
        newParentContainer.node.attributes.children = newParentContainer.node.attributes.children || [];
        newParentContainer.node.attributes.children.push(node);        
      }
    }
    console.log('After Updation', elements);
    return elements;

    /* let isElementFound = false;
    for (let obj of elements) {
      const result = this.findElementIfPresent2(obj, elementId);
      if(result) {
        isElementFound = true;
        element = result.element;
        parent = result.parent;
        break;
      }
    }

    if(isElementFound) {
      if(parent && parent.attributes) {
        parent.attributes.children.push(element);
      }

      //delete from elment's old parent
      
    } */

    /* if (isElementFound) {
      if (parent) {
        parent.attributes.children = parent.attributes.children.filter(
          (child: any) => child.id !== elementId
        );
      }
      const newParent = this.findElementById(elements, newParentId);
      if (newParent) {
        newParent.attributes.children = newParent.children || [];
        newParent.attributes.children.push(element);
      }
    } */
  }

  findElementFromPgElements(elements: Array<any>, elementId: string) {
    let foundElement = null;
    for (let obj of elements) {
      foundElement = this.findElement(obj, elementId);
      if (foundElement) {
        break;
      }
    }
    return foundElement;
  }

  findElement(obj: any, elementId: string) {
    if (obj.id && obj.id === elementId) {
      return obj;
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result: any = this.findElement(child, elementId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  /* findElementIfPresent(obj: any, elementId: string, element: Object, parent: object) {
    if (obj.id === elementId) {
      element = obj;
      return true;
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        if (this.findElementIfPresent(child, elementId, element, parent)) {
          parent = obj;
          console.log(`Found element and parent`, {element, parent});
          
          return true;
        }
      }
    }
    return false;
  } */

  findElementIfPresent(obj: any, elementId: any) {
    if (obj.id === elementId) {
      return {
          element: obj,
          parent: null
      };
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result: any = this.findElementIfPresent(child, elementId);
        if (result) {
          result.parent = obj;
          return result;
        }
      }
    }
    return null;
  }

  findElementById(obj: any, elementId: string) {
    if (obj.id === elementId) {
      return obj;
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result: any = this.findElementById(child, elementId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  findElementIfPresent2(obj: any, elementId: string) {
    if (obj.id === elementId) {
      return {
          element: obj,
          parent: null
      };
    }
    if (obj.attributes && obj.attributes.children) {
      for (let child of obj.attributes.children) {
        const result: any = this.findElementIfPresent2(child, elementId);
        if (result) {
          result.parent = obj;
          return result;
        }
      }
    }
    return null;
  }

  findNodeAndParent(tree: any, id: string) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        return { node: tree[i], parent: null };
      }
      let result = this.search(tree[i], id);
      if (result) {
        return result;
      }
    }
    return { node: null, parent: null };
  }
  
  search(node: any, id: string) {
    if (!node || !node.attributes) {
      return null;
    }
    let children = node.attributes.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i] && children[i].id === id) {
        return { node: children[i], parent: node };
      }
      let result: any = this.search(children[i], id);
      if (result) {
        return result;
      }
    }
    return null;
  }
}
