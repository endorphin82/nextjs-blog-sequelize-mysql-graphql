import mongoose from "mongoose"

export function connectMon() {
  mongoose.connect("mongodb://localhost:27017/media", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  const mongCon = mongoose.connection

  mongCon.on("error", (err) => {
    console.log(`Connection error: ${err}`)
  })

  mongCon.once("open", () => {
    console.log("Connected to mongo DB")
  })
}