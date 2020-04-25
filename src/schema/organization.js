import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} from 'graphql';
import LocationType from './location';
import EventType from './event';

const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        locations: {
            type: GraphQLList(LocationType),
            resolve: {} //TODO
        },
        events: {
            type: GraphQLList(EventType),
            resolve: {} //TODO
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    }
});

export default OrganizationType;
