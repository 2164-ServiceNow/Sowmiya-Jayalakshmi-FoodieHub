
app.controller("wineCtrl", ['$scope', function($scope) {

    $scope.loadingMessage = "Fetching wine pairings...";

    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "jGR3UmQMx9aXqbGfKEdXVNAfVNZsDIwmCjVchlp08gpr7hSG1R");
    myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "5493e30e-feec-4d0d-ad98-1f0f262a5f5b");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    // Dish-to-image mapping for static placeholders
    const dishImages = {
        steak: "https://via.placeholder.com/300?text=Steak",
        salmon: "https://via.placeholder.com/300?text=Salmon",
        pasta: "https://via.placeholder.com/300?text=Pasta",
        cheese: "https://via.placeholder.com/300?text=Cheese",
        chicken: "https://via.placeholder.com/300?text=Chicken",
        pizza: "https://via.placeholder.com/300?text=Pizza",
        burger: "https://via.placeholder.com/300?text=Burger",
        sushi: "https://via.placeholder.com/300?text=Sushi",
        dessert: "https://via.placeholder.com/300?text=Dessert",
        tacos: "https://via.placeholder.com/300?text=Tacos",
        lamb: "https://via.placeholder.com/300?text=Lamb",
        duck: "https://via.placeholder.com/300?text=Duck",
        turkey: "https://via.placeholder.com/300?text=Turkey",
        "beef stew": "https://via.placeholder.com/300?text=Beef+Stew",
        pork: "https://via.placeholder.com/300?text=Pork"
    };

    // List of dishes
    const dishes = Object.keys(dishImages);

    $scope.fetchPairings = async () => {
        let allPairingsHTML = `<div class="pairing-container" style="display: flex; flex-wrap: wrap; gap: 20px;">`;

        for (const dish of dishes) {
            try {
                const response = await fetch(
                    `https://Spoonacular-API.proxy-production.allthingsdev.co/food/wine/pairing?food=${dish}&maxPrice=150`,
                    requestOptions
                );
                const data = await response.json();

                if (data && data.pairingText && data.productMatches) {
                    const itemsHTML = data.productMatches.map(product => `
                        <div class="pairing-item" style="border: 1px solid #ddd; padding: 10px; width: 300px; text-align: center;">
                            <img src="${product.imageUrl}" alt="${product.title}" class="pairing-image" style="width: 100%; height: auto; border-radius: 5px;">
                            <h3>${dish.toUpperCase()} with ${product.title}</h3>
                            <p>${data.pairingText}</p>
                        </div>
                    `).join('');
                    allPairingsHTML += itemsHTML;
                } else {
                    // If no pairing suggestions, use static dish images
                    allPairingsHTML += `
                        <div class="pairing-item" style="border: 1px solid #ddd; padding: 10px; width: 300px; text-align: center;">
                            <img src="${dishImages[dish]}" alt="${dish}" class="pairing-image" style="width: 100%; height: auto; border-radius: 5px;">
                            <h3>No Pairing Suggestions for ${dish.toUpperCase()}</h3>
                        </div>
                    `;
                }
            } catch (error) {
                allPairingsHTML += `
                    <div class="pairing-item" style="border: 1px solid #ddd; padding: 10px; width: 300px; text-align: center;">
                        <img src="${dishImages[dish]}" alt="${dish}" class="pairing-image" style="width: 100%; height: auto; border-radius: 5px;">
                        <h3>Error Fetching Data for ${dish.toUpperCase()}</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }

        allPairingsHTML += `</div>`;
        document.getElementById("pairing-info").innerHTML = allPairingsHTML;
    };

    // Call the function to fetch data
    $scope.fetchPairings();

}]);
