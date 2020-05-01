const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');
const location = require('./location');
const event = require('./event');
const { getLocations, getEvents } = require('../resolvers/queries');

module.exports.OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        locations: {
            type: GraphQLList(location.LocationType),
            resolve: getLocations
        },
        events: {
            type: GraphQLList(event.EventType),
            resolve: getEvents
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    })
});

