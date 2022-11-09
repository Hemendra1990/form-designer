import {defaultScriptTextForTesting} from "../App";

const EventExecutor = {
    executeEvent : (meta, eventId) => {
        //get the event detail from the eventId, we will do it later
        //Initially I am trying with Script Event
        console.log(`Executing ${eventId}`);
        scriptExecutor(meta, eventId); //We must check what event type is coming, but for testing leaving it for script only
    }
}

const scriptExecutor = (meta, scriptEventId) => {
    console.log(meta);
    const scriptFun = new Function(`
        const meta = arguments[0];
        ${meta.scriptText}
    `);
    scriptFun(meta);
}

export default EventExecutor;