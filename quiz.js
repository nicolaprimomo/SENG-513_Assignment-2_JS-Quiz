class User {
    constructor(username) {
        this.username = username;
        this.scoreHistory = [];
    }

    saveScore(score, totalQuestions) {
        let percentage = Math.round((score / totalQuestions) * 100);
        this.scoreHistory.push(`${percentage}% (${score} out of ${totalQuestions})`);
    }

    displayUsername() {
        console.log(`User: ${this.username} is taking the quiz.`);
    }
}

class Question {
    constructor(text, choices, correctAnswer) {
        this.text = decodeHTML(text);
        this.choices = choices.map(choice => decodeHTML(choice));
        this.correctAnswer = decodeHTML(correctAnswer);
    }

    isCorrect(choice) {
        return choice === this.correctAnswer;
    }
}

class Quiz {
    constructor(user, questions) {
        this.user = user;
        this.questionGen = questionGenerator(questions);
        this.currentQuestion = this.questionGen.next();
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.currentQuestion.value;
    }

    checkAnswer(answer, button) {
        const correctAnswer = this.getCurrentQuestion()?.correctAnswer;
        if (!correctAnswer) return;

        const isCorrect = answer === correctAnswer;
        document.querySelectorAll("#choices button").forEach(btn => btn.disabled = true);

        if (isCorrect) {
            button.classList.add("correct");
            this.score++;
        } else {
            button.classList.add("incorrect");
            document.getElementById("correct-answer").innerText = `Correct Answer: ${correctAnswer}`;
            document.getElementById("correct-answer").style.display = "block";
        }

        setTimeout(() => {
            document.getElementById("correct-answer").style.display = "none";

            this.currentQuestion = this.questionGen.next(isCorrect);

            console.log("Next question coming up... Hope you’re ready!");

            if (this.isFinished()) {
                this.endQuiz();
            } else {
                renderQuestion(this);
            }
        }, 2000);
    }

    isFinished() {
        return this.currentQuestion.done;
    }

    endQuiz() {
        let percentage = Math.round((this.score / 5) * 100);
        this.user.saveScore(this.score, 5);
        document.getElementById("quiz").innerHTML = `
            <h2>Quiz Finished!</h2>
            <p>${this.user.username}, you scored ${percentage}% (${this.score} out of 5)</p>
            <h3>Score History:</h3>
            <div id="score-history-container">
                <ul id="score-history">${this.user.scoreHistory.map(score => `<li>${score}</li>`).join("")}</ul>
            </div>
        `;
    }
}