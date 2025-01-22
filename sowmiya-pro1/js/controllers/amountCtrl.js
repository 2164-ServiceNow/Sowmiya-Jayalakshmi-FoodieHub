app.controller('amountCtrl', ['$scope', function ($scope) {
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "TP5qVmGVi4clPm5x3v-VzkxAkGIqndt2v8cxEiINr7AUDR42bK");
    myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "804237d5-5020-4074-959c-7e32d1155047");
 
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
 
    // Function to convert ingredient amount
    $scope.convertAmount = function () {
        const ingredientName = $scope.ingredientName || "flour";  // Default to 'flour' if not specified
        const sourceAmount = $scope.sourceAmount || 2.5;  // Default to 2.5 if not specified
        const sourceUnit = $scope.sourceUnit || "cups";  // Default to 'cups' if not specified
        const targetUnit = $scope.targetUnit || "grams";  // Default to 'grams' if not specified
 
        const url = `https://Spoonacular-API.proxy-production.allthingsdev.co/recipes/convert?ingredientName=${ingredientName}&sourceAmount=${sourceAmount}&sourceUnit=${sourceUnit}&targetUnit=${targetUnit}`;
 
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                $scope.$apply(() => {
                    if (result && result.targetAmount) {
                        $scope.convertedAmount = `Converted Amount: ${result.targetAmount} ${targetUnit}`;
                        $scope.errorMessage = null;  // Clear any previous error
                    } else {
                        $scope.convertedAmount = null;
                        $scope.errorMessage = "Conversion failed. Please try again.";
                    }
                });
            })
            .catch(error => {
                $scope.$apply(() => {
                    $scope.convertedAmount = null;
                    $scope.errorMessage = `Error: ${error.message}`;
                });
            });
    };
}]);
