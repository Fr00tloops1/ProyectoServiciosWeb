const express = require('express');
const router = express.Router();
require('dotenv').config();

const authRouter = require('./api/user/auth');
router.use( authRouter);



module.exports = router; 