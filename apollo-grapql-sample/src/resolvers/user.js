const models = require("../models");
const {UserInputError, ValidationError} = require("apollo-server-errors");
const {authValidations} = require("../auth/authAclValidations.js");
const {Op, QueryTypes} = require("sequelize");
require("dotenv").config({path: "../.env"});
const {gql} = require("apollo-server");
const {GraphQLJSON, GraphQLJSONObject} = require('graphql-type-json');


const userResolvers = {
    Query: {
        /**
         * Get User List
         * @param {*} root 
         * @param {*} args 
         * @param {*} context 
         * @returns (string)JSON
         */
        async getUserList(root, args, context) {
            const {pagination, sort, orderBy, search} = args;
            await authValidations.ensureThatUserIsLogged(context);

            let limit = pagination ? pagination.items : 10;
            let page = pagination ? pagination.page : 1;
            const offset = limit * (page - 1);
            let query = {}
            if (pagination) {
                query.limit = limit;
                query.offset = offset
            }
            if (sort) {
                query.order = [
                    [sort, orderBy],
                ];
            }
            if (search) {
                query.where = {
                    [Op.or]: [
                        models.Sequelize.where(models.Sequelize.fn('concat', models.Sequelize.col('firstName'), ' ', models.Sequelize.col('lastName')), {
                            [Op.like]: '%' + (search.trim()) + '%'
                        })
                    ]
                }
            }
           
            query.include = [
                {
                    model: models.UserRole,
                    as: "UserRoles",
                    where: {
                        roleId: {
                            [Op.in]: roleFilters
                        }
                    },
                    include: {
                        model: models.Role,
                        as: "Role",
                    }
                }
            ]

            let users = await models.User.findAll(query)
            if (pagination) {
                delete query.limit
                delete query.offset
            }

            let usersCount = await models.User.count(query)
            const totalPages = Math.ceil(usersCount / limit);
            const paginationResponse = {
                totalRecords: usersCount,
                totalPages: totalPages,
                page: page
            };
            return {
                users: users,
                pagination: paginationResponse
            }

        },
    },
    Mutation: {
    },
};

const usertypeDef = gql`
    
    ### TYPES #####
    type UserList {
        users: [UserObj]
        pagination: PaginationResponse
    }
    type PaginationResponse {
        totalRecords: Int
        totalPages: Int
        page: Int
    }
    type UserObj {
        id: Int
        firstName: String
        lastName: String
        email: String
        createdAt: String
    }
  
    
    ### QUERIES #####
    extend type Query {
        getUserList(
            search: String
            pagination: Pagination
            sort: String
            sortOrder: SortOrder
        ): UserList,
     
    }
`;

module.exports = {userResolvers, usertypeDef};
