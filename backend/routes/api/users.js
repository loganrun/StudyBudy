const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')

// @route:   GET api/users
// @desc:    Test route
// @access:  Public
router.get('/', (req, res) => res.send('User Route'));

// @route:   POST api/users
// @desc:    Reqgister User and Get JWT
// @access:
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 characters or more'
  ).isLength({ min: 6 }),
], async (req, res) => {
    //Check if are valididation errors
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    // To test information being sent
    // return res.send(req.body)

    const { name, email, password} = req.body;

    
    try {
        //Create instance of user
        let user = await User.findOne({ email })
        //Check if user already exists
        if(user) {
            return res.status(400).json([{msg: 'User already exists'}])
        }

        user = new User({
            name,
            email,
            password
        })

        //Encrpyt PW
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)
        //Save User
        await user.save()

        //Create a JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name
            }
        };

        jwt.sign(
            payload,
            process.env.jwtSecret,
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err;
                res.json({token})
            }
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;
