require('dotenv').config();
const express = require('express');
const api = require('./routers/api');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

// built in Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use("/", (req, res) => {
  res.send(`Service woobridge is running!`);
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});