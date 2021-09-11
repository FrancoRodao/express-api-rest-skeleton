const { validationResult } = require("express-validator")

const validateErrors = (req, res, next) => {
	const result = validationResult(req)

	if (!result.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: result.errors[0].msg,
			allErrors: result.mapped()
		})
	}

	next()
}

module.exports = {
	validateErrors
}
