function* questionGenerator(questions) {
    let correctStreak = 0;
    for (let question of questions) {
        let difficulty = correctStreak >= 2 ? "hard" : correctStreak === 0 ? "easy" : "medium";
        console.log(`Yielding a ${difficulty} question`);
        const isCorrect = yield question;
        correctStreak = isCorrect ? correctStreak + 1 : 0;
    }
}