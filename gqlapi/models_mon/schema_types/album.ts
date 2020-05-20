import { GraphQLID, GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
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
    artists_ids: {
      type: new GraphQLList(GraphQLID)
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve: async (parent) => {
        console.log("+++parent+++", parent)
        return await Artist.find({ _id: { $in: parent.artists_ids } }, (err, docs) => {
          console.log("asdasdada", docs, err, parent.artists_ids)
        })
      }
    }
  })
})