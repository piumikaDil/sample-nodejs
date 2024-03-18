const express = require('express');
const controller = require("../controllers/user-controller")

const model = require('../models/user-model');

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.createUser);

module.exports = router;