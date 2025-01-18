app.controller('quizCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
  // Initialize quiz state variables
  $scope.isQuizActive = false;
  $scope.quizResult = null;
  $scope.quizQuestion = {};

  const offers = [
    "10% off on your next order! 🎉",
    "Free dessert with your meal! 🍰",
    "Get a complimentary drink! 🥤",
    "Earn double reward points! ⭐",
    "Free delivery on your next order! 🚚"
  ];

  const quizQuestions = [
    {
      text: "What is the main ingredient of a Caesar Salad?",
      options: [
        { text: "Lettuce", isCorrect: false },
        { text: "Tomato", isCorrect: false },
        { text: "Lemon", isCorrect: false },
        { text: "Lettuce and Parmesan", isCorrect: true }
      ]
    },
    {
      text: "What is the primary ingredient in guacamole?",
      options: [
        { text: "Tomato", isCorrect: false },
        { text: "Avocado", isCorrect: true },
        { text: "Cucumber", isCorrect: false },
        { text: "Lemon", isCorrect: false }
      ]
    },
    {
      text: "Which spice is most commonly used in Indian curry?",
      options: [
        { text: "Cinnamon", isCorrect: false },
        { text: "Turmeric", isCorrect: true },
        { text: "Nutmeg", isCorrect: false },
        { text: "Pepper", isCorrect: false }
      ]
    },
    {
      text: "Which fruit is known as the 'king of fruits'?",
      options: [
        { text: "Apple", isCorrect: false },
        { text: "Banana", isCorrect: false },
        { text: "Mango", isCorrect: true },
        { text: "Orange", isCorrect: false }
      ]
    }
  ];

  // Function to start the quiz and pick a random question
  $scope.startQuiz = function () {
    $scope.isQuizActive = true;
    $scope.quizResult = null;
    $scope.quizQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  };

  // Function to submit an answer and show result
  $scope.submitAnswer = function (option) {
    if (option.isCorrect) {
      $scope.quizResult = "Correct! 🎉 " + offers[Math.floor(Math.random() * offers.length)];
    } else {
      $scope.quizResult = "Incorrect. 😔 Try again!";
    }
  };

  // Function to reset the quiz
  $scope.resetQuiz = function () {
    $scope.quizResult = null;
    $scope.isQuizActive = false;
    $scope.quizQuestion = {};
  };

  // Redirect to Recipe Page if authenticated
  $scope.redirectToRecipePage = function () {
    if (AuthService.isAuthenticated()) {
      $location.path('/recipes');  // Redirect to recipes page
    } else {
      $location.path('/login');  // If not authenticated, redirect to login page
    }
  };
}]);
