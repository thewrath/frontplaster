const assert = require('assert');
const jsdom = require("jsdom");
const frontplaster = require('./frontplaster.js');

const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('FrontPlaster', function(){
    describe('Lib initialisation', function(){
        it('should pass if lib is correctly init', function(){
            var fp = new frontplaster.FrontPlaster();
            fp.init(function(){

            });

            fp.update(function(){

            });
        });
    });
});