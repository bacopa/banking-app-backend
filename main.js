"use strict";

var ledgerApp = angular.module("ledgerApp", []);

ledgerApp.controller("mainCtrl", function ($scope) {
	$scope.newTransaction = {};
	$scope.transactions = [ 
		{

			credit: 25.00,
			debit: "",
			description: "cell phone",
			notes: "",
			date: "04/26/16"
		},
		{
			credit: "",	
			debit: 15.00,
			description: "lunch",
			notes: "",
			date: "04/24/16"
		},
		{
			credit: "",
			debit: 11.00,
			description: "uber",
			notes: "sf",
			date: "04/22/16"
		},
		{
			credit: 35.00,
			debit: "",
			description: "dog walking",
			notes: "",
			date: "04/23/16"
		}
	];
	
	$scope.pushTransaction = function () {
		if($scope.newTransaction.transType === "credit"){
			$scope.newTransaction.credit = $scope.newTransaction.amount;
			$scope.totalDeposits += $scope.newTransaction.amount;
		} else if ($scope.newTransaction.transType === "debit"){
			$scope.newTransaction.debit = $scope.newTransaction.amount;
			$scope.totalWithdrawals += $scope.newTransaction.amount;
		}

		$scope.transactions.push($scope.newTransaction)
		$scope.newTransaction = {};
		
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
		$scope.indexToDelete = $scope.transactions.indexOf(transaction);
		$scope.transactions.splice($scope.indexToDelete, 1);
		$scope.findTotal();
	}

	$scope.sortBy = function(order){
		$scope.order = order;
	}
	//run to get the total of hard coded data
	$scope.findTotal();
})