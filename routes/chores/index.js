const express = require('express');
const router = express.Router();

router.get('/hello/chores', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello Chores!');
})

module.exports = router;