import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} from 'graphql';
import LocationType from './location';
import EventType from './event';
import { getLocations, getEvents } from '../resolver'

const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        locations: {
            type: GraphQLList(LocationType),
            resolve: getLocations
        },
        events: {
            type: GraphQLList(EventType),
            resolve: getEvents
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    })
});

export default OrganizationType;
