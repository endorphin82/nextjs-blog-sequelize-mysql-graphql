import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"
import { sequelize } from "../../gqlapi/models/base"
import { schema } from "../../gqlapi/schema"

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
  schema
})
/*
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db }
})
*/
const handler = apolloServer.createHandler({ path: "/api/graphsqz" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
