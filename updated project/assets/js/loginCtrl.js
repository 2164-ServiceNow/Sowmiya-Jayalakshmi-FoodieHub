app.controller('loginCtrl', function ($scope, $http, $location, AuthService) {
  $scope.errorMessage = ""; // Initialize error message

  $scope.login = function () {
    const payload = {
      username: $scope.username,
      password: $scope.password,
    };

    $http.post('/login', payload)
      .then(response => {
        AuthService.login(); // Set authentication state
        $location.path('/dashboard'); // Redirect to dashboard
      })
      .catch(error => {
        $scope.errorMessage = error.data.message || "Invalid username or password.";
      });
  };
});
