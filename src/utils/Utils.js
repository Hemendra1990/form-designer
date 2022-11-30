export const getElement = (meta) => {
  return {};
};

export const createElementId = (prefix="", length=8) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix+result;
};

/**
 * My Billiion dollar Code...
 */
export const evaluateCellTemplate = new Function('row', 'template', `
  const evaluate = new Function('row', template);
  return evaluate(row);
`); /*eslint no-new-func: */

/**
 * Deep cloning a object supports circular dependency
 * @param {*} obj 
 * @returns 
 */
const deepClone = (obj) => {
  if(structuredClone) {
    return structuredClone(obj);
  } else {
    return deepCloneNative(obj);
  }
};

/* https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript */
const deepCloneNative = (obj, hash = new WeakMap()) => {
  if (Object(obj) !== obj) return obj; // primitives
  if (hash.has(obj)) return hash.get(obj); // cyclic reference
  const result = obj instanceof Set ? new Set(obj) // See note about this!
               : obj instanceof Map ? new Map(Array.from(obj, ([key, val]) => 
                                      [key, deepClone(val, hash)])) 
               : obj instanceof Date ? new Date(obj)
               : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
               // ... add here any specific treatment for other classes ...
               // and finally a catch-all:
               : obj.constructor ? new obj.constructor() 
               : Object.create(null);
  hash.set(obj, result);
  return Object.assign(result, ...Object.keys(obj).map(
      key => ({ [key]: deepClone(obj[key], hash) }) ));
};

/**
 * Returns the current element reference (ref.current) object
 */
export const Reference = {
  of: (meta, elementId) => {
    if(!elementId) {
      console.error(`element Id is null or undefined`)
      return null;
    }
    if(meta.elementMap) {
      const instance = meta.elementMap[elementId].ref.current
      return instance;
    }

    return null;
  }
}

/**
 * Export random UUID
 *
 * @returns {*}
 */
export function getRandomUUID() {
  return window.crypto.randomUUID();
}
