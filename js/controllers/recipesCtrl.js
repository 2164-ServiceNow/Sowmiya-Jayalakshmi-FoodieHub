app.controller('recipesCtrl', ['$scope', '$sce', function ($scope, $sce) {
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "TP5qVmGVi4clPm5x3v-VzkxAkGIqndt2v8cxEiINr7AUDR42bK");
    myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "4a55d7a5-dbc7-452d-9ebb-2b9be27ac5b8");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    $scope.getRecipes = function () {
      fetch("https://Spoonacular-API.proxy-production.allthingsdev.co/recipes/716429/information?includeNutrition=false", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse response as JSON
        })
        .then((data) => {
          console.log("Fetched Recipe Data:", data);
          $scope.recipe = data; // Store the fetched recipe data
  
          // If you want to trust the HTML content of recipe summary
          $scope.recipe.summary = $sce.trustAsHtml($scope.recipe.summary);

        
          
          $scope.$apply(); // Apply changes to scope
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error.message);
          $scope.errorMessage = `Failed to fetch recipes. ${error.message}`;
          $scope.$apply(); // Apply changes to scope to update error message
        });
    };
  }]);
  