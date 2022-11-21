//importing modules
const express = require('express')
const pressureController = require('../Controllers/pressureController')
const { createPressure } = pressureController

const router = express.Router()

//login route
router.post('/createPressure', createPressure )

module.exports = router