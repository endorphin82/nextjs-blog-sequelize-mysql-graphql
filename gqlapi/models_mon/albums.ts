import mongoose from "mongoose"

const Schema = mongoose.Schema

// fix OverwriteModelError
delete mongoose.connection.models["albums"]

const AlbumSchema = new Schema({
  name: String,
  year: String
})

export const Album = mongoose.model("albums", AlbumSchema)