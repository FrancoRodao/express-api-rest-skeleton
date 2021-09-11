const path = require("path")

function configEnvironment(expressApp) {
	if (process.env.NODE_ENV === "development") {
		const morgan = require("morgan")
		expressApp.use(morgan("dev"))

		require("dotenv").config({
			path: path.join(__dirname, "../../.env.development")
		})
	}

	if (process.env.NODE_ENV === "production") {
		require("dotenv").config({
			path: path.join(__dirname, "../../.env.production")
		})
	}
}

module.exports = {
	configEnvironment
}
