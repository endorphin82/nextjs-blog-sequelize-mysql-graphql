import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { Album } from "../albums"
import { AlbumType } from "./album"
import { Artist } from "../artists"

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
      resolve: (parent, args ) => {
        console.log("---parent---args", parent,"---+---", args)
        return Album.find({ artists_ids: parent._id })
      }
    }
  })
})