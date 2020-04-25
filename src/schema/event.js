import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import OrganizationType from './organization';

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        organization: {
            type: OrganizationType,
            resolve: {}//TODO
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    }
});

export default EventType;
