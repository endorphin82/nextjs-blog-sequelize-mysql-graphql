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
    type: STRING,
    allowNull: false
  },
  url: {
    type: STRING
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
    type: STRING,
    allowNull: false
  },
  year: {
    type: STRING
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

const typeDefs = gql`
    type Query {
        albums(first: Int = 25, skip: Int = 0): [Album]
    }

    type Artist {
        id: ID!
        name: String!
        url: String
        albums(first: Int = 25, skip: Int = 0): [Album]
    }

    type Album {
        id: ID!
        name: String!
        year: String!
        artist: Artist!
    }
`

const resolvers = {
  Query: {
    albums: (_parent, args, _context) => {
      return Album.findAll()
        .then(a => a)

    }
  },

  Album: {
    id: (album, _args, _context) => album.id,
    artist: async (album, _args, { loader }) => {
      return await Artist.findOne({ where: { id: album.artist_id } })
    }
  },

  Artist: {
    id: (artist, _args, _context) => artist.id,
    albums: async (artist, args, _context) => {
      return Artist.findAll({ where: { artist_id: artist.id } })
    }
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
  resolvers
  // context: () => {
  //   return { loader }
  // }
})

const handler = apolloServer.createHandler({ path: "/api/graphsqz" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
