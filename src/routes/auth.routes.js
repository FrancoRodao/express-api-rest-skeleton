const router = require('express').Router()
const { signIn, signUp } = require('../controllers/auth')
const { validateErrors } = require('../middlewares/validateErrors')
const { authenticateGoogle } = require('../controllers/authenticate')

const {
	emailValidations,
	passwordValidations,
	nameValidations
} = require('../middlewares/validations')

router.post('/auth/google', authenticateGoogle)

router.post(
	'/auth/signin',
	[emailValidations, passwordValidations, validateErrors],
	signIn
)

router.post(
	'/auth/signup',
	[emailValidations, nameValidations, passwordValidations, validateErrors],
	signUp
)

module.exports = router
