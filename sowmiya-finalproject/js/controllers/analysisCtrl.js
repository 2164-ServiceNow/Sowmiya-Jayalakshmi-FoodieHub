
app.controller('analysisCtrl', function ($scope) {
    $scope.mealPlan = [];
    $scope.totalCalories = 0;
    $scope.errorMessage = "";


    const mockData = [
        { id: 1, title: "Peanut Butter And Chocolate Oatmeal", calories: 300, imageType: "jpg", readyInMinutes: 45, servings: 1, sourceUrl: "https://spoonacular.com/recipes/peanut-butter-and-chocolate-oatmeal-1" },
        { id: 2, title: "Lentil Salad With Vegetables", calories: 250, imageType: "jpg", readyInMinutes: 30, servings: 4, sourceUrl: "https://spoonacular.com/recipes/lentil-salad-with-vegetables-2" },
        { id: 3, title: "Asian Noodles", calories: 400, imageType: "jpg", readyInMinutes: 25, servings: 2, sourceUrl: "https://spoonacular.com/recipes/asian-noodles-3" },
        { id: 4, title: "Grilled Chicken Salad", calories: 350, imageType: "jpg", readyInMinutes: 20, servings: 1, sourceUrl: "https://spoonacular.com/recipes/grilled-chicken-salad-4" },
        { id: 5, title: "Avocado Toast", calories: 200, imageType: "jpg", readyInMinutes: 15, servings: 1, sourceUrl: "https://spoonacular.com/recipes/avocado-toast-5" },
        { id: 6, title: "Quinoa Bowl", calories: 500, imageType: "jpg", readyInMinutes: 30, servings: 2, sourceUrl: "https://spoonacular.com/recipes/quinoa-bowl-6" },
        { id: 7, title: "Vegetable Stir Fry", calories: 450, imageType: "jpg", readyInMinutes: 25, servings: 3, sourceUrl: "https://spoonacular.com/recipes/vegetable-stir-fry-7" },
        { id: 8, title: "Spaghetti Bolognese", calories: 600, imageType: "jpg", readyInMinutes: 40, servings: 2, sourceUrl: "https://spoonacular.com/recipes/spaghetti-bolognese-8" },
        { id: 9, title: "Berry Smoothie Bowl", calories: 150, imageType: "jpg", readyInMinutes: 10, servings: 1, sourceUrl: "https://spoonacular.com/recipes/berry-smoothie-bowl-9" },
        { id: 10, title: "Mushroom Risotto", calories: 550, imageType: "jpg", readyInMinutes: 35, servings: 2, sourceUrl: "https://spoonacular.com/recipes/mushroom-risotto-10" }
    ];


    $scope.generateMealPlan = function () {
        const selectedDishes = [];
        let remainingCalories = $scope.totalCalories;


        for (let dish of mockData) {
            if (dish.calories <= remainingCalories) {
                selectedDishes.push(dish);
                remainingCalories -= dish.calories;
            }
        }

        if (selectedDishes.length > 0) {
            $scope.mealPlan = selectedDishes;
            $scope.errorMessage = "";
        } else {
            $scope.mealPlan = [];
            $scope.errorMessage = "No dishes found for the entered calorie amount.";
        }
    };
});