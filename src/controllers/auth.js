const { generateAuthTokens } = require('../helpers/generateAuthTokens')
const { successMessages, errorMessages } = require('../helpers/messages')
const User = require('../models/User')

const signIn = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email, googleAuth: false })
		if (!user) {
			return res.status(401).json({
				ok: false,
				msg: errorMessages.USER_NOT_FOUND
			})
		}

		if (await user.isCorrectPassword(password, user.password)) {
			const { accessToken, refreshToken, userWithOutPassword } =
				await generateAuthTokens(user)

			return res
				.cookie('refreshTokenCookie', refreshToken, {
					httpOnly: true,
					sameSite: 'strict',
					secure: true,
					maxAge: 60 * 60 * 24 * 30 // 30 days
				})
				.status(200)
				.json({
					ok: true,
					msg: successMessages.LOGGED_IN,
					user: userWithOutPassword,
					accessToken
				})
		}

		res.status(401).json({
			ok: false,
			msg: errorMessages.INVALID_EMAIL_OR_PASSWORD
		})
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: errorMessages.UNEXPECTED_ERROR
		})
	}
}

const signUp = async (req, res) => {
	const { name, email, password } = req.body
	try {
		const emailExists = await User.findOne({ email })
		if (emailExists) {
			return res.status(401).json({
				ok: false,
				msg: errorMessages.EMAIL_ALREADY_REGISTER
			})
		}

		const user = new User({
			name,
			email,
			password
		})
		await user.save()

		const { accessToken, refreshToken, userWithOutPassword } =
			await generateAuthTokens(user)

		return res
			.cookie('refreshTokenCookie', refreshToken, {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 30 // 30 days
			})
			.status(200)
			.json({
				ok: true,
				msg: successMessages.LOGGED_IN,
				user: userWithOutPassword,
				accessToken
			})
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: errorMessages.UNEXPECTED_ERROR
		})
	}
}

module.exports = {
	signIn,
	signUp
}
