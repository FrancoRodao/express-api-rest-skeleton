const router = require('express').Router()
const { allowedRoles } = require('../middlewares/allowedRoles')
const { verifyToken } = require('../middlewares/verifyToken')

router.get(
	'/protected-route',
	[verifyToken, allowedRoles(['ADMIN', 'MODERATOR'])],
	(req, res) => {
		return res.status(200).send('Tenes acceso al perfil')
	}
)

module.exports = router
