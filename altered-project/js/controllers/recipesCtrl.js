app.controller('recipesCtrl', ['$scope', '$sce', function ($scope, $sce) {

  // Recipe fetching functionality
  const myHeaders = new Headers();
  myHeaders.append("x-apihub-key", "TP5qVmGVi4clPm5x3v-VzkxAkGIqndt2v8cxEiINr7AUDR42bK");
  myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "4a55d7a5-dbc7-452d-9ebb-2b9be27ac5b8");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Function to fetch recipes
  $scope.getRecipes = function () {
    const url = "https://Spoonacular-API.proxy-production.allthingsdev.co/recipes/random?number=15";

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Recipes Data:", data);

        $scope.recipes = data.recipes || [];
        
        // Trust the HTML content of recipe summaries
        $scope.recipes.forEach((recipe) => {
          if (recipe.summary) {
            recipe.summary = $sce.trustAsHtml(recipe.summary);
          }
        });

        $scope.$apply(); // Apply changes to scope
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error.message);
        $scope.errorMessage = `Failed to fetch recipes. ${error.message}`;
        $scope.$apply();
      });
  };

  // Quiz functionality
  $scope.isQuizActive = false;
  $scope.quizResult = null;

  // Predefined offers for correct answers
  const offers = [
    "10% off on your next order! 🎉",
    "Free dessert with your meal! 🍰",
    "Get a complimentary drink! 🥤",
    "Earn double reward points! ⭐",
    "Free delivery on your next order! 🚚"
  ];

  // List of quiz questions
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

  // Function to start the quiz and load a random question
  $scope.startQuiz = function () {
    $scope.isQuizActive = true;
    $scope.quizResult = null;
    $scope.quizQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  };

  // Function to submit an answer
  $scope.submitAnswer = function (option) {
    if (option.isCorrect) {
      // Display a random offer for the correct answer
      $scope.quizResult = "Correct! 🎉 " + offers[Math.floor(Math.random() * offers.length)];
    } else {
      // Display an emoji with an incorrect message
      $scope.quizResult = "Incorrect. 😔 Try again!";
    }
  };

  // Function to reset the quiz
  $scope.resetQuiz = function () {
    $scope.quizResult = null;
    $scope.isQuizActive = false;
  };

}]);
