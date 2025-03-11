class User {
    constructor(username) {
        this.username = username;
        this.scoreHistory = [];
    }
}

class Question {
    constructor(text, choices, correctAnswer) {
        this.text = text;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }

    isCorrect(answer) {
        return answer === this.correctAnswer;
    }
}


class Quiz {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    nextQuestion() {
        return this.questions[this.currentIndex++];
    }

    checkAnswer(answer) {
        if (this.questions[this.currentIndex - 1].isCorrect(answer)) {
            this.score++;
        }
    }

    isFinished() {
        return this.currentIndex >= this.questions.length;
    }
}