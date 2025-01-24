app.controller('quizCtrl', function ($timeout) {
  const quiz = this;
  quiz.isQuizActive = false;
  quiz.quizResult = null;
  quiz.isSpinning = false;

  // Offers for the wheel
  quiz.offers = [
    "10% Off on Salad 🥗",
    "Free Dessert 🍰",
    "Buy 1 Get 1 Free 🥤",
    "20% Off on Vegan 🌱",
    "Flat $5 Off 💰"
  ];

  // Questions for the quiz
  quiz.questions = [
    {
      text: "What fruit is known as 'nature's candy'?",
      options: [
        { text: "Dates", isCorrect: true },
        { text: "Apple", isCorrect: false },
        { text: "Banana", isCorrect: false },
        { text: "Mango", isCorrect: false }
      ]
    },
    {
      text: "Which vegetable is high in Vitamin A?",
      options: [
        { text: "Carrot", isCorrect: true },
        { text: "Broccoli", isCorrect: false },
        { text: "Cucumber", isCorrect: false },
        { text: "Potato", isCorrect: false }
      ]
    },
    {
      text: "Which plant is used to make guacamole?",
      options: [
        { text: "Avocado", isCorrect: true },
        { text: "Spinach", isCorrect: false },
        { text: "Basil", isCorrect: false },
        { text: "Parsley", isCorrect: false }
      ]
    },
    {
      text: "Which fruit is known as the 'king of fruits'?",
      options: [
        { text: "Mango", isCorrect: true },
        { text: "Apple", isCorrect: false },
        { text: "Orange", isCorrect: false },
        { text: "Pineapple", isCorrect: false }
      ]
    }
  ];

  // Start the quiz
  quiz.startQuiz = function () {
    quiz.isQuizActive = true;
    quiz.quizResult = null;
    quiz.quizQuestion = quiz.questions[Math.floor(Math.random() * quiz.questions.length)];
  };

  // Submit answer
  quiz.submitAnswer = function (option) {
    if (option.isCorrect) {
      quiz.quizResult = "Correct! 🎉 Spin the wheel!";
      quiz.canSpin = true;
    } else {
      quiz.quizResult = "Incorrect. 😔 Try again!";
      quiz.canSpin = false;
    }
  };

  // Spin the wheel
  quiz.spinWheel = function () {
    if (!quiz.canSpin || quiz.isSpinning) return;

    quiz.isSpinning = true;
    const randomSpin = Math.floor(Math.random() * 360);
    const totalRotation = 360 * 5 + randomSpin; // 5 full rotations + random
    const segmentAngle = 360 / quiz.offers.length;
    const selectedSegment = Math.floor((360 - (randomSpin % 360)) / segmentAngle);

    // Apply CSS rotation
    const spinWheel = document.getElementById("spin-wheel");
    spinWheel.style.transition = "transform 4s ease-out";
    spinWheel.style.transform = `rotate(${totalRotation}deg)`;

    // Show result after spin
    $timeout(() => {
      quiz.spinResult = quiz.offers[selectedSegment];
      quiz.isSpinning = false;
    }, 4000);
  };

  // Reset quiz
  quiz.resetQuiz = function () {
    quiz.quizResult = null;
    quiz.spinResult = null;
    quiz.isQuizActive = false;
    quiz.canSpin = false;
    quiz.startQuiz();
  };
});