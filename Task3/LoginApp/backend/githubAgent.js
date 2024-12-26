const axios = require("axios");
require("dotenv").config();

async function summarizeCommits(owner, repo) {
    try {
        // Get the list of commits using Octokit or a similar GitHub client
        const commits = await octokit.repos.listCommits({ owner, repo });
        const commitMessages = commits.data.map(commit => commit.commit.message);

        // Call Gork AI's summarization API
        const response = await axios.post(
            "https://api.gork.ai/v1/summarize", // Replace with the actual Gork AI endpoint
            {
                inputs: commitMessages.join("\n"), // Adjust payload format if required
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GORK_AI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Extract summarized content from Gork AI's response
        return response.data.summary;
    } catch (error) {
        console.error("Error summarizing commits:", error.message);
        throw error;
    }
}

module.exports = { summarizeCommits };
