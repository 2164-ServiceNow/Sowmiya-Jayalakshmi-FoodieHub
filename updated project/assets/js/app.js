// Define the AngularJS app
var app = angular.module('app', ['ngRoute']);

// Configure routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/dashboard', {
      templateUrl: '../assets/views/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .when('/login', {
      templateUrl: '../assets/views/login.html',
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: '../assets/views/register.html',
      controller: 'registerCtrl'
    })
    .when('/recipes', {
      templateUrl: '../assets/views/recipes.html',
      controller: 'recipesCtrl',
      resolve: {
        auth: function ($location, AuthService) {
          if (!AuthService.isAuthenticated()) {
            $location.path('/login'); // Redirect to login if not authenticated
          }
        }
      }
    })
    .otherwise({
      redirectTo: '/dashboard'
    });
}]);

// AuthService for login and logout functionality
app.factory('AuthService', function () {
  return {
    login: function () {
      localStorage.setItem('isAuthenticated', true); // Save login status
    },
    logout: function () {
      localStorage.removeItem('isAuthenticated'); // Remove login status
    },
    isAuthenticated: function () {
      return localStorage.getItem('isAuthenticated') === 'true'; // Check login status
    }
  };
});

// Controllers
app.controller('dashboardCtrl', function ($scope) {
  $scope.message = "Welcome to Your Personalized Meal Dashboard!";
});

app.controller('loginCtrl', function ($scope, $location, AuthService) {
  $scope.login = function () {
    // Perform login (mocked here, replace with real API calls)
    AuthService.login();
    alert("Login successful!");
    $location.path('/dashboard'); // Redirect to dashboard
  };
});

app.controller('registerCtrl', function ($scope, $http) {
  $scope.register = function () {
    // Perform registration via POST request to /register API
    const payload = { username: $scope.username, password: $scope.password };
    $http.post('/register', payload)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.data.message || "Registration failed.");
      });
  };
});

app.controller('recipesCtrl', function ($scope) {
  $scope.message = "Discover recipes tailored to your needs!";
});
