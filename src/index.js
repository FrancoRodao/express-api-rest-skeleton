const express = require("express")
const cors = require("cors")
const passport = require("passport")
const app = express()
const helmet = require("helmet")
const apiV1 = require("./routes/apiV1")

//config
const { configEnvironment } = require("./config/environment")
const { initDB } = require("./config/database")
const { configPassport } = require("./config/passport")

//environment
configEnvironment(app)

//database
initDB()

//passport
configPassport(passport)

//middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(passport.initialize())

//get status
app.get("/", (req, res) => {
	res.send({
		message: "STATUS ON 🚀"
	})
})

app.use("/api/v1", apiV1)

//listen
app.listen(3000, () => console.log("=== SERVER ON ==="))

module.exports = app
