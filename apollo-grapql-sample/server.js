require("dotenv").config({path: "./.env"});
const { createApolloPlugin } = require("@appsignal/apollo-server");

const { UserInputError } = require('apollo-server-errors');
const {setContext} = require('./src/auth/setContext.js')
const cors = require('cors')
const { logger, endLogger } = require('./src/helpers/logger.js')
var _ = require('lodash');
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled }= require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express')
const jwt =  require('jsonwebtoken')
require('dotenv').config()
const { JWT_SECRET, PORT } = process.env
const express = require('express');
const {resolvers, typeDefs} = require('./src/resolvers/index');
const app = express();
const myPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext) {
        if(requestContext.request.variables){
            console.log('requestContext.request.variables-----',requestContext.request.variables)
        }
        return {
            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            async parsingDidStart() {
                console.log('Parsing started!');
            },
            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            async validationDidStart() {
                console.log('Validation started!');
            },
        }
    },
};

let apolloServer = null;
async function startServer() {
    apolloServer =  new ApolloServer({
        typeDefs,
        resolvers,
        context: setContext,
        formatError (error) {
            if ( !(error.originalError instanceof UserInputError) ) {
                logger.error(error.message);
            }
            return error;
        },
        introspection: process.env.NODE_ENV && process.env.NODE_ENV == 'production'? false:true,
        playground:true,
        plugins: [createApolloPlugin(appsignal),myPlugin],
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app,path: '/' });
}
startServer();


app.listen({ port: PORT || 8080 }, function () {
    console.log(`server running on port 4000`);

    console.log(`gql path is ${apolloServer.graphqlPath}`);
});


// Manage application shutdown
process.on('SIGINT', () => {
    logger.info('Stopping application...')
    endLogger();
    process.exit();
});
