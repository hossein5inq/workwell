var chai = require('chai');
var index = require('./../src/index.js');
var engine = require('../src/bridge/engine.js');
var bridge = require('../src/bridge/bridge.js');
var sinon = require('sinon');

describe('index', function () {
    it('should call ready method on init', function () {
        var ready = sinon.spy(index, 'ready');
        index.init();
        sinon.assert.calledOnce(ready);
    });

    it('should call createJSONFrom with {action : open} and {target : camera} when calling chooseImage', function () {
        var createJSONFrom = sinon.spy(engine, 'createJSONFrom');
        index.chooseImage();
        sinon.assert.calledOnce(createJSONFrom);
        sinon.assert.calledWith(createJSONFrom, "open", "camera", undefined);
    });

    it('should call sendFromJS with an undefined argument when calling chooseImage without a json argument', function () {
        var sendFromJS = sinon.spy(bridge, 'sendFromJS');
        index.chooseImage();
        sinon.assert.calledWith(sendFromJS, undefined);
    });
});