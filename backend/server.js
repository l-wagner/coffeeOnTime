const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');
const morgan = require('morgan');
const apiResponse = require('./app/util/apiResponse.js');
const dbSetup = require('./app/models/dbSetup.js');
const { response } = require('express');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(morgan('tiny'));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

app.get('/createdb', (req, res) => {
  dbSetup
    .start()
    .then((result) => apiResponse.successMsg(res, result))
    .catch((err) => apiResponse.error(err));
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello Coffee.' });
});

require('./app/routes/employee.routes.js')(app);
require('./app/routes/role.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
