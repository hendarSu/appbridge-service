require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swagger = require('./config/swagger');

const api = require('./routers/api');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const passportJwt = require('./libs/passport-jwt');

const session = require('express-session');
const passport = require('./libs/passport');

app.use(express.static('uploads'))

app.use(cors({
  origin: '*'
}));

app.use(morgan('dev'));

// built in Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// JWT
app.use(passportJwt.initialize());

// // Session
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// swagger config
const specs = swaggerJsdoc(swagger.swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// end swagger config

app.use('/api', api);

// app.use("/",(req, res) => {
//   const user = req.user;
//   if (user) {
//     res.send(`Selamat Datang : ${user.displayName}!`);
//   } else {
//     res.send(`Service woobridge is running!`);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});