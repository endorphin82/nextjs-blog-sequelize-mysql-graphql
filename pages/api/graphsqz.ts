import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"

const Sequelize = require("sequelize")
// import DataLoader from "dataloader"
const { STRING, INTEGER } = Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL)
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })


const Artist = sequelize.define("artists", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING({ length: 255 }),
    allowNull: false
  },
  url: {
    type: STRING({ length: 255 })
  }
}, {
  timestamps: false
})

const Album = sequelize.define("albums", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING({ length: 255 }),
    allowNull: false
  },
  year: {
    type: STRING({ length: 45 })
  },
  artist_id: {
    type: INTEGER
  }
}, {
  timestamps: false
})


Artist.hasMany(Album, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "artist_id"
})
Album.belongsTo(Artist, {
  foreignKey: {
    name: "artist_id"
  }
})

const db = {
  "artists": Artist,
  "albums": Album
}

const typeDefs = gql`
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

const resolvers = {
  Artist: {
    albums: (parent, args, context) => parent.getAlbums()
  },

  Album: {
    artist: (parent, args, context) => parent.getArtist()
  },

  Query: {
    albums: (parent, args, { db }) => db.albums.findAll(),
    artists: (parent, args, { db }) => db.artists.findAll(),
    album: (parent, { id }, { db }) => db.albums.findByPk(id),
    artist: (parent, { id }, { db }) => db.artists.findByPk(id)
  },
  Mutation: {
    createAlbum: (parent, { name, year, artist_id }, { db }) =>
      db.albums.create({ name, year, artist_id }),
    updateAlbum: (parent, { id, name, year, artist_id }, { db }) =>
      db.albums.update(
        { name, year },
        {
          where: { id }
        }
      ),
    deleteAlbum: (parent, { id }, { db }) =>
      db.albums.destroy({ where: { id } })
  }
}

// const loader = {
//   artist: new DataLoader(async ids =>
// // @ts-ignore
//       await Artist.findByIds(ids)
//         .then(rows => ids.map(id => rows.find(row => row.id === id)))
//   )
// }

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"]
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db }
})

const handler = apolloServer.createHandler({ path: "/api/graphsqz" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
