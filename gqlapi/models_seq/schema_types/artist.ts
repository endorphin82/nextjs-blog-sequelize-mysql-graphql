import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { AlbumType } from "./album"

export const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: GraphQLString
    },
    albums: {
      type: new GraphQLList(AlbumType),
      // resolve: ({ albums }) => Artist.findAll({ whereIn: { id: albums } })
      resolve: (parent, args, context) => parent.getAlbums()
    }
  })
})
