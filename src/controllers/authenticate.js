const passport = require('passport')
const { generateAuthTokens } = require('../helpers/generateAuthTokens')

const authenticateGoogle = (req, res, next) => {
	passport.authenticate(
		'google',
		{
			session: false,
			accessType: 'offline'
		},
		async (err, user) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					message: 'Unexpected error',
					user: null
				})
			}

			const { accessToken, refreshToken, userWithOutPassword } =
				await generateAuthTokens(user)

			res.status(200).json({
				ok: true,
				message: 'Successful login ✔',
				user: userWithOutPassword,
				accessToken,
				refreshToken
			})
		}
	)(req, res, next)
}

const authenticateJWT = (req, res, next) => {
	passport.authenticate(
		'bearerjwt',
		{
			session: false
		},
		async (err, user) => {
			console.log(user, 'paso')
			// if (err) {
			// 	return res.status(500).json({
			// 		ok: false,
			// 		message: "Unexpected error",
			// 		user: null
			// 	})
			// }

			// const userCopy = { ...user._doc }
			// //delete user password from payload
			// delete userCopy.password
			// const { accessToken, refreshToken } = await generateAuthTokens(userCopy)

			// res.status(200).json({
			// 	ok: true,
			// 	message: "Successful login ✔",
			// 	accessToken,
			// 	refreshToken
			// })
		}
	)(req, res, next)
}

module.exports = {
	authenticateGoogle,
	authenticateJWT
}
