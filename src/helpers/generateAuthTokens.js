const jwt = require("jsonwebtoken")
const ValidTokens = require("../models/ValidTokens")

const generateAsyncTokens = user => {
	const accessToken = new Promise((resolve, reject) => {
		jwt.sign(
			{ user },
			process.env.SECRET_KEY,
			{ expiresIn: "1m" },
			(err, accessToken) => {
				if (err) reject(err)

				resolve(accessToken)
			}
		)
	})

	const refreshToken = new Promise((resolve, reject) => {
		jwt.sign(
			{ user },
			process.env.SECRET_KEY,
			{ expiresIn: "30d" },
			async (err, refreshToken) => {
				if (err) reject(err)

				await new ValidTokens({ token: refreshToken }).save()
				resolve(refreshToken)
			}
		)
	})

	return Promise.all([accessToken, refreshToken])
}

const generateAuthTokens = async user => {
	const userCopy = { ...user._doc }
	//delete user password from payload
	delete userCopy.password

	const [accessToken, refreshToken] = await generateAsyncTokens(userCopy)

	return {
		accessToken,
		refreshToken,
		userWithOutPassword: userCopy
	}
}

module.exports = {
	generateAuthTokens
}
