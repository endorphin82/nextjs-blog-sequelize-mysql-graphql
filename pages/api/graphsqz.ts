import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"
import { connectSeq, sequelize } from "../../gqlapi/models_seq/base"
import { schema_seq } from "../../gqlapi/schema_seq"
import { schema_mon } from "../../gqlapi/schema_mon"
import { connectMon } from "../../gqlapi/models_mon/base"

// connectSeq(sequelize)
connectMon()

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"]
})

const apolloServer = new ApolloServer({
  // schema: schema_seq
  schema: schema_mon
})

const handler = apolloServer.createHandler({ path: "/api/graphsqz" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors(handler)
