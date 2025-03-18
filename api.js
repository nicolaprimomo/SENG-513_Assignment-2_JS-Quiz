function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

async function fetchQuestions() {
    console.log("Calling Trivia API...");

    try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        if (!response.ok) throw new Error("Hmm... something’s off! Check your internet or try again in a bit.");
        
        const data = await response.json();
        console.log("Raw API response:", data);

        if (!data.results || data.results.length === 0) {
            console.warn("API returned no questions.");
            return [];
        }

        return data.results.map(q => new Question(
            decodeHTML(q.question),
            [...q.incorrect_answers.map(decodeHTML), decodeHTML(q.correct_answer)].sort(() => Math.random() - 0.5),
            decodeHTML(q.correct_answer)
        ));
    } catch (error) {
        console.error("API Fetch Error:", error);
        alert("Failed to load quiz. Try again later.");
        return [];
    }
}