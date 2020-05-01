const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat
} = require('graphql');
const organization = require('./organization');
const { getOrganization } = require('../resolvers/queries');

module.exports.LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        longitude: { type: GraphQLNonNull(GraphQLFloat) },
        latitude: { type: GraphQLNonNull(GraphQLFloat) },
        organization: {
            type: organization.OrganizationType,
            resolve: getOrganization
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    })
});
