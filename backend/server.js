//============== Requirements ==========
const express = require('express');
require('dotenv').config();
const boardRoutes = require('./routes/boardRoutes')
const userRoutes = require('./routes/userRoutes')
const teamRoutes = require('./routes/teamRoutes')
const mongoose = require('mongoose');
const cors = require('cors');

//============== initialize App =========
const app = express();
app.use(cors());
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
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/boards', boardRoutes);


//============== Body =================

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => { 
    console.log('Connected to MongoDB Database');
    // only allow listening on port when connected to database
  
  })
  .catch((error) => {
    console.log('Cant Connect to MongoDB Database');
    console.log(error.message);
  })

  app.listen(port, (req, res) => {
      console.log(`listening on port ${port}`);
    });