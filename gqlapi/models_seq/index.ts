import { Artist } from "./artists"
import { Album } from "./albums"
import { sequelize } from "./base"

const Artists_Albums = sequelize.define("artists_albums", {
  createdAt: { type: Date, default: Date.now },
},{
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

