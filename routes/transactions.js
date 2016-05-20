//ROUTES


'use strict';

var express = require('express');
var router = express.Router();

var Transaction = require('../models/transaction');

//   /api/transactions
router.route('/')
  .get((req, res) => {

    Transaction.get((err, objs) => {
      if(err) {
        return res.status(400).send(err);
      }

      res.send(objs);
    });
  })
  .post((req, res) => {
    Transaction.create(req.body, (err, obj) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(obj);
    });
  });


router.delete('/:id', (req, res) => {
  Transaction.removeById(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;