var _ = require('lodash');
const { userResolvers, usertypeDef } = require('./user.js');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const { SortOrders } = require('../constants/constant.js');

// If you had Query fields not associated with a
// specific type you could put them here
const SortOrdersEnum = SortOrders.join(' ');

const schema = `
    ####SCALARS####
    scalar JSON
    scalar JSONObject

    ### ENUMS #####
    enum SortOrder {
        ${SortOrdersEnum}
    }

    ### INPUTS #####
    input Pagination {
        page: Int
        items: Int
    }
    
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Status {
        message: String!
    }
`;

const resolvers = _.merge(
    userResolvers
);
const typeDefs = [
    schema,
    usertypeDef
];

module.exports = {resolvers, typeDefs};
