import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"
import { resolvers } from "../../gqlapi/resolvers"
import { sequelize } from "../../gqlapi/models/base"
import { db } from "../../gqlapi/models"
import { typeDefs } from "../../gqlapi/schema"
// import DataLoader from "dataloader"

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

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
