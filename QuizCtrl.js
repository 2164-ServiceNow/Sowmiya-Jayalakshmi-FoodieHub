app.controller('quizController', function($scope) {
    $scope.quizQuestion = {
      text: 'What is the main ingredient of a Caesar Salad?',
      options: [
        {text: 'Lettuce', isCorrect: false},
        {text: 'Tomato', isCorrect: false},
        {text: 'Lemon', isCorrect: false},
        {text: 'Lettuce and Parmesan', isCorrect: true},
      ]
    };
    
    $scope.quizResult = null;
  
    $scope.submitAnswer = function(option) {
      if (option.isCorrect) {
        $scope.quizResult = "Correct! You've earned a 10% discount on your next order.";
      } else {
        $scope.quizResult = "Incorrect. Try again!";
      }
    };
  
    $scope.resetQuiz = function() {
      $scope.quizResult = null;
      $scope.quizQuestion = {
        text: 'What is the main ingredient of a Caesar Salad?',
        options: [
          {text: 'Lettuce', isCorrect: false},
          {text: 'Tomato', isCorrect: false},
          {text: 'Lemon', isCorrect: false},
          {text: 'Lettuce and Parmesan', isCorrect: true},
        ]
      };
    };
  });
  