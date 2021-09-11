const { connect } = require("mongoose")

function initDB() {
	console.log("=== Starting database... ===")
	connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(conn => console.log("=== DATABASE ON === "))
		.catch(err => {
			console.log("=== FAILED TO CONNECT TO DATABASE ===")
			process.exit(0)
		})
}

module.exports = {
	initDB
}
