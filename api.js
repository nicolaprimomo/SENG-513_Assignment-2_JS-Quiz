async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=3");
        const data = await response.json();

        return data.results.map(q => new Question(
            q.question,
            [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            q.correct_answer
        ));
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
}
