import {createJSONFrom} from "./engine";
import {sendFromJS} from "./bridge";

export function chooseImage(obj) {
    const jsonObj = createJSONFrom("ui", "chooseImage", obj);
    sendFromJS(JSON.stringify(jsonObj));
}