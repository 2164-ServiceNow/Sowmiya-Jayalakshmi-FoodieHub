app.controller('recipesCtrl', ['$scope', '$sce', '$location', function ($scope, $sce, $location) {
  const myHeaders = new Headers();
  myHeaders.append("x-apihub-key", "TP5qVmGVi4clPm5x3v-VzkxAkGIqndt2v8cxEiINr7AUDR42bK");
  myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "4a55d7a5-dbc7-452d-9ebb-2b9be27ac5b8");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Fetch recipes function
  $scope.getRecipes = function () {
    const url = "https://Spoonacular-API.proxy-production.allthingsdev.co/recipes/random?number=15";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        $scope.recipes = data.recipes || [];
        $scope.recipes.forEach((recipe) => {
          if (recipe.summary) {
            recipe.summary = $sce.trustAsHtml(recipe.summary);
          }
        });
        $scope.$apply();  // Apply scope update
      })
      .catch((error) => {
        $scope.errorMessage = `Failed to fetch recipes. ${error.message}`;
        $scope.$apply();
      });
  };

  // Update convertAmount to route to /amount
  $scope.convertAmount = function () {
    $location.path('/amount');  // Navigating to the /amount route
  };

  // Navigate to quiz page
  $scope.getQuiz = function () {
    $location.path('/quiz');
  };
}]);
