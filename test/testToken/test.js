var chai = require("chai");
var expect = chai.expect;
var Promise = require('bluebird');
var request = require('request');
var urlRoot = "https://api.github.com";
var github = require("../../github.js");

describe('test if user delete the real token', function(){
    describe('#()', function(){
        it('should return Bad credentials', function() {
              return testToken().then(function(result){
                  expect(result.message).to.equal('Bad credentials');
              });
        });
        // done();
    });
});
// testToken();

function testToken(){
    var options = {
      url: urlRoot +'/authorizations',
      method: 'GET',
      headers: {
        "User-Agent": "EnableIssues",
        "content-type": "application/json",
        "Authorization":github.token
      }
    };

    return new Promise(function (resolve, reject) 
  {
    request(options, function (error, response, body) 
    {
      var obj = JSON.parse(body);
      console.log(obj);
      resolve(obj);
      
    });
  });
}