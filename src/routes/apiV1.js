const router = require('express').Router()
const authRoutes = require('./auth.routes')
const protectedRoutes = require('./protected.routes')

router.use(authRoutes)
router.use(protectedRoutes)

module.exports = router
