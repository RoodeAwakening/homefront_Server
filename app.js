const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev')); // for logging information about requests and responses
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing JSON bodies of requests with Content-Type of "application/json"

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

app.use(helmet({ // helmet helps set a variety of headers to better secure your app
  contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true
    }
  })
)