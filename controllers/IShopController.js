//controller
app.controller("HomeController", function ($scope, $http) {
  $scope.categories = [];
  $scope.products = [];
  $scope.shoppingCart = [];
  /* post request for register user details */
  $scope.regUserSubmit = function(user) {  
    $http.post("http://127.0.0.1:8989/registerUser", user)
      .then(
        function onsuccess(response) {
          alert("success")
          console.log(response);
        },
        function onfailed(response) {
          alert("failure")
          console.log(response);
        }
      );
  }

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