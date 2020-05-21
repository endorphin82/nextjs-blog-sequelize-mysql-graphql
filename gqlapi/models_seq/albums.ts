import { sequelize } from "./base"
import { INTEGER, STRING } from "sequelize"

export const Album = sequelize.define("albums", {
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
  }
}, {
  timestamps: false
})
