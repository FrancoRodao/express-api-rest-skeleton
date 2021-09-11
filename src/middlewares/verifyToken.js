const jwt = require('jsonwebtoken')
const { errorMessages } = require('../helpers/messages')
const ValidTokens = require('../models/ValidTokens')

const invalidToken = res =>
	res.status(401).json({
		ok: false,
		msg: errorMessages.INVALID_AUTH_TOKEN
	})

const verifyToken = (req, res, next) => {
	try {
		if (!req.header('Authorization')) {
			return invalidToken(res)
		}

		//[BEARER, TOKEN]
		const token = req.header('Authorization').split(' ')[1]

		if (!token) return invalidToken(res)

		jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
			if (err || !decoded) return invalidToken(res)

			//refresh tokens should only be used to refresh the access token
			const isRefreshToken = await ValidTokens.findOne({ token })
			if (isRefreshToken) return invalidToken(res)

			next()
		})
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: errorMessages.UNEXPECTED_ERROR
		})
	}
}

module.exports = {
	verifyToken
}
