import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
		default: Date.now,
	},
})

export default mongoose.model("refreshToken", tokenSchema)
