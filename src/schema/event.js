import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';
import OrganizationType from './organization';

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLNonNull(GraphQLString) },
        am: { type: GraphQLNonNull(GraphQLBoolean) },
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
