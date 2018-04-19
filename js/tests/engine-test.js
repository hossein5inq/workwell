var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var engine = require('../src/bridge/engine.js');

describe('engine', function () {
    it('createJSONFrom return a jsonObject', function () {
        var jsonObj = engine.createJSONFrom("open", "camera", {});

        expect(jsonObj.action).to.equal('open');
        expect(jsonObj.target).to.equal('camera');
        assert.isDefined(jsonObj.token, 'jsonObj.token is defined');
        assert.isDefined(jsonObj.successCallback, 'jsonObj.successCallback is defined');
        assert.isDefined(jsonObj.errorCallback, 'jsonObj.errorCallback is defined');
        assert.isDefined(jsonObj.data, "jsonObj.data is defiend");
    });

    it('createJSONFrom without a json as third argument returns undefined', function () {
        var jsonObj = engine.createJSONFrom("open", "camera", undefined);
        assert.isUndefined(jsonObj, "jsonObj is undefined");
    });
});