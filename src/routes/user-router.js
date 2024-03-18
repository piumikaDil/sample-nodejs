const express = require('express');
const controller = require("../controllers/user-controller")
const { storage } = require("../dbConfig/cloudinary-config");
const multer = require("multer");
const upload = multer({ storage });

const model = require('../models/user-model');

const router = express.Router();

router.get('/', controller.get);
router.post('/',upload.single('image'), controller.createUser);

module.exports = router;