var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
// var request = require('request');

var github = require("../github.js");

// Load mock data
var data = require("./branch.json")
var repo = require("./createRepo.json")
var issue = require("./createIssue.json")
var reaction = require("./reaction.json")
var token = "token " + "YOUR TOKEN";
var urlRoot = "https://api.github.com";

///////////////////////////
// TEST SUITE FOR MOCHA
///////////////////////////

// describe('test if user delete the real token', function(){
//     describe('#()', function(){
//         it('should return Bad credentials', function(done) {
//               testToken().then(function(results){
//                   expect(results.message).to.equal('Bad credentials');
//               });
//         });
//     });
// });

describe('test listBranches', function(){

  // MOCK SERVICE
  var mockService = nock("https://api.github.com")
  .matchHeader('Authorization', /[\w]+/)
  .persist() // This will persist mock interception for lifetime of program.
  .get("/repos/testuser/Hello-World/branches")///repos/:owner/:repo/branches
  .reply(200, JSON.stringify(data) );

  describe('test istBranches return json', function(){
    // TEST CASE
   	it('should return 1 branches', function(done) {

      github.listBranches("testuser", "Hello-World").then(function (results) 
      {
        expect(results.length).to.equal(1);
        done();
      });
    });

    // TEST CASE...
    it('the first branch should be branch1', function() {
      return github.listBranches("testuser", "Hello-World").then(function (results) 
      {
        expect(results[0].name).to.equal("master");
      });
    });
  });
});

describe('test createRepo', function(){

  // MOCK SERVICE
  var name = "Hello-World";
  var description = "This your first repo!";
  var mockService = nock("https://api.github.com")
  .persist()
  .matchHeader('Authorization', /[\w]+/)
  .post("/user/repos")
  .reply(200,function(uri,request) { // the request name cannot be null
    if(request.name === null)
      return "error";
    else
      return JSON.stringify(repo);
   });

  describe('test createRepo json', function(){
    // TEST CASE
    it('should return createRepo json', function(done) {

      return github.createRepo("Hello-World", "This your first repo!").then(function (results)
      {
        expect(results[0].id).to.equal(1296269);
        // console.log(results);

        done();

      });
    });
  });
});


describe('test createIssue', function(){
  var owner = "octocat";
  var repoName = "Hello-World";
  var mockService = nock("https://api.github.com")
  .persist()
  .matchHeader('Authorization', /[\w]+/)
  .post('/repos/'+owner+'/'+repoName+'/issues')
  .reply(200,function(uri,request) {
    if(request.title === null)
      return "error";
    else
      return JSON.stringify(issue);
   });

  describe('test createIssue json', function(){
    // TEST CASE
    it('should return createIssue json', function(done) {

      return github.createIssue(owner, repoName).then(function (results)
      {
        expect(results[0].title).to.equal("Found a bug");
        // console.log(results);

        done();

      });
    });
  });
});

describe('test editRepo', function(){

  // MOCK SERVICE
  var owner = "octocat";
  var repoName = "Hello-World";
  var mockService = nock("https://api.github.com")
  .persist()
  .matchHeader('Authorization', /[\w]+/)
  .patch('/repos/'+owner+'/'+repoName)
  .reply(200,function(uri,request) {
    if(request.name === null)
      return "error";
    else
      return JSON.stringify(repo);
   });

  describe('test return json', function(){
    it('test result json id', function(done) {

      return github.editRepo(owner, repoName).then(function (results)
      {
        expect(results[0].id).to.equal(1296269);

        done();

      });
    });
  });
});

describe('test listReaction', function(){
  var owner = "octocat";
  var repo = "Hello-World";
  var number = 1;
  var mockService = nock("https://api.github.com")
  .persist()
  .matchHeader('Authorization', /[\w]+/)
  .get('/repos/'+owner+'/'+repo+'/issues'+'/'+number+'/'+'reactions')
  .reply(200, JSON.stringify(reaction));

  describe('test the return json', function(){
    // TEST CASE
    it('test the id', function(done) {

      return github.listReaction(owner, repo, number).then(function (results)
      {
        expect(results[0].id).to.equal(1);

        done();

      });
    });
  });
});

// function testToken(){
//     var options = {
//       url: urlRoot +'/authorizations',
//       method: 'GET',
//       headers: {
//         "User-Agent": "EnableIssues",
//         "content-type": "application/json",
//         "Authorization":github.token
//       }
//     };

//     return new Promise(function (resolve, reject) 
//   {
//     request(options, function (error, response, body) 
//     {
//       var obj = JSON.parse(body);
//       console.log(obj);
//       resolve(obj);
      
//     });
//   });
// }