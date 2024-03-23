const express = require('express');
const router = express.Router();
const multer = require('multer');


router.get('/', (req, res) =>{
    res.send("Audio Route")
})



module.exports = router;