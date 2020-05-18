import { gql } from "apollo-server-micro"

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