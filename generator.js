// Part 2 :
function* quizGenerator(quiz) {
    while (!quiz.isFinished()) {
        let question = quiz.nextQuestion();
        let userAnswer = yield question; // Yield question and wait for answer
        quiz.checkAnswer(userAnswer);
    }
    yield `Quiz Completed! Your final score: ${quiz.score}`;
}