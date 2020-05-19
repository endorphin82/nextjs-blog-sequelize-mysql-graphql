const Sequelize = require("sequelize")
export const { STRING, INTEGER } = Sequelize
export const sequelize = new Sequelize(process.env.DATABASE_URL)
