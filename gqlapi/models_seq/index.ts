import { Artist } from "./artists"
import { Album } from "./albums"
import { sequelize } from "./base"
import { literal } from "sequelize"

const Artists_Albums = sequelize.define("artists_albums", {
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: literal("CURRENT_TIMESTAMP"),
    allowNull: false
  }
}, {
  timestamps: false
})

Artist.belongsToMany(Album, {
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE",
  foreignKey: "artist_id",
  through: Artists_Albums
})

Album.belongsToMany(Artist, {
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE",
  foreignKey: "album_id",
  through: Artists_Albums
})

export {
  Artist,
  Album
}

