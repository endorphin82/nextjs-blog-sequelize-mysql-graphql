import mongoose from "mongoose"

const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  name: String,
  year: String,
  artist_id: {
    type: Schema.Types.ObjectId,
    ref: "artists"
  }
})

export const Album = mongoose.model("albums", AlbumSchema)