//============== Requirements ==========
const express = require('express');
require('dotenv').config();
const boardRoutes = require('./routes/boardRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose');

//============== initialize App =========
const app = express();

// allows req.body to be used
app.use(express.json());

//function will require for every request that comes in
app.use((req, res, next) => {
  // every request that comes in log it
  console.log(req.path, req.method);

  // need to call this or app will never move on after log
  next();
})


//============== Routes =================
// use routes from board routes when requests are made
app.use('/api/boards', boardRoutes);
app.use('/api/users', userRoutes);

//============== Body =================

mongoose.connect(process.env.MONGO_URI)
  .then(() => { 
    console.log('Connected to MongoDB Database');
    // only allow listening on port when connected to database
    app.listen(process.env.PORT, (req, res) => {
      console.log('listening on port 4000');
    });
  })
  .catch(() => {
    console.log('Cant Connect to MongoDB Database');
  })

