var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');

/*These values have been hardcoded for testing purposes. Update the variables accordingly*/

var token = "token " + "YOUR TOKEN";
var owner = "kulkarnisneha";
var repo= "REST_test";
var repoToBeEdited= "test_rest_apis";
var issueNumber= 2;

var urlRoot = "https://api.github.com";

// listBranches(owner, repo);
// createRepo();
// editRepo(owner, repo);
// createIssue(owner, repo);
// listReactions(owner, repo, issueNumber);



/*Function to list all the branches for a particular user under a repo*/

function listBranches(owner,repo)
{
	
	var options = {
		url: urlRoot + "/repos/" + owner + "/" + repo + "/branches",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			//console.log( obj );
			console.log("\n************LIST BRANCHES*********************");
			console.log("The branches for the owner " +owner+ " under the repo " +repo+ " are-->");
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log( name );
			}
			resolve(obj);
		});
	});
}


/*Function to create a new repo for the authenticated user*/

function createRepo()
{
	
	var options = {
		url: urlRoot + "/user/repos",
		method: 'POST',
		json: true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body : {
			name: "REPO CREATED",
			description: "This is a public repo which has been **CREATED** using the Github API",
			private: false
		},
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			
	        
	        	// Print out the issue name and description
			if(body.name==null)
			{
				// console.log("Repo already exists!!");
			}
			else
			{
				// console.log("\n************CREATE A REPO**************** ");
	   //      		console.log("Repo created! Title:: " +body.name+ "\nDescription:: " +body.description);
	    	}
	    	resolve(body);
		
		});
	});
}

/*Function to edit the repo "repo" owned by the "owner" */

function editRepo(owner, repoToBeEdited)
{
	
	var options = {
		url: urlRoot + "/repos/"+owner+"/"+repoToBeEdited,
		method: 'PATCH',
		json: true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body : {
			name: "REPO EDITED!",
			description: "This is a public repo which has been ****EDITED**** using the Github API",
			private: false
		},
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			
	        
	        	// Print out the issue name and description
				// console.log("\n************EDIT A REPO**************** ");
	   //      	console.log("Repo edited! Title:: " +body.name+ "\nDescription:: " +body.description);
	        	resolve(body);
	    	
		
		});
	});
}


/*Function to create an issue under a particular repo owned by a user */
function createIssue(owner,repo)
{
	
	var options = {
		url: urlRoot + "/repos/" + owner + "/" + repo + "/issues",
		method: 'POST',
		json: true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body : {
			title: "Issue no 2356",
			body: "This issue has been created using the Github API",
			assignee: owner
		},
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			
	        if (!error && response.statusCode == 201) {
	        	// Print out the issue name and description
				console.log("\n************CREATE AN ISSUE**************** ");
	        	console.log("Issue created! Title:: " +body.title+ "\nDescription:: " +body.body);
	        	resolve(body);
	    	}
		
		});
});
}



/*Function to list all the reactions on a given issue*/
function listReactions(owner,repo,issueNumber)
{
	
	var options = {
		// url: urlRoot+'/repos/'+owner+'/'+repo+'/issues'+'/'+number+'/'+'reactions',
		url: urlRoot + "/repos/" + owner + "/" + repo + "/issues/" + issueNumber + "/reactions",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Accept": "application/vnd.github.squirrel-girl-preview",
			"Authorization": token

		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			console.log("\n************LIST REACTIONS***********************");
			console.log("The reactions on the Issue number "+issueNumber+ " for the owner " +owner+ " under the repo " +repo+ " are-->");
			for( var i = 0; i < obj.length; i++ )
			{
				var content = obj[i].content;
				console.log( content );
			}
			resolve(obj);
		});
	});
}

exports.listBranches = listBranches;
exports.createRepo = createRepo;
exports.editRepo = editRepo;
exports.createIssue = createIssue;
exports.listReactions = listReactions;
