//controller
app.controller("HomeController", function($scope, $http) {
  $scope.categories = [];
  $scope.products = [];
  $scope.shoppingCart = [];

  /* get request to get categories */
  $http.get("http://127.0.0.1:8989/getCategories").then(
    function onsuccess(response) {
      $scope.categories = response.data;
    },
    function onfailed(response) {
      $scope.categories = [];
    }
  ); //get

  /* get request to get products */
  $http.get("http://127.0.0.1:8989/getProducts").then(
    function onsuccess(response) {
      $scope.products = response.data;
    },
    function onfailed(response) {
      $scope.products = [];
    }
  ); //get

  /* get request to get shopping cart */
  $http.get("http://127.0.0.1:8989/getShoppingCart").then(
    function onsuccess(response) {
      $scope.shoppingCart = response.data;
    },
    function onfailed(response) {
      $scope.shoppingCart = [];
    }
  ); //get
});