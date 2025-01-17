app.controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.register = function () {
    // Create the user object with all fields
    const newUser = {
      username: $scope.username,
      password: $scope.password,
      email: $scope.email,
      contact: $scope.contact
    };

    // Send POST request to `/register` endpoint
    $http.post('/register', newUser)
      .then((response) => {
        // Handle successful registration
        alert(response.data.message); // "Registration successful"
        $location.path('/login');
      })
      .catch((error) => {
        // Handle errors (e.g., user already exists)
        $scope.errorMessage = error.data.message || "Registration failed.";
      });
  };
}]);
