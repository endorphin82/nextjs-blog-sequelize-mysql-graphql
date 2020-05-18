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
        updateAlbum(id: ID!, name: String!, year: String, artist_id: ID): [Int!]!
        deleteAlbum(id: ID!): Int
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
