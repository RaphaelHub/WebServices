# WebServices
The aim of this seminar (PS) is to further explore the topics discussed in the Web Services lectures by answering questions and solving problems directly related to distributed architectures and Web services.

----
## outdooractive API
To try out our outdooractive API interface open up your console and go to /controllers. Then type: `node outdooractive.js`

A list of easy routes around Innsbruck should appear in your terminal.

outdooractive.js includes functions that allow to easily do requests.

In general here is an example request:

```javascript
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
	}, callback); // *)
}

getGitRepositories('bernhardfritz', function(error, response, body) {
	if(error) {
		console.log(error);
	} else {
		var repos = JSON.parse(body);
		_.forEach(repos, function(repo) {
			console.log(repo.name);
		});
	}
});
```
Note: Here we use a callback function. You could also use an inline function at comment *) but then it is not that easy to get the body back out of the function. You would have to use closures to do that. In this case it's better to use callbacks instead, as demonstrated above. You can try this example at `/controllers/github.js`


## hati
To start server, open your terminal, go to hati directory and type: `node server.js`

To view the main page, open your browser and go to `localhost:8080`

When working with `npm`, please always use `--save` suffix when downloading packages. E.g: `npm install lodash --save`

Programming rules:
- Always use single quotes for strings

  ```javascript
  var s = 'Hello World!';
  ```
- Use double quotes for strings containing single quotes and vise-versa

  ```javascript
  var s = "Alice likes Bob's car";
  ```

  ```javascript
  var s = 'Simon says, "Clap your hands!"';
  ```
- Use lowerCamelCase for variables and functions

  ```javascript
  var thisIsAnExample = 42;
  var ThisIsNotAnExample = 42;

  function thisIsAnExample() {
  	return 42;
  }

  function ThisIsNotAnExample() {
  	return 42;
  }
    ```
- Use semi-colons even if you don't need them in JavaScript

### poemarket code reference
Use the code from poemarket as guidance. poemarket is currently hosted on [openshift](https://www.openshift.com/) at [poemarket.tk](http://poemarket.tk/). Its purpose was giving the [Path of Exile](http://www.pathofexile.com/) players a platform to host shops and making trading orbs much easier.

Note: If you want to execute server.js it will only work if you have a [MongoDB](https://www.mongodb.org/) server running.

### About openshift
Openshift allows you to host (for example) node.js projects for free. You just have to follow some guidelines (use specific ports and so on...) and it is as simple as pushing the node.js project onto their git repository and it will be hosted automatically.

## Preparation
- Install [Atom](https://atom.io)
- Install [Node.js](https://nodejs.org/en/)
- Open your terminal and type:

  `mkdir ~/nodeschool`
- Get familiar with:
  - Javascript (mandatory)

    `npm install -g javascripting`

    `mkdir ~/nodeschool/javascripting`

    `cd ~/nodeschool/javascripting`

    `javascripting`
  - Node.js (highly recommended)

    `npm install -g learnyounode`

    `mkdir ~/nodeschool/learnyounode`

    `cd ~/nodeschool/learnyounode`

    `learnyounode`
  - ExpressJS (optional)

    `npm install -g expressworks`

    `mkdir ~/nodeschool/expressworks`

    `cd ~/nodeschool/expressworks`

    `expressworks`
- Read about [Jade Template Engine](http://jade-lang.com/) (recommended)

- More information:
    - [nodeschool.io](http://nodeschool.io/)
    - [Javascript API]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
    - [Node.js API](https://nodejs.org/api/)
    - [ExpressJS API](http://expressjs.com/api.html)
