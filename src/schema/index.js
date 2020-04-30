const { 
    GraphQLObjectType, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');
const { OrganizationType } = require('./organization');
const { EventType } =  require('./event');
const { LocationType } = require('./location');
const queries = require('../resolvers/queries');
const mutators = require('../resolvers/mutators');

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query orgs, events and locations',
    fields: () => ({
        organization: {
            type: OrganizationType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: queries.getOrganization
        },
        location: {
            type: LocationType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: queries.getLocation
        },
        event: {
            type: EventType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: queries.getEvent
        }
    })
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation of orgs and events',
    fields: () => ({
        addEvent: {
            type: EventType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
                time: { type: GraphQLNonNull(GraphQLString) },
                am: { type: GraphQLNonNull(GraphQLBoolean) },
                organization: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString }
            },
            resolve: mutators.addEvent
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                organization: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: mutators.addLocation
        },
        updateEvent: {
            type: EventType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLString },
                time: { type: GraphQLString },
                am: { type: GraphQLBoolean },
                organization: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve: mutators.updateEvent
        },
        updateLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                organization: { type: GraphQLString },
            },
            resolve: mutators.updateLocation
        },
        deleteEvent: {
            type: EventType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: mutators.deleteEvent
        },
        deleteLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: mutators.deleteLocation
        }
    })
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

module.exports = schema;
