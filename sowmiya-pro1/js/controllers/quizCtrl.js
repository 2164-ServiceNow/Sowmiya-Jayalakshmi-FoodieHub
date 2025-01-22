app.controller('quizCtrl', function () {
    const quiz = this;
    quiz.isQuizActive = false;
    quiz.quizResult = null;
  
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
      // Add other questions here...
    ];
  
    quiz.startQuiz = function () {
      quiz.isQuizActive = true;
      quiz.quizResult = null;
      quiz.quizQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    };
  
    quiz.submitAnswer = function (option) {
      if (option.isCorrect) {
        quiz.quizResult = "Correct! 🎉 " + offers[Math.floor(Math.random() * offers.length)];
      } else {
        quiz.quizResult = "Incorrect. 😔 Try again!";
      }
    };
  
    quiz.resetQuiz = function () {
      quiz.quizResult = null;
      quiz.isQuizActive = false;
    };
  });
  