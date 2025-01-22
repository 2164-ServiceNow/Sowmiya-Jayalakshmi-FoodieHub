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
    .when('/amount', {
      templateUrl: 'views/amount.html',
      controller: 'amountCtrl'
    })
   .when('/quiz', {
      templateUrl: 'views/quiz.html',
      controller: 'quizCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      resolve: {
        auth: function ($location, AuthService) {
          if (!AuthService.isAuthenticated()) {
            $location.path('/login');
          }
        }
      }
    })
    .when('/wine', {
      templateUrl: 'views/wine.html',
      controller: 'wineCtrl'
    })
    .when('/chatbot', {
      templateUrl: 'views/chatbot.html',
      controller: 'chatbotCtrl'
    })
    .when('/analysis', {
      templateUrl: 'views/analysis.html',
      controller: 'analysisCtrl'
    })
    .when('/recipes', {
      templateUrl: 'views/recipes.html',
      controller: 'recipesCtrl',
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);

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
