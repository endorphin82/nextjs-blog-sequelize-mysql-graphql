import { sequelize } from "./base"
import { INTEGER, STRING } from "sequelize"

export const Artist = sequelize.define("artists", {
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