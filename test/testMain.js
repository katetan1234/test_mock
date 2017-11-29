var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
// var request = require('request');

var github = require("../temp.js");

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
// listBranches(owner, repo);
// createRepo();
// editRepo(owner, repo);
// createIssue(owner, repo);
// listReactions(owner, repo, issueNumber);

describe('test listBranches', function(){

    var owner = "testuser";
    var repo = "Hello-World";

    describe('test ListBranches', function(){
      // TEST CASE
      var mockService = nock("https://api.github.com", {
      reqheaders: {
        "User-Agent": "EnableIssues",
        "content-type": "application/json"
      }
    })
    .matchHeader('Authorization', /[\w]+/)
    .persist() // This will persist mock interception for lifetime of program.
    .get("/repos/testuser/Hello-World/branches")///repos/:owner/:repo/branches
    .reply(200, function(uri,request){
      return JSON.stringify(data);
    });
     it('should return 1 branches', function(done) {

        github.listBranches(owner, repo).then(function (results) 
        {
          expect(results.length).to.equal(1);
          done();
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
    var regex_name = /"name"/;
      if(regex_name.test(request)){
        // console.log(request);
      }else{
        throw "the name of request cannot be null";
      }
    return JSON.stringify(repo);    
   });

  describe('test createRepo json', function(){
    // TEST CASE
    it('should return createRepo json', function(done) {

      return github.createRepo().then(function (results)
      {
        expect(results[0].id).to.equal(1296269);
        // console.log(results);

        done();

      });
    });
  });
});


describe('test createIssue', function(){
  try{
    var owner = "octocat";
    var repoName = "Hello-World";
    var mockService = nock("https://api.github.com")
    .persist()
    .matchHeader('Authorization', /[\w]+/)
    .post('/repos/'+owner+'/'+repoName+'/issues')
    .reply(201,function(uri,request) {
      var regex_name = /"title"/;
      if(regex_name.test(request)){
        // console.log(request);
      }else{
        throw "the name of request cannot be null";
      }
      return JSON.stringify(issue);
      
     });
    describe('test createIssue json', function(){
      it('should return createIssue json', function(done) {

        return github.createIssue(owner, repoName).then(function (results)
        {
          expect(results[0].title).to.equal("Found a bug");

          done();

        });
      });
    });
  } catch(e){
    console.log(e.message);
  }
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
      var regex_name = /"name"/;
      if(regex_name.test(request)){
        // console.log(request);
      }else{
        throw "the name of request cannot be null";
      }
      var regex_wiki = /"has_wiki":true/
      if(regex_wiki.test(request)){
        console.log(request);
      }else{
        throw "The request do not have the character of has_wiki or the has_wiki is not true";
      }
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
  // url: urlRoot + "/repos/" + owner + "/" + repo + "/issues/" + issueNumber + "/reactions",
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

      return github.listReactions(owner, repo, number).then(function (results)
      {
        expect(results[0].id).to.equal(1);

        done();

      });
    });
  });
});

