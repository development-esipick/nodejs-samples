
const { AuthenticationError, ForbiddenError, ValidationError }  = require('apollo-server-express');
const models = require('../models')
const _ = require("lodash");
const { roles } = require('../constants/constant.js');
const {Op} = require("sequelize");
const UserRoles = roles
/**
 * Auth validations repository
 * @typedef {Object}
 */
 const authAclValidations = {

	/**
	 * Check if in Apollo Server context contains a logged user. If user is not in context, it throws an error
	 * @param {Object} context 			- The context object of Apollo Server
	 * @param {Object} [context.user]  	- The context object data: user data
	 */
	ensureThatUserIsLogged: async (context) => {
		if (!context.user) {
			throw new AuthenticationError('You must be logged in to perform this action');
		}
		return await authAclValidations.getUser(context)
	},

	/**
	 * Check if in Apollo Server context contains an user and is an administrator. If user is not in context or user is not an administrator it throws an error
	 * @param {Object} context 					- The context object of Apollo Server
	 * @param {Object} [context.user]  			- The context object data: user data
	 * @param {boolean} [context.user.isAdmin] 	- The context object data: user data role information
	 */
	ensureThatUserIsSuperAdmin: async (context) => {
		const user = await authAclValidations.getUser(context)

		const isAdmin =  _.includes(_.map(user.UserRoles, 'roleId'),UserRoles.SUPER_ADMIN)

		if(!isAdmin){
			throw new AuthenticationError('You smust be an administrator to perform this action');
		}else {
			return true
		}
	},
	
	/**
	 * Uses the information in the Apollo Server context to retrieve the user's data from the database. If user does not exist, it throws an error.
	 * @async
	 * @param {Object} context 				- The context object of Apollo Server
	 * @param {Object} [context.user]  		- The context object data: user data
	 * @returns {User}
	 */
	getUser: async (context) => {
		if (!context.user) {
			return null;
		}
		const id = context.user.reference || null;
		const user = await models.User.findOne({
			where: {
				[Op.or]: [
					{id: id}
				]
			},
			attributes: {
				exclude: ['password']
			},
			include: {
				model: models.UserRole,
				as: "UserRoles",

				include: {
					model: models.Role,
					as: "Role"
				}
			}})

		if (!user) {
			throw new AuthenticationError('You must be logged in to perform this action');
		}
		return user;
	},
};

module.exports = {
	authValidations: authAclValidations
}
