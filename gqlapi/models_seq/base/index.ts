import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(process.env.DATABASE_URL)

export function connectSeq (sequelize) {

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.")
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err)
    })
}