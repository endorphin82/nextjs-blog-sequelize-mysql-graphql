// import { gql } from "apollo-server-micro"
import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } from "graphql"
import { Album } from "./models/albums"

const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The id of the Album."
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the Album."
    },
    year: {
      type: GraphQLString,
      description: "The year of the Album."
    },
    artist_id: {
      type: GraphQLInt,
      description: "The artist_id of the Album."
    }
  }
})

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The id of the Artist."
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the Artist."
    },
    url: {
      type: GraphQLString,
      description: "The url of the Artist."
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: async ({ albums }, args) => {
        return await Album.findAll({ whereIn: { artist_id: albums } })
      }
    }
  }
})


// categories: {
//   type: new GraphQLList(CategoryType),
//   resolve({ categories }, args) {
//     return Categories.find({ _id: { $in: categories } }, (err, docs) => {
//       console.log(docs)
//     })
//   },
// },

/*
export const typeDefs = gql`
    type Query {
        albums: [Album]
        album(id: ID!): Album
        artists: [Artist]
        artist(id: ID!): Artist
    }

    type Mutation {
        createAlbum(name: String!, year: String, artist_id: ID): Album
        createArtist(name: String!, url: String): Artist
        updateAlbum(id: ID!, name: String!, year: String, artist_id: ID): [Int!]!
        updateArtist(id: ID!, name: String!, url: String): [Int!]!
        deleteAlbum(id: ID!): Int,
        deleteArtist(id: ID!): Int
    }

    type Artist {
        id: ID!
        name: String!
        url: String
        albums: [Album]
    }

    type Album {
        id: ID!
        name: String!
        year: String
        artist: Artist
    }
`
*/