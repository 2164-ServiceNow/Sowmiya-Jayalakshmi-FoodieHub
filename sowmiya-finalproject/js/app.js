var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardCtrl',
      resolve: {
        auth: function ($location, AuthService) {
          if (!AuthService.isAuthenticated()) {
            $location.path('/login');
          }
        }
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);

// Define the AuthService for login/logout functionality
app.factory('AuthService', function () {
  let isAuthenticated = false;

  return {
    login: function () {
      isAuthenticated = true;
    },
    logout: function () {
      isAuthenticated = false;
    },
    isAuthenticated: function () {
      return isAuthenticated;
    }
  };
});
