const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
const userRoles = require("../config/userRoles")

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		role: {
			type: String,
			enum: Object.keys(userRoles),
			default: "USER"
		},
		password: {
			type: String,
			required: true
		},
		googleAuth: {
			type: Boolean,
			default: false
		}
	},
	{
		versionKey: false
	}
)

//encrypt password
userSchema.pre("save", function (next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) {
			throw err
		}

		this.password = hash
		next()
	})
})

userSchema.method("isCorrectPassword", async (password, hash) => {
	return await bcrypt
		.compare(password, hash)
		.then(res => res)
		.catch(err => {
			throw err
		})
})

module.exports = model("User", userSchema)
