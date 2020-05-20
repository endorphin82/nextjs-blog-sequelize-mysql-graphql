import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { Album } from "../albums"
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
      resolve: ({ id }) => Album.find({ artist_id:  id  }, (err, docs) => {
        console.log(docs)
      })
    }
  })
})