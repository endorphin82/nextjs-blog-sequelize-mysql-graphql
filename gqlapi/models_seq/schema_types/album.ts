import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { ArtistType } from "./artist"

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
    artists: {
      type: new GraphQLList(ArtistType),
      // resolve: ({ artists }) => Album.findAll({ whereIn: { id: artists } })
      // resolve: async ({ artist_id }) => await Artist.findOne({ where: { id: artist_id } })
      resolve: (parent) => parent.getArtists()
    }

  })
})