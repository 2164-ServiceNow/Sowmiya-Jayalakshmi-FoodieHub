app.controller('loginCtrl', ['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService) {
    $scope.login = function () {
      $http.post('/login', { username: $scope.username, password: $scope.password })
        .then(() => {
          AuthService.login();
          $location.path('/dashboard');
        })
        .catch(() => {
          $scope.errorMessage = "Invalid credentials.";
        });
    };
  }]);
  