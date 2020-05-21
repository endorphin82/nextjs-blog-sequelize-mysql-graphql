// import { gql } from "apollo-server-micro"
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} from "graphql"
import { Album, Artist } from "./models_seq"
import { AlbumType } from "./models_seq/schema_types/album"
import { ArtistType } from "./models_seq/schema_types/artist"

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: async (parent) => await Album.findAll()
    },
    albumById: {
      type: AlbumType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Album.findByPk(id)
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve: async (parent) => await Artist.findAll()
    },
    artistById: {
      type: ArtistType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Artist.findByPk(id)
    }
  }
})
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAlbum: {
      type: AlbumType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLString },
        artist_id: { type: GraphQLID }
      },
      resolve: (parent, { name, year, artist_id }) =>
        Album.create({ name, year, artist_id })
    },
    createArtist: {
      type: ArtistType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLString }
      },
      resolve: (parent, { name, url }) =>
        Artist.create({ name, url })
    },
    updateAlbum: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLString },
        artist_id: { type: GraphQLID }
      },
      resolve: (parent, { id, name, year, artist_id }) =>
        Album.update({ name, year, artist_id }, {
          where: { id }
        })
    },
    updateArtist: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLString }
      },
      resolve: (parent, { id, name, url }) =>
        Artist.update({ name, url }, {
          where: { id }
        })
    },
    deleteAlbum: {
      type: GraphQLInt,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Album.destroy({ where: { id } })
    },
    deleteArtist: {
      type: GraphQLInt,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Artist.destroy({ where: { id } })
    }
  }
})

export const schema_seq = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})