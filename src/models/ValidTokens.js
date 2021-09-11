const { Schema, model } = require("mongoose")

const validTokensSchema = new Schema(
	{
		token: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false
	}
)

module.exports = model("ValidTokens", validTokensSchema)
