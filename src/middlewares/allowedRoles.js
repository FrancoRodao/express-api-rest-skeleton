const jwt = require('jsonwebtoken')
const userRoles = require('../config/userRoles')
const { errorMessages } = require('../helpers/messages')

const validations = (roles, res) => {
	if (!Array.isArray(roles)) {
		if (process.env.NODE_ENV === 'development') {
			throw new Error('Roles must be an array')
		}

		return res.status(500).json({
			ok: false,
			message: errorMessages.UNEXPECTED_ERROR
		})
	}

	const userRolesToArray = Object.values(userRoles)
	const isRolesValid = roles.every(role => userRolesToArray.includes(role))

	if (!isRolesValid || !roles.length) {
		if (process.env.NODE_ENV === 'development') {
			throw new Error(
				'Some role is invalid, the available roles are: ' +
					Object.values(userRoles)
			)
		}

		return res.status(500).json({
			ok: false,
			message: errorMessages.UNEXPECTED_ERROR
		})
	}
}

const allowedRoles =
	(roles = []) =>
	(req, res, next) => {
		validations(roles, res)

		try {
			//[BEARER, TOKEN]
			const token = req.headers.authorization?.split(' ')[1]
			if (!token) {
				return res.status(500).json({
					ok: false,
					msg: errorMessages.INVALID_AUTH_TOKEN
				})
			}

			const decode = jwt.decode(token)
			if (!decode) {
				return res.status(500).json({
					ok: false,
					msg: errorMessages.INVALID_AUTH_TOKEN
				})
			}

			const { role } = decode.user

			if (roles.includes(role)) return next()

			return res.status(401).json({
				ok: false,
				msg: errorMessages.ROLE_NOT_ALLOWED
			})
		} catch (error) {
			return res.status(500).json({
				ok: false,
				msg: errorMessages.UNEXPECTED_ERROR
			})
		}
	}

module.exports = {
	allowedRoles
}
