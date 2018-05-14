var engine = require("./engine.js");
var bridge = require("./bridge.js");

/**
 * @type {{
 *  title: string,
 *  backgroundColor: string,
 *  textColor: string,
 *  begin: boolean,
 *  beginUpdate: module.exports.beginUpdate,
 *  commitUpdate: module.exports.commitUpdate,
 *  getInstance: module.exports.getInstance,
 *  setBackgroundColor: module.exports.setBackgroundColor,
 *  setTextColor: module.exports.setTextColor,
 *  setTitle: module.exports.setTitle
 * }}
 */
module.exports = {
    title: "Title",
    backgroundColor: "#000000",
    textcolor: "#FFFFFF",
    begin: false,
    dataToUpdate: {data: {}},
    /**
     * This function tells the object that you can now update it (before committing).
     */
    beginUpdate: function () {
        this.begin = true;
    },
    /**
     * This function tells the app to update the navigation bar (with everything that has been changed since 'beginUpdate' was called).
     * @example
     * var navbar = Workwell.getNavBar();
     * navbar.beginUpdate();
     * navbar.setTitle("a title");
     * navbar.setBackgroundColor("#CACACA");
     * navbar.commitUpdate();
     */
    commitUpdate: function () {
        var jsonObj = engine.createJSONFrom("ui", "navigationBar", this.dataToUpdate);
        bridge.sendFromJS(JSON.stringify(jsonObj));
        this.begin = false;
        this.dataToUpdate.data = {};
    },
    getInstance: function () {
        return this;
    },
    /**
     * This function sets the background color of the native navigation bar.
     * @param {string} color
     */
    setBackgroundColor: function (color) {
        if (this.begin) {
            this.backgroundColor = color;
            this.dataToUpdate.data.backgroundColor = color;
        }
    },
    /**
     * This function sets the text color of the native navigation bar.
     * @param {string} color
     */
    setTextColor: function (color) {
        if (this.begin) {
            this.textColor = color;
            this.dataToUpdate.data.textColor = color;
        }
    },
    /**
     * This function sets the title of the native navigation bar.
     * @param {string} title
     */
    setTitle: function (title) {
        if (this.begin) {
            this.title = title;
            this.dataToUpdate.data.title = title;
        }
    }
};