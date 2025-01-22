const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "jGR3UmQMx9aXqbGfKEdXVNAfVNZsDIwmCjVchlp08gpr7hSG1R");
myHeaders.append("x-apihub-host", "Spoonacular-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "e8535e39-ba5f-494c-ac84-c9884da032fa");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

// Updated array with 10 recipe IDs
const recipeIds = [
    324694, 716429, 715538, 715394, 664303, 715447, 646263, 715495, 715544, 637571,
];

const fetchRecipes = async () => {
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = `<p>Loading recipes...</p>`;

    try {
        const recipePromises = recipeIds.map((id) =>
            fetch(
                `https://Spoonacular-API.proxy-production.allthingsdev.co/recipes/${id}/analyzedInstructions?stepBreakdown=true`,
                requestOptions
            ).then((response) => response.json())
        );

        const recipeData = await Promise.all(recipePromises);

        recipeContainer.innerHTML = recipeData
            .map((data, index) => {
                const recipeImage = `https://spoonacular.com/recipeImages/${recipeIds[index]}-636x393.jpg`;

                // Ensure data exists before attempting to access its properties
                if (!data || !data.length) {
                    return `
                        <div class="recipe-card">
                            <img src="${recipeImage}" alt="Recipe ${index + 1}" class="recipe-image">
                            <h3>Recipe ${index + 1}</h3>
                            <p>No instructions available for this recipe.</p>
                        </div>
                    `;
                }

                // Mapping the instructions for this recipe
                const instructionsHTML = data
                    .map(
                        (instruction) => `
                            <h4>${instruction.name || "Steps"}</h4>
                            <ol>
                                ${instruction.steps
                                    .map((step) => `<li>${step.step}</li>`)
                                    .join("")}
                            </ol>
                        `
                    )
                    .join("");

                return `
                    <div class="recipe-card">
                        <img src="${recipeImage}" alt="Recipe ${index + 1}" class="recipe-image">
                        <h3>Recipe ${index + 1}</h3>
                        ${instructionsHTML}
                    </div>
                `;
            })
            .join("");
    } catch (error) {
        recipeContainer.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
    }
};

fetchRecipes();
