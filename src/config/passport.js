const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
// const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require('../models/User')

function configPassport(passport) {
	// passport.use(
	// 	"local",
	// 	new LocalStrategy(
	// 		{
	// 			session: false,
	// 			usernameField: "email",
	// 			passwordField: "password"
	// 		},
	// 		function (email, password, done) {
	// 			const user = {
	// 				ok: "oki"
	// 			}

	// 			return done(null, false, { message: "Aa" })
	// 		}
	// 	)
	// )

	passport.use(
		'google',
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:3000/api/v1/auth/google',
				scope: ['profile', 'email']
			},
			async (accessToken, refreshToken, params, profile, cb) => {
				try {
					const { name, email } = profile._json
					const existsUser = await User.findOne({
						email,
						googleAuth: true
					})

					if (existsUser) {
						return cb(null, existsUser)
					}

					//create user
					const newUser = new User({
						name,
						email,
						password: profile.id,
						googleAuth: true
					})
					await newUser.save()

					return cb(null, newUser)
				} catch (error) {
					cb(error)
				}
			}
		)
	)

	const opts = {
		// jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: process.env.SECRET_KEY
	}

	passport.use(
		'bearerjwt',
		new BearerStrategy((jwt_payload, done) => {
			console.log('jwt', jwt_payload)
			console.log('jola')
			// done(null, {
			// 	password: "xd"
			// })
			// User.findOne({ id: jwt_payload.sub }, function (err, user) {
			// 	if (err) {
			// 		return done(err, false)
			// 	}
			// 	if (user) {
			// 		return done(null, user)
			// 	} else {
			// 		return done(null, false)
			// 		// or you could create a new account
			// 	}
			// })
		})
	)
}

module.exports = {
	configPassport
}
