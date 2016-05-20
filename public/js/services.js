//SERVICES

"use strict";

var app = angular.module("ledgerApp");

app.service("Transaction", function ($http) {
	
	this.getAll = function() {
		return $http.get("/api/transactions");
	};

	this.create = function(obj) {
		return $http.post("/api/transactions", obj);
	};

	//ask to see other person's code for "/api/transactions/" + id
	this.delete = function(id) {
		return $http.delete("/api/transactions/" + id, id)
	}
})