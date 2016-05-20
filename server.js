'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Transaction = require("./models/transaction");
//require("./routes/transactions.js")(app);
//require("./routes/api.js")(app);

app.set("views", __dirname + "/views");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs')


app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'))

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
