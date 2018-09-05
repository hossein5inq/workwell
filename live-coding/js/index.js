const Workwell = require("workwell");
const $ = require("jquery");
const ace = require("brace");
const helper = require("./helper");
require('brace/mode/javascript');
require('brace/mode/html');
require('brace/theme/monokai');
require('brace/theme/twilight');
require('brace/theme/xcode');

let os = "ios";
let mode = "html";
let uiComponent = undefined;
let jsEditor = undefined;
let htmlEditor = undefined;

function toggleOSView_HTML(os_, value) {
    mode = "html";
    os = os_;
    Workwell.setOS(os_);
    $("#mobile-container").html(value);
    Workwell.ui.format();
}

function toggleOSView_JS(os_, value, fn) {
    $("#mobile-container").html("");
    mode = "js";
    $("#mobile-container").removeClass("body-"+os);
    os = os_;
    Workwell.setOS(os_);
    $("#mobile-container").addClass("body-"+os_);
    eval(value);
    if (fn) {
        fn($("#mobile-container")[0].outerHTML);
    }
}

function showNavMenu(el, ev) {
    if (el.parent().has("ul")) {
        if (ev)
            ev.preventDefault();
    }

    if (!el.hasClass("open")) {
        // hide any open menus and remove all other classes
        $("#nav li ul").slideUp(350);
        $("#nav li a").removeClass("open");

        // open our new menu and add the open class
        el.parent().find("ul").slideDown(350);
        el.addClass("open");
    } else if (el.hasClass("open")) {
        el.removeClass("open");
        el.parent().find("ul").slideUp(350);
    }
}

function showMainComponent(el) {
    if(el){
        $("#main-component-container").hide();

        var href = el.attr("href");
        uiComponent = href.substr(1, href.length);
        $.get("distribution/js-templates/" + uiComponent + ".template.js", function (template) {
            jsEditor.setValue(template);
            jsEditor.clearSelection();
            toggleOSView_JS(os, template, function (html) {
                htmlEditor.setValue(helper.processToHTML(html));
                htmlEditor.clearSelection();
            });
        }).then(function (res) {
            $("#main-component-container").css("display", "flex");
        });
    } else {
        $("#main-component-container").css("display", "flex");
    }
}

$(document).ready(function () {
    console.log("ready");

    var locationHref = window.location.href;
    var tab = locationHref.split("/");
    if (tab.length > 1) {
        if(tab[tab.length - 1].indexOf("#") !== -1){
            var el = $("a[href='" + tab[tab.length - 1] + "'");
            var elHeader = el.parent().parent().parent().find("a[class='nav-header']");
            showNavMenu(elHeader);
            showMainComponent(el);
        } else {
            showMainComponent();
        }
    }

    htmlEditor = ace.edit("html-editor");
    htmlEditor.setTheme('ace/theme/xcode');
    htmlEditor.getSession().setMode('ace/mode/html');
    htmlEditor.$blockScrolling = Infinity;

    jsEditor = ace.edit("js-editor");
    jsEditor.setTheme('ace/theme/twilight');
    jsEditor.getSession().setMode('ace/mode/javascript');
    jsEditor.$blockScrolling = Infinity;

    $("#html-run").click(function () {
        toggleOSView_HTML(os, htmlEditor.getValue());
    });

    $("#js-run").click(function () {
        toggleOSView_JS(os, jsEditor.getValue(), function (html) {
            htmlEditor.setValue(helper.processToHTML(html));
            htmlEditor.clearSelection();
        });
    });

    $("#android-picker").click(function () {
        $("#ios-picker").removeAttr("selected");
        $("#os-pick-name").html("Android");
        $(this).attr("selected", "");
        if (mode === "html") {
            toggleOSView_HTML("android", htmlEditor.getValue());
        } else {
            toggleOSView_JS("android", jsEditor.getValue());
        }
    });

    $("#ios-picker").click(function () {
        $("#android-picker").removeAttr("selected");
        $("#os-pick-name").html("iOS");
        $(this).attr("selected", "");
        if (mode === "html") {
            toggleOSView_HTML("ios", htmlEditor.getValue());
        } else {
            toggleOSView_JS("ios", jsEditor.getValue());
        }
    });

    $("#nav li .nav-header").on("click", function (e) {
        showNavMenu($(this), e);
    });

    $("#nav li .nav-item").on("click", function (e) {
        showMainComponent($(this));
    });

});