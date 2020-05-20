import mongoose from "mongoose"

const Schema = mongoose.Schema

// fix OverwriteModelError
delete mongoose.connection.models["artists"]

const ArtistSchema = new Schema({
  name: String,
  url: String
})

export const Artist = mongoose.model("artists", ArtistSchema)