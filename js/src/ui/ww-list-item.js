var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils.js");
var Velocity = require("velocity-animate");
var events = require("./events");

function listItem(title_, subtitle_) {
    var id = '_' + Math.random().toString(36).substr(2, 14);
    var element = this;
    var defaultClass = "ww-list-item";
    var os = utils.getMobileOperatingSystem();
    var li = document.createElement("li");
    var title = title_ ? title_ : "";
    var subtitle = subtitle_ ? subtitle_ : "";
    var titleDiv = undefined;
    var subtitleDiv = undefined;
    var leftDiv = undefined;
    var thumbnailImg = undefined;
    var rightDiv = undefined;
    var labelDiv = undefined;
    var labelColor = "#bebebe";
    var badgeSpan = undefined;
    var currentBadgeClass = undefined;
    var icon = undefined;
    var currentIconClass = undefined;
    var centerDiv = document.createElement("div");
    this.isTappable = false;
    this.isChecked = false;
    this.isCheckable = false;
    this.isSelectable = false;
    this.parent = null;
    var switchComponent = undefined;

    li.onAttached = function () {
        for (var i = 0; i < li.childNodes.length; i++) {
            if (li.childNodes[i].hasOwnProperty("onAttached")) {
                li.childNodes[i].onAttached();
            }
        }
    };

    centerDiv.onAttached = function () {
        for (var i = 0; i < centerDiv.childNodes.length; i++) {
            if (centerDiv.childNodes[i].hasOwnProperty("onAttached")) {
                centerDiv.childNodes[i].onAttached();
            }
        }
    };

    uiUtils.addClass(centerDiv, "ww-list-item__center");
    li.appendChild(centerDiv);

    if (title_) {
        titleDiv = document.createElement("div");
        uiUtils.addClass(titleDiv, "ww-list-item__title");
        titleDiv.innerHTML = title_;
        centerDiv.appendChild(titleDiv);
        if (subtitle_) {
            subtitleDiv = document.createElement("div");
            uiUtils.addClass(subtitleDiv, "ww-list-item__subtitle");
            subtitleDiv.innerHTML = subtitle_;
            centerDiv.appendChild(subtitleDiv);
        }
    }

    var type = "default";
    var badge = 0;
    var value = undefined;
    var label = "";

    uiUtils.addClass(li, defaultClass);

    this.addClass = function (className) {
        uiUtils.addClass(li, className);
    };

    this.getId = function () {
        return id;
    };

    this.getValue = function () {
        return value;
    };

    this.getLabel = function () {
        return label;
    };

    this.getTitle = function () {
        return title;
    };

    this.getSubtitle = function () {
        return subtitle;
    };

    this.setId = function (id_) {
        id = id_;
        li.id = id_;
    };

    this.onClick = function (fn) {
        li.addEventListener("click", function () {
            fn(element);
        });
    };

    this.setIcon = function (iconClass) {
        if (!rightDiv) {
            rightDiv = document.createElement("div");
            uiUtils.addClass(rightDiv, "ww-list-item__right");
            if (titleDiv && subtitleDiv) {
                rightDiv.style.maxHeight = "inherit";
            }
            li.appendChild(rightDiv);
        }
        if (!icon) {
            icon = document.createElement("i");
            uiUtils.addClass(icon, "ww-list-item__icon");

            rightDiv.appendChild(icon);
        }
        if (currentIconClass) {
            uiUtils.removeClass(icon, currentIconClass);
        }
        currentIconClass = iconClass;
        uiUtils.addClass(icon, iconClass);
    };

    var onTouchStart = function () {
        var computedStyle = window.getComputedStyle(li, null);
        var tab = computedStyle["border-color"].split("(")[1].split(")")[0].split(",");
        var borderColorAsHex = uiUtils.fullColorHex(parseInt(tab[0]), parseInt(tab[1]), parseInt(tab[2]));

        Velocity(
            li,
            {
                backgroundColor: "#" + borderColorAsHex
            },
            {
                duration: 200,
                easing: "ease-out-expo"
            }
        );
    };

    var onTouchEnd = function () {
        Velocity(li, 'stop');
        Velocity(
            li,
            {
                backgroundColor: "#FFFFFF"
            },
            {
                duration: 180,
                easing: "ease-out-expo"
            }
        );
    };

    this.setTappable = function (tappable_) {
        if (this.isTappable && !tappable_) {
            // remove tappable
            //uiUtils.removeClass(li, "ww-list-item--tappable");
            li.removeEventListener('touchstart', onTouchStart);
            li.removeEventListener('touchend', onTouchEnd);
        } else if (!this.isTappable && tappable_) {
            // add tappable
            //uiUtils.addClass(li, "ww-list-item--tappable");
            li.addEventListener('touchstart', onTouchStart);
            li.addEventListener('touchend', onTouchEnd);
        }
    };

    this.setTitle = function (title_) {
        if (title_ && title_.trim() != "") {
            title = title_;
            if (!titleDiv) {
                titleDiv = document.createElement("div");
                uiUtils.addClass(titleDiv, "ww-list-item__title");
                centerDiv.appendChild(titleDiv);
            }
            titleDiv.innerHTML = title_;
        }
    };

    this.setSubtitle = function (subtitle_) {
        if (subtitle_ && subtitle_.trim() != "") {
            subtitle = subtitle_;
            if (!subtitleDiv) {
                subtitleDiv = document.createElement("div");
                uiUtils.addClass(subtitleDiv, "ww-list-item__subtitle");
                centerDiv.appendChild(subtitleDiv);
            }
            subtitleDiv.innerHTML = subtitle_;
        }
    };

    this.setThumbnail = function (src) {
        if (src && src.trim() != "") {
            if (!leftDiv) {
                leftDiv = document.createElement("div");
                uiUtils.addClass(leftDiv, "ww-list-item__left");
            }
            if (!thumbnailImg) {
                thumbnailImg = document.createElement("img");
                uiUtils.addClass(thumbnailImg, "ww-list-item__thumbnail");
                leftDiv.appendChild(thumbnailImg);
                li.appendChild(leftDiv);
            }
            thumbnailImg.src = src;
        }
    };

    this.setBadgeValue = function (value) {
        if (badgeSpan) {
            badgeSpan.innerHTML = "<span>" + value + "</span>";
        }
    };

    this.setLabel = function (label_) {
        label = label_;
        if (!rightDiv) {
            rightDiv = document.createElement("div");
            uiUtils.addClass(rightDiv, "ww-list-item__right");
            if (titleDiv && subtitleDiv) {
                rightDiv.style.maxHeight = "inherit";
            }
            li.appendChild(rightDiv);
        }
        if (!labelDiv) {
            labelDiv = document.createElement("div");
            uiUtils.addClass(labelDiv, "ww-list-item__label");
            if (badgeSpan) {
                uiUtils.insertBefore(labelDiv, badgeSpan);
            } else if (icon) {
                //rightDiv.appendChild(labelDiv);
                uiUtils.insertBefore(labelDiv, icon);
            } else {
                rightDiv.appendChild(labelDiv);
            }
        }
        labelDiv.style.color = labelColor;
        labelDiv.innerHTML = label_;
    };

    this.setLabelColor = function (labelColor_) {
        if (labelColor_ == "default") {
            labelColor = "#bebebe";
        } else {
            labelColor = labelColor_;
        }

        if (labelDiv) {
            labelDiv.style.color = labelColor;
        }
    };

    this.setBadge = function (badgeClass) {
        if (!rightDiv) {
            rightDiv = document.createElement("div");
            uiUtils.addClass(rightDiv, "ww-list-item__right");
            li.appendChild(rightDiv);
        }
        if (!badgeSpan) {
            badgeSpan = document.createElement("span");
            if (icon) {
                uiUtils.insertBefore(badgeSpan, icon);
            } else {
                rightDiv.appendChild(badgeSpan);
            }
            if (badgeClass == "badge-default")
                badgeSpan.innerHTML = "<span>0</span>";
        }
        if (currentBadgeClass) {
            uiUtils.removeClass(badgeSpan, currentBadgeClass);
        }
        currentBadgeClass = badgeClass;
        uiUtils.addClass(badgeSpan, badgeClass);
    };

    this.removeIcon = function () {
        if (icon) {
            rightDiv.removeChild(icon);
        }
        icon = undefined;
    };

    this.setCheckable = function (isCheckable) {
        if (isCheckable)
            this.setTappable(true);

        if (isCheckable) {
            this.setIcon("icon-check-off");
            this.onClick(function func_(el) {
                if (el.isChecked) {
                    el.uncheck();
                } else {
                    el.check();
                }
            });
        } else {
            if (this.isCheckable) {
                // if it was previously set as a checkable list item
                this.removeIcon();
                //removeEventListener(func_);
            }
        }

        this.isCheckable = isCheckable;
    };

    this.setSelectable = function (isSelectable) {
        if (isSelectable)
            this.setTappable(true);

        if (isSelectable) {
            this.setIcon("icon-select-off");
            this.onClick(function func_(el) {
                el.parent.removeSelectedItem();
                el.select();
            });
        } else {
            if (this.isSelectable) {
                // if it was previously set as a settable list item
                this.removeIcon();
                //removeEventListener(func_);
            }
        }

        this.isSelectable = isSelectable;
    };

    this.setSwitch = function (switchComponent_) {
        switchComponent = switchComponent_;
        if (!rightDiv) {
            rightDiv = document.createElement("div");
            uiUtils.addClass(rightDiv, "ww-list-item__right");
            li.appendChild(rightDiv);
        }
        rightDiv.innerHTML = "";
        rightDiv.appendChild(switchComponent_.toHTMLElement());
    };

    this.select = function () {
        this.parent.setSelectedItem(this);
        this.isSelected = true;
        this.removeIcon();
        this.setIcon("icon-select");
    };

    this.unselect = function () {
        this.isSelected = false;
        this.removeIcon();
        this.setIcon("icon-select-off");
    };

    this.check = function () {
        this.isChecked = true;
        this.removeIcon();
        this.setIcon("icon-check");
    };

    this.uncheck = function () {
        this.isChecked = false;
        this.removeIcon();
        this.setIcon("icon-check-off");
    };

    this.isSwitchedOn = function () {
        if (switchComponent) {
            return switchComponent.isOn();
        }
        return false;
    };

    this.setInput = function (type_, target) {
        //this.setTappable(true);
        type = "input-" + type_;
        var input = document.createElement("input");
        input.type = type_;

        if (type_ === "number")
            input.pattern = "\\d*";

        input.style.maxWidth = screen.width / 2 - 20 + "px";
        var hiddenSpan = document.createElement("span");
        document.body.appendChild(hiddenSpan);

        if (target === "label") {
            uiUtils.addClass(hiddenSpan, "ww-fake-span-input-label");
            uiUtils.addClass(input, "ww-list-item-input-label");
            hiddenSpan.textContent = label;
            input.value = label;
            input.style.width = hiddenSpan.offsetWidth + 1 + "px";
            if (!rightDiv) {
                this.setLabel(label);
            }
            rightDiv.innerHTML = "";
            rightDiv.appendChild(input);
        } else if (target === "title") {
            uiUtils.addClass(hiddenSpan, "ww-fake-span-input-title");
            uiUtils.addClass(input, "ww-list-item-input-title");
            hiddenSpan.textContent = title;
            input.value = title;
            input.style.width = hiddenSpan.offsetWidth + 1 + "px";
            titleDiv.innerHTML = "";
            titleDiv.appendChild(input);
        }
        else {
            console.error("The target '" + target + "' is invalid. Be sure to pick between 'label' and 'title'.");
        }

        this.onClick(function (el_) {
            // wherever you click on the listItem, it should focus on the input
            input.focus();
        });

        input.addEventListener("input", function (e) {
            // To automatically resize the width of the input (for better UI/UX)
            hiddenSpan.textContent = input.value;
            input.style.width = hiddenSpan.offsetWidth + 1 + "px";
            if (target === "label")
                label = input.value;
            else if (target === "title")
                title = input.value;
        });
    };

    this.addToCenter = function (el) {
        centerDiv.appendChild(el.toHTMLElement());
    };

    // json obj may contain 'target', 'options', 'selectedIndex'
    this.attachSelectElement = function (obj) {
        this.setTappable(true);
        var hiddenSelect = document.createElement("select");

        if (label && ((obj && obj.selectedIndex !== 'undefined') || !obj)) {
            var option = document.createElement("option");
            option.text = label;
            hiddenSelect.add(option);
        }

        if (obj && obj.options) {
            for (var i = 0; i < obj.options.length; i++) {
                var option = document.createElement("option");
                option.text = obj.options[i].value;
                if (obj.selectedIndex !== 'undefined' && obj.selectedIndex === i) {
                    element.setLabel(obj.options[i].value);
                    option.selected = true;
                }
                hiddenSelect.add(option);
            }
        }

        document.body.appendChild(hiddenSelect);
        uiUtils.addClass(hiddenSelect, "ww-fake-hidden-select");

        hiddenSelect.addEventListener("change", function (e) {
            if (obj && obj.target === "label") {
                element.setLabel(this.value);
            } else if (obj && obj.target === "title") {
                element.setTitle(this.value);
            }

            if (obj && obj.onChange) {
                obj.onChange(obj.options[this.selectedIndex]);
            }
        });

        this.onClick(function (el_) {
            events.triggerMouseDown(hiddenSelect);
        });
    };

    this.toHTMLElement = function () {
        return li;
    };
}

module.exports = listItem;