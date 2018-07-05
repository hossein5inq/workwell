import {createJSONFrom} from "./engine";
import {sendFromJS} from "./bridge";

export let title = "Title";
export let backgroundColor = "#000000";
export let textColor = "#FFFFFF";
export let begin = false;
export let dataToUpdate = {data: {}};

export function beginUpdate() {
    begin = true;
}

export function commitUpdate() {
    const jsonObj = createJSONFrom("ui", "navigationBar", this.dataToUpdate);
    sendFromJS(JSON.stringify(jsonObj));
    begin = false;
    dataToUpdate.data = {};
}

export function setBackgroundColor(color_) {
    if (begin) {
        backgroundColor = color_;
        dataToUpdate.data.backgroundColor = color_;
    }
}

export function setTextColor(color_) {
    if (begin) {
        textColor = color_;
        dataToUpdate.data.textColor = color_;
    }
}

export function setTitle(title_) {
    if (begin) {
        title = title_;
        dataToUpdate.data.title = title_;
    }
}

export function getInstance() {
    return this;
}