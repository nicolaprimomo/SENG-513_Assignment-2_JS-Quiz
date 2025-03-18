function startQuiz(username) {
    document.getElementById("username").style.display = "none";
    document.getElementById("username-label").style.display = "none";
    document.getElementById("start-quiz").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    fetchQuestions().then(questions => {
        if (questions.length === 0) return;
        currentUser = new User(username);
        currentUser.displayUsername();
        currentQuiz = new Quiz(currentUser, questions);
        renderQuestion(currentQuiz);
    });
}

function renderQuestion(quiz) {
    if (quiz.isFinished()) {
        quiz.endQuiz();
        return;
    }

    const current = quiz.getCurrentQuestion();
    document.getElementById("question").innerText = current.text;
    document.getElementById('choices').innerHTML = '';

    current.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;

        button.onclick = quiz.checkAnswer.bind(quiz, choice, button);

        document.getElementById('choices').appendChild(button);
    });
}
document.getElementById("start-quiz").addEventListener("click", () => startQuiz(document.getElementById("username").value.trim()));
