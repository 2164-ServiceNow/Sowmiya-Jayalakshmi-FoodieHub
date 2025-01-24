app.controller('dashboardCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
    // Set the default content to be loaded
    $scope.contentUrl = 'views/default.html';  // Adjusted to work with relative paths
  
    // Function to load content dynamically based on the button clicked
    $scope.loadContent = function (url) {
      $scope.contentUrl = url;
    };
  
    // Logout functionality
    $scope.logout = function () {
      AuthService.logout();
      $location.path('/login');
    };
  }]);
  