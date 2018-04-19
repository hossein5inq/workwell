var chai = require('chai');
var expect = chai.expect;
var auth = require('../src/bridge/auth.js');

describe('auth', function () {
    it('verifying the request token function and the number of retries', function () {
        auth.setRequestTokenFunction(function test(callback) {

        });
        expect(auth.tryNb).to.equal(0);
        auth.requestToken();
        expect(auth.tryNb).to.equal(1);
        auth.requestToken();
        expect(auth.tryNb).to.equal(2);
        auth.requestToken();
        auth.requestToken();
        auth.requestToken();
        auth.requestToken();
        expect(auth.tryNb).to.equal(0);
    });

    it('resetTries sets the number of tries at 0', function () {
        auth.setRequestTokenFunction(function test(callback) {

        });
        expect(auth.tryNb).to.equal(0);
        auth.requestToken();
        expect(auth.tryNb).to.equal(1);
        auth.resetTries();
        expect(auth.tryNb).to.equal(0);
    });
});