import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { ArtistType } from "./artist"
import { Artist } from "../artists"

export const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    year: {
      type: GraphQLString
    },
    artist_id: {
      type: GraphQLID
    },
    artist: {
      type: ArtistType,
      resolve: async ({ artist_id }) => await Artist.findById(artist_id)
    }
  })
})