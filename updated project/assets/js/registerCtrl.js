app.controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  // Initialize the form fields
  $scope.username = '';
  $scope.password = '';
  $scope.email = '';
  $scope.contact = '';
  $scope.gender = '';

  // Variable to store any error message
  $scope.errorMessage = '';

  // Register function to handle form submission
  $scope.register = function () {
    // Ensure all fields are filled out before sending the request
    if (!$scope.username || !$scope.password || !$scope.email || !$scope.contact || !$scope.gender) {
      $scope.errorMessage = "Please fill out all fields!";
      return;
    }

    // HTTP POST request to send user data to backend
    $http.post('/register', {
      username: $scope.username,
      password: $scope.password,
      email: $scope.email,
      contact: $scope.contact,
      gender: $scope.gender
    })
    .then(function (response) {
      // On success, navigate to login page
      $location.path('/login');
    })
    .catch(function (error) {
      // Handle error scenario
      $scope.errorMessage = "Registration failed. User might already exist.";
    });
  };
}]);
