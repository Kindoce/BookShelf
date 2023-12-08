const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const setupRoutes = require('./routes');

setupRoutes(app);

app.listen(3000, () => console.log('Server started on port 3000'));
