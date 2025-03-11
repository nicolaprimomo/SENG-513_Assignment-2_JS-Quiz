document.addEventListener("DOMContentLoaded", async function () {
    const quiz = new Quiz();
    const user = new User("Player1");

    // Fetch and add questions
    const questions = await fetchQuestions();
    questions.forEach(q => quiz.addQuestion(q));

    // Start quiz with generator
    const generator = quizGenerator(quiz);
    let currentQuestion = generator.next().value;

    displayQuestion(currentQuestion);

    // Handle answer submission
    document.getElementById("submit").addEventListener("click", function () {
        const selectedAnswer = document.querySelector("input[name='answer']:checked")?.value;

        if (!selectedAnswer) {
            alert("Please select an answer!");
            return;
        }

        currentQuestion = generator.next(selectedAnswer).value;

        if (typeof currentQuestion === "string") {
            document.getElementById("question-container").innerText = currentQuestion;
        } else {
            displayQuestion(currentQuestion);
        }
    }.bind(this)); // Using bind() to ensure 'this' refers to the correct context
});

function displayQuestion(question) {
    document.getElementById("question-text").innerText = question.text;
    document.getElementById("answers").innerHTML = question.choices.map(choice =>
        `<label><input type="radio" name="answer" value="${choice}"> ${choice}</label><br>`
    ).join("");
}
