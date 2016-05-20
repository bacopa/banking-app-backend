"use strict";

var ledgerApp = angular.module("ledgerApp");

ledgerApp.controller("mainCtrl", function ($scope, Transaction) {
	
	$scope.newTransaction = {};
	$scope.transactions = [];
	
	$scope.getAll = function () {
		Transaction.getAll()
		.then(function (res) {
			$scope.transactions = res.data;
		})
		.catch(function (err) {
			console.log("Error:", err)
		})
	}

	$scope.getAll();

	$scope.create = function () {

		//call services
		Transaction.create($scope.newTransaction)
		.then(function (res) {
		})
		.catch(function (err) {
			console.log("Error:", err)
		});
	
		//POST error even tho added to db, null obj?

		$scope.transactions.push($scope.newTransaction)
		$scope.newTransaction = null;
			
	}


	$scope.findTotal = function () {
		$scope.totalDeposits = 0;
		$scope.totalWithdrawals = 0;
		for( var i = 0; i < $scope.transactions.length; i++){
			if($scope.transactions[i].credit){
				$scope.totalDeposits += $scope.transactions[i].credit;
			} else if ($scope.transactions[i].debit){
				$scope.totalWithdrawals += $scope.transactions[i].debit;
			}
		}
	}


	$scope.getTransactionValues = function (transaction) {
		
		$scope.editTransaction = {};
		$scope.indexEditTran = $scope.transactions.indexOf(transaction);
		
		if(transaction.credit){
			
			$scope.editTransaction.transType = "credit";
			$scope.editTransaction.amount = transaction.credit;
			$scope.editTransaction.credit = transaction.amount;

		} else {
			
			$scope.editTransaction.transType = "debit";
			$scope.editTransaction.amount = transaction.debit;
			$scope.editTransaction.debit = transaction.amount;
		}
		$scope.editTransaction.notes = transaction.notes; 
		$scope.editTransaction.description = transaction.description;
		$scope.editTransaction.date = transaction.date;
		$scope.editTransaction.hashKey = transaction.$$hashKey

	}

	$scope.saveEdits = function (transaction) {

		if(!transaction){
			console.log("transaction",transaction)
			return;
		}

		if(transaction.transType === "credit"){
			transaction.credit = transaction.amount;
			transaction.debit = "";
		} else {
			transaction.debit = transaction.amount;
			transaction.credit = "";
		}

		$scope.transactions[$scope.indexEditTran] = transaction;
		$scope.findTotal();
	}

	$scope.delete = function (transaction){

		Transaction.delete(transaction.id)
		.then(function (transaction) {
			$scope.indexToDelete = $scope.transactions.indexOf(transaction);
			$scope.transactions.splice($scope.indexToDelete, 1);
			$scope.findTotal();
		})
		.catch(function (err) {
			if (err) {
				console.log("Error while deleting:", err)
			}
		})
	}

	$scope.sortBy = function(order){
		$scope.order = order;
	}
	//run to get the total of hard coded data
	$scope.findTotal();
})