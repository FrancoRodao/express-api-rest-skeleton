const { body } = require("express-validator")

const emailValidations = [
	body("email", "email is required").not().isEmpty({
		ignore_whitespace: true
	}),
	body("email", "email format is not valid").isEmail()
]

const nameValidations = [
	body("name", "name is required").not().isEmpty({
		ignore_whitespace: true
	})
]

const passwordValidations = [
	body("password", "password is required").not().isEmpty({
		ignore_whitespace: true
	}),
	body("password", "password must have at least 6 characters").isLength({
		min: 6
	})
]

module.exports = {
	emailValidations,
	nameValidations,
	passwordValidations
}
