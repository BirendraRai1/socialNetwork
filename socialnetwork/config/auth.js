// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '144211986381259', // your App ID
		'clientSecret' 	: '0dd162084a964fb65edea1f0e6842e63', // your App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},
	'googleAuth' : {
		'clientID' 		: '508188972228-1nfrnkadhn3n50r3u49fpncu9carp8or.apps.googleusercontent.com',
		'clientSecret' 	: 'C35DXDqQZAwLKMmpPhPNsY6t',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

};