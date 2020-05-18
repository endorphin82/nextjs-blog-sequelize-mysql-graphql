import { Artist } from "./artists"
import { Album } from "./albums"


Artist.hasMany(Album, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "artist_id"
})

Album.belongsTo(Artist, {
  foreignKey: {
    name: "artist_id"
  }
})

export const db = {
  "artists": Artist,
  "albums": Album
}

