const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');

const routes = require('./src/routes');

const app = express();
app.use(express.json());

require("./src/dbConfig/initDB")()

app.use(cors());
app.use(morgan(':method :url :status :user-agent - :response-time ms'));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

