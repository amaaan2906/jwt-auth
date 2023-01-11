import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	username: {
		type: String,
		required: true,
		min: 5,
		max: 255,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 1024,
	},
	registerDate: {
		type: Number,
		default: Date.now,
	},
})

export default mongoose.model("User", userSchema)

// const url = mongoose.model("url", userSchema)
// export const schema = url.schema
// export { url }
