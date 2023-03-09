// const express = require('express');
// const router = express.Router();

// router.get('/hello/world', (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// })

// module.exports = router;
const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

// Dynamically import all routes in the 'routes' directory
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    router.use(`/${file.split('.')[0]}`, route);
  });

module.exports = router;