const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello from the base url');
});

const port = process.env.PORT

app.listen(port, () => {
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