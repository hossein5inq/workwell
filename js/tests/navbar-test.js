var chai = require('chai');
var assert = chai.assert;
var navbar = require('../src/bridge/navbar.js');

describe('navbar', function () {
    it('should set up the title if beginUpdate was called first', function () {
        navbar.beginUpdate();
        navbar.setTitle("title");
        assert.equal(navbar.title, "title", "");
    });

    it('should not set up the title if beginUpdate was not called first', function () {
        navbar.beginUpdate();
        navbar.setTitle("");
        navbar.commitUpdate();

        navbar.setTitle("title");
        assert.equal(navbar.title, "", "");
    });

    it('should set up the background color if beginUpdate was called first', function () {
        navbar.beginUpdate();
        navbar.setBackgroundColor("#FFFFFF")
        assert.equal(navbar.backgroundColor, "#FFFFFF", "");
    });

    it('should not set up the background color if beginUpdate was not called first', function () {
        navbar.beginUpdate();
        navbar.setBackgroundColor("");
        navbar.commitUpdate();

        navbar.setBackgroundColor("#FFFFFF");
        assert.equal(navbar.title, "", "");
    });
});

