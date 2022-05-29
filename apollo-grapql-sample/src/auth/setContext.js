const { validateAuthToken } = require('./jwt.js');
const { ENVIRONMENT } = require('../../config/environment.js');
const { logger } = require('../helpers/logger.js');
const {AuthenticationError} = require("apollo-server-express");

/**
 * Context function from Apollo Server
 */
 const setContext = async ({ req }) => {
	const context = {
	};

	let token = req.headers['authorization'];
	let hasSuperRole = req.headers['hassuperrole']?req.headers['hassuperrole'] && req.headers['hassuperrole'] == 'true':false;
	context.hasSuperRole = hasSuperRole
	if (token && typeof token === 'string') {
		try {
			const authenticationScheme = 'Bearer ';
			if (token.startsWith(authenticationScheme)) {
				token = token.slice(authenticationScheme.length, token.length);
			}
			const user = await validateAuthToken(token);

			context.user = user; // Add to Apollo Server context the user who is doing the request if auth token is provided and it's a valid token
		} catch (error) {
console.log('error',error)
			if (process.env.ENVIRONMENT !== ENVIRONMENT.PRODUCTION) {
				logger.debug(error.message);
			}
			throw new AuthenticationError('You token is not valid.');
		}
	}
	console.log('context.hasSuperRole+++++',context.hasSuperRole)
	return context;
};

module.exports = {
	setContext: setContext
}
