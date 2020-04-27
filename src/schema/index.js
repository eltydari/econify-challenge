import { 
    GraphQLObjectType, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';
import OrganizationType from './organization';
import EventType from './event';
import LocationType from './location';
import { 
    getOrganization,
    getLocation,
    getEvent
} from '../resolvers/queries';
import { addEvent } from '../resolvers/mutators';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query orgs, events and locations',
    fields: () => ({
        organization: {
            type: OrganizationType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: getOrganization
        },
        location: {
            type: LocationType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: getLocation
        },
        event: {
            type: EventType,
            args: {
                name: { type: GraphQLString }
            },
            resolve: getEvent
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
            resolve: addEvent
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                organization: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: () => {}
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
            resolve: () => {}
        },
        updateLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                organization: { type: GraphQLString },
            },
            resolve: () => {}
        },
        deleteEvent: {
            type: EventType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: () => {}
        },
        deleteLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: () => {}
        }
    })
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default schema;
