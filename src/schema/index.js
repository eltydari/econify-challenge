import OrganizationType from './organization';
import EventType from './event';
import LocationType from './location';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query orgs, events and locations',
    fields: {
        organization: {
            type: OrganizationType,
        },
        location: {
            type: LocationType,
        },
        event: {
            type: EventType,
        }
    }
})

const Schema = new GraphQLSchema({
    query: QueryType
})
