const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');
const organization = require('./organization');
const { getOrganization } = require('../resolvers/queries');

module.exports.EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLNonNull(GraphQLString) },
        am: { type: GraphQLNonNull(GraphQLBoolean) },
        description: { type: GraphQLString },
        organization: {
            type: organization.OrganizationType,
            resolve: getOrganization
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    })
});
