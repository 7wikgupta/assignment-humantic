const express = require('express');
const router = express.Router();
const users = require('../services/user_sql_functions');

/* GET users . */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating users`, err.message);
      next(err);
    }
  });

module.exports = router;