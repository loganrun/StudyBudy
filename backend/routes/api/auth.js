const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = reuire('express-validator')
const User = require("../../models/User")

// @route:   GET api/auth
// @desc:    Test route
// @access:  Public
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
