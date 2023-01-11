import mongoose from "mongoose"

if (process.env.NODE_ENV !== "production") {
	const dotenv = await import("dotenv")
	dotenv.config()
}

const mongoURI = process.env.MONGO_URI

mongoose.Promise = global.Promise

export default mongoose.connect(
	mongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log(`Connected to db!`)
)
