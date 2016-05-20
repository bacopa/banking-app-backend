'use strict';

var express = require('express');
var router = express.Router();

var moment = require('moment');
var Transaction = require('../models/transaction');

//  GET /
router.get('/', (req, res) => {
  Transaction.get((err, transactions) => {
    if(err) {
      res.render('error', {error: err})
    } else {

      transactions = transactions.map(transaction => {
        transaction.createdAt = moment(transaction.createdAt, 'X').format('l');
        return transaction;
      })

      res.render('index', {transactions: transactions});
    }
  })
})

module.exports = router;
