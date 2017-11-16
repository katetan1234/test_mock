var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var token = "token " + "YOUR TOKEN";
var urlRoot = "https://api.github.com";



function listBranches(owner,repo)
{
	var options = {
		url: urlRoot +'/repos/' + owner +'/'+repo + "/branches",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};
	//console.log(options);
	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			// console.log(obj);
			resolve(obj);
		});
	});

}

function getRepos(userName)
{
	var options = {
		url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var repos = JSON.parse(body);
			resolve(repos);
		});
	});
}

function getIssues(owner, repo )
{
	var options = {
		url: urlRoot + "/repos/" + owner +"/" + repo + "/issues",
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			// resolve(obj);
			// for( var i = 0; i < obj.length; i++ )
			// {
			// 	var name = obj[i].assignee;
			// 	console.log( name );
			// }
			resolve(obj);
		});
	});
}

function getAnIssue(owner, repo, number )
{
	var options = {
		url: urlRoot + "/repos/" + owner +"/" + repo + "/issues/"+number,
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			resolve(obj);
		});
	});
}

function createRepo(name, description)
{
	var options = {
		url: urlRoot+'/user/repos',
		method: 'POST',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		json: {
			"name": name,
			"description": description,
			"has_issues": "true"
		}
	};

	return new Promise(function (resolve, reject) 
	{
		// Send a http request to url and specify a callback that will be called upon its return.
		
		request(options, function (error, response, body) 
		{
			
			resolve(response.body);
		});
	});
}

function createIssue(owner, repo)
{
	var options = {
		url: urlRoot+'/repos/'+owner+'/'+repo+'/issues',
		method: 'POST',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		json: {
			
			"title":"record a thing",
			"body":"hello world",
			
			"labels": [
		  	  "bug"
					  ]
		}
	};
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			// console.log(response.body);
			resolve(response.body);
			
		});
	});

}
function editRepo(owner, repo)
{
	var options = {
		url: urlRoot+'/repos/'+owner+'/'+repo,
		method: 'PATCH',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		json: {
			"name":repo,
			"has_wiki":true
		}
	};
	
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			resolve(response.body);
			
		});
	});

}

function listReaction(owner, repo, number)
{
	var options = {
		url: urlRoot+'/repos/'+owner+'/'+repo+'/issues'+'/'+number+'/'+'reactions',
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};
	
	return new Promise(function (resolve, reject) 
	{
		request(options, function (error, response, body) 
		{
			var obj = JSON.parse(body);
			resolve(obj);
			
		});
	});

}

exports.token = token;
exports.getRepos = getRepos;
exports.getIssues = getIssues;
exports.getAnIssue = getAnIssue;
exports.listBranches = listBranches;
exports.createRepo = createRepo;
exports.createIssue = createIssue;
exports.editRepo = editRepo;
exports.listReaction = listReaction;
