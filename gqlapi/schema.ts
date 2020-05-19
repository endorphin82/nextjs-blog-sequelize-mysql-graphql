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
import { Album, Artist } from "./models_mon"

const AlbumType = new GraphQLObjectType({
  name: "Album",
  fields: {
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
    }

    /*
      // @ts-ignore
        // TODO: add after ArtistType
        artist: {
          type: ArtistType,
          // resolve: ({ artist }) => Artist.findAll({ where: { artist_id: artist } })
          resolve: (parent) => parent.getArtist()
        }
    */
  }
})

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: {
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
  }
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: async () => await Album.find({})
    },
    albumById: {
      type: AlbumType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Album.findById(id)
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve: async (parent) => await Artist.find({})
    },
    artistById: {
      type: ArtistType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Artist.findById(id)
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
      resolve: (parent, { name, year, artist_id }) => {
        const album = new Album({ name, year, artist_id })
        return album.save()
      }
    },
    createArtist: {
      type: ArtistType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLString }
      },
      resolve: (parent, { name, url }) => {
        const artist = new Artist({ name, url })
        return artist.save()
      }

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
        Album.findByIdAndUpdate(
          id,
          { $set: { name, year, artist_id } },
          { new: true }
        )
    },
    updateArtist: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLString }
      },
      resolve: (parent, { id, name, url }) =>
        Artist.findByIdAndUpdate(
          id,
          { $set: { name, url } },
          { new: true }
        )
    },
    deleteAlbum: {
      type: GraphQLInt,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Album.findByIdAndRemove(id)
    },
    deleteArtist: {
      type: GraphQLInt,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parent, { id }) => Artist.findByIdAndRemove(id)
    }
  }
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})