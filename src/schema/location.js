import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat
} from 'graphql';
import OrganizationType from './organization';
import { getOrganization } from '../resolver'

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        longitude: { type: GraphQLNonNull(GraphQLFloat) },
        latitude: { type: GraphQLNonNull(GraphQLFloat) },
        organization: {
            type: OrganizationType,
            resolve: getOrganization
        },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt:  { type: GraphQLNonNull(GraphQLString) }
    })
})

export default LocationType;
