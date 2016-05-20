//ngROUTEs

var app = angular.module("ledgerApp", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "views/index.html"
	})
	.otherwise({
		redirectTo: "/"
	})
})