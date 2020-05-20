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

const AlbumType = new GraphQLObjectType({
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

const ArtistType = new GraphQLObjectType({
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