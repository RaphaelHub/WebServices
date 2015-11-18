var request = require('request');
var _ = require('lodash');
var Q = require('q');

function getGitRepositories(username) {
  var deferred = Q.defer();
	request({
		url: 'https://api.github.com/users/' + username + '/repos',
		qs: {}, // parameters if any like this  {key: 'value'}
		method: 'GET',
		headers: {
			'Accept': 'application/json',
      'User-Agent': 'Awesome-Octocat-App' // usually not required
		}
	}, function(error, response, body) {
    if(error) {
      deferred.reject(error);
    } else {
      var repos = JSON.parse(body);
      deferred.resolve(repos);
    }
  });
  return deferred.promise;
}

getGitRepositories('bernhardfritz').then(function(repos) {
    _.forEach(repos, function(repo) {
      console.log(repo.name);
    });
});
