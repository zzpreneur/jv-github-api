import ActivityAnalyzer from "./services/activityAnalyzer.js";

async function main() {
  try {
    const username = process.argv[2];
    if (!username) {
      console.error("Please provide a GitHub username as an argument");
      process.exit(1);
    }

    const analyzer = new ActivityAnalyzer();
    const results = await analyzer.analyzeUserActivity(username);

    console.log(`\nActivity Analysis for ${username}:`);
    console.log("================================\n");

    for (const [repoName, data] of Object.entries(results)) {
      console.log(`Repository: ${repoName}`);
      console.log(`Owner: ${data.isOwner ? "Yes" : "No"}`);
      console.log("Top 3 Event Types:");
      data.topEvents.forEach(({ type, count }) => {
        console.log(`  - ${type}: ${count} events`);
      });
      console.log("\n");
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
