/*
  Filename: my_file.php
  Descr: This file provide you some useful tools to test the lib, 
  in front and back environment.
  User: Thomas LE GOFF
  Date: 08/3/2019
*/


const assert = require('assert');
const jsdom = require("jsdom");
const frontplaster = require('./frontplaster.js');
const htmlTestFile = "test/index.html";
const { window } = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

beforeEach(function() {
  return jsdom.JSDOM.fromFile(htmlTestFile)
  .then((dom) => {
    checkboxes = dom.window.document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkboxe => {
      console.log(checkboxe.state);
    });
  });
});

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
              console.log("Init function is called");
            });

            fp.update(window, function(){
                console.log("Update function is called");

            });
        });
    });
});