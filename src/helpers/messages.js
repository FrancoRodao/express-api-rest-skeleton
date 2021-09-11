const successMessages = {
	LOGGED_IN: 'Logged in',
	USER_CREATED: 'User registered successfully!'
}

const errorMessages = {
	USER_NOT_FOUND: 'User not found',
	INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
	UNEXPECTED_ERROR: 'Unexpected error',
	EMAIL_ALREADY_REGISTER: 'Email is already register',
	INVALID_AUTH_TOKEN: 'Invalid auth token',
	ROLE_NOT_ALLOWED: 'You do not have sufficient permissions'
}

module.exports = {
	successMessages,
	errorMessages
}
