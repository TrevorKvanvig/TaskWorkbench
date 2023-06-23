//============== Requirements ==========
const express = require('express');
require('dotenv').config();

//============== initialize App =========
const app = express();

app.use(express.json());

//function will require for every request that comes in
app.use((req, res, next) => {
  // every request that comes in log it
  console.log(req.path, req.method);

  // need to call this or app will never move on after log
  next();
})
//============== functions ==============



//============== Routes =================
app.route('/')
  .get((req, res) => {
    res.send('hi');
  })



app.listen(process.env.PORT, (req, res) => {
  console.log("listening");
});