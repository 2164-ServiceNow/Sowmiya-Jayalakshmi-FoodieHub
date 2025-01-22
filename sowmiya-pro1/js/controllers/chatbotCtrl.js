app.controller('chatbotCtrl', ['$scope', function ($scope) {
    const chatbot = {
        responses: {
            "hello": "👋 Hi there! Ready to explore some delicious food ideas? 🍔",
            "how are you": "I'm great! Always ready to chat about food and recipes. 🍳",
            "tell me a joke": "Why don’t eggs tell jokes? Because they’d crack each other up! 😂🥚",
            "what's your favorite food": "Pizza! 🍕 What's your favorite?",
            "what is a healthy breakfast": "A healthy breakfast includes oats 🥣, eggs 🥚, and fruits 🍎.",
            "what's a quick snack": "Try popcorn 🍿 or mixed nuts 🥜 for a quick snack!",
            "what is your name": "I'm FoodieBot, your virtual food assistant! 🍽",
            "tell me a recipe": "Sure! How about avocado toast 🥑? Mash avocado, spread on toast, and season with salt & pepper.",
            "what are superfoods": "Superfoods are nutrient-rich foods like blueberries 🫐, kale 🥬, and quinoa 🍚.",
            "what's the best dessert": "Chocolate cake! 🍰 It's hard to beat!",
            "tell me about spices": "Spices like turmeric 🌿, cinnamon 🍂, and paprika 🌶 add flavor and health benefits.",
            "what's comfort food": "Mac and cheese 🧀 or soup 🍲 are classic comfort foods.",
            "what are vegan options": "Hummus with veggies 🥕, tofu stir-fry 🍜, and quinoa salad 🥗 are great vegan options.",
            "what's popular worldwide": "Coffee ☕ is the most consumed drink globally!",
            "bye": "Goodbye! Don't forget to eat something delicious! 🍩",
            "default": "I’m sorry, I didn’t get that. Ask me something about food! 🍕"
        },

        getResponse(question) {
            const lowerCaseQuestion = question.toLowerCase();
            return this.responses[lowerCaseQuestion] || this.responses["default"];
        }
    };

    // DOM Elements
    $scope.chatWindow = document.getElementById("chat-window");
    $scope.userInput = document.getElementById("user-input");
    
    // Display message function
    $scope.displayMessage = function(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        const textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.textContent = message;
        messageDiv.appendChild(textDiv);
        $scope.chatWindow.appendChild(messageDiv);
        $scope.chatWindow.scrollTop = $scope.chatWindow.scrollHeight;
    };

    // Handle user input
    $scope.handleUserInput = function() {
        const userText = $scope.userInput.value.trim();
        if (userText) {
            $scope.displayMessage(userText, "user");
            const botResponse = chatbot.getResponse(userText);
            $scope.displayMessage(botResponse, "bot");
            $scope.userInput.value = ""; // Clear input
        }
    };

    // Event Listeners
    document.getElementById("send-button").addEventListener("click", function() {
        $scope.handleUserInput();
    });

    $scope.userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            $scope.handleUserInput();
        }
    });
}]);
