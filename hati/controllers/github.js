var request = require('request');
var _ = require('lodash');

function getGitRepositories(username, callback) {
	request({
		url: 'https://api.github.com/users/' + username + '/repos',
		qs: {}, // parameters if any like this  {key: 'value'}
		method: 'GET',
		headers: {
			'Accept': 'application/json',
      'User-Agent': 'Awesome-Octocat-App' // usually not required
		}
	}, callback);
}

getGitRepositories('bernhardfritz', function(error, response, body) {
	if(error) {
		console.log(error);
	} else {
    var repos = JSON.parse(body);
    _.forEach(repos, function(repo) {
      console.log(repo.name);
    })
	}
});
