import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"
import { sequelize } from "../../gqlapi/models_seq/base"
import mongoose from "mongoose"
import { schema_seq } from "../../gqlapi/schema_seq"


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })


/*
mongoose.connect("mongodb://localhost:27017/media", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

export const dbConnection = mongoose.connection

dbConnection.on("error", (err) => {
  console.log(`Connection error: ${err}`)
})

dbConnection.once("open", () => {
  console.log("Connected to mongo DB")
})
*/

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"]
})

const apolloServer = new ApolloServer({
  schema: schema_seq
})

const handler = apolloServer.createHandler({ path: "/api/graphsqz" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
