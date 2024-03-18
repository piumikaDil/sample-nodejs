const express = require('express');
const controller = require("../controllers/index")

const model = require('../models/index');

const router = express.Router();

router.get('/', controller.get);

module.exports = router;