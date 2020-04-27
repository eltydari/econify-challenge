import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GraphQLString } from 'graphql';
import OrganizationType from './organization';
import EventType from './event';
import LocationType from './location';
import { 
    getOrganization,
    getLocation,
    getEvent
} from '../resolvers/queries';

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

const schema = new GraphQLSchema({
    query: QueryType
});

export default schema;
