
const jsonwebtoken = require('jsonwebtoken')
const { securityVariablesConfig } = require('../../config/config.js');

/**
 * Create a new JSON Web Token
 * @param {Object} 		userData 			- Payload object
 * @param {string} 		userData.email 		- Payload data: User email
 * @param {string} 		secret 				- Secret or private key
 * @param {string} 		[expirationTime] 	- Time of token expiration. Default value '2h'
 * @returns	{string}						- Json Web Token
 */
 const createAuthToken = ({ username, reference, isImpersonateAdmin = 0, superAdminId = null }, secret, expirationTime = '2h') => {
	return jsonwebtoken.sign({ username, reference, isImpersonateAdmin, superAdminId }, secret, { expiresIn: expirationTime });
};

/**
 * Validate an existing JSON Web Token and retrieve data from payload
 * @param {string} token - A token
 * @returns {Object}       - User data retrieved from payload
 */
 const validateAuthToken = async (token) => {
	return await jsonwebtoken.verify(token, securityVariablesConfig.secret)
};

const decodeJwtToken = async (token) => {
	return await jsonwebtoken.decode(token);
};

module.exports = {
	createAuthToken: createAuthToken,
	validateAuthToken: validateAuthToken,
	decodeJwtToken: decodeJwtToken
}
