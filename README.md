## ANGULAR Login module 

### This app contains all the basic setup you need to create a login application  pairs with a spring boot login rest usable in any cross platfrom  .

Architecture is designed in such a way that you wont have to  think about security and  configuration any more . 

To create a new end point just place your end point informtaion on the app.js file

	.state('state', {
	      url: '/url',
	      data: {requireLogin: false}, // if the page you created will require login or will not 
	      params : {role: null}, // you can pass in state params if you want and they can be json objects also 
	      views: {
	        '': {templateUrl: 'components/views/templates/main.tpl.html'},
	        'header@landing': {templateUrl: 'components/views/templates/header.tpl.html'},
	        'body@landing': {templateUrl: 'components/views/homeView.html'},
	        'footer@landing': {templateUrl: 'components/views/templates/footer.tpl.html'}
	      }   // view part you can use this one or can change in accords with you choosing 
	    })

 Most of the cases for login related cases are well handled . I newer version will come soon with full login module 

- **npm start** (will start the local web server on localhost:8000)

Above commands are defined in the **package.json** configuration file in the root of the project. Check it out to understand what is exactly executed once above commands are run.


### Contributing to the project

All feedback and suggested improvements are very welcome. You can always [create an issue](https://github.com/noman57/login.git) for this repositary or issue a pull request.

### Authors
MD Abdullah Al Noman 
Dhaka , Bangladesh 