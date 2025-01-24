app.controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.register = function () {
      $http.post('/register', { username: $scope.username, password: $scope.password , gender: $scope.gender , contact: $scope.contact })
        .then(() => {
          $location.path('/login');
        })
        .catch(() => {
          $scope.errorMessage = "Registration failed. User might already exist.";
        });
    };
  }]);
  
