const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(passport.initialize());

//require passport config
require('./config/passport')(passport);

app.get('/', (req, res, next) => {
  res.send('Hello from the base url');
});

const port = process.env.PORT;

app
  .listen(port, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    })
  });

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
  require('./routes/api/indexRoutes')(app);
  require('./routes/api/user')(app);
  require('./routes/api/profile')(app);
  console.log(`Server running on port ${port}`);
});

module.exports = app;


// mongodb+srv://ade:pa$$word17@cluster0-foh4x.mongodb.net/test?w=majority