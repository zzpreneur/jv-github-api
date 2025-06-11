import GitHubClient from "../api/githubClient.js";

class ActivityAnalyzer {
  constructor() {
    this.githubClient = new GitHubClient();
    this.eventTypeMap = {
      PushEvent: "commits",
      PullRequestEvent: "pull requests",
      IssueCommentEvent: "comments",
      PullRequestReviewCommentEvent: "review comments",
      CreateEvent: "repository creation",
      DeleteEvent: "repository deletion",
      ForkEvent: "forks",
      WatchEvent: "stars",
      IssuesEvent: "issues",
      ReleaseEvent: "releases",
      PublicEvent: "public repository",
      MemberEvent: "collaborator changes",
      CommitCommentEvent: "commit comments",
    };
  }

  async analyzeUserActivity(username) {
    try {
      const events = await this.githubClient.getUserEvents(username);
      const repoAnalysis = this._analyzeRepositories(events, username);
      return repoAnalysis;
    } catch (error) {
      throw new Error(
        `Failed to analyze activity for user ${username}: ${error.message}`
      );
    }
  }

  _getUserFriendlyEventType(eventType) {
    return this.eventTypeMap[eventType] || eventType;
  }

  _analyzeRepositories(events, username) {
    const repoAnalysis = {};

    events.forEach((event) => {
      const repoName = event.repo.name;
      const eventType = event.type;

      if (!repoAnalysis[repoName]) {
        repoAnalysis[repoName] = {
          eventTypes: {},
          isOwner: false,
        };
      }

      repoAnalysis[repoName].eventTypes[eventType] =
        (repoAnalysis[repoName].eventTypes[eventType] || 0) + 1;
    });

    for (const repoName in repoAnalysis) {
      const eventTypes = repoAnalysis[repoName].eventTypes;
      const sortedEvents = Object.entries(eventTypes)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([type, count]) => ({
          type: this._getUserFriendlyEventType(type),
          count,
        }));

      repoAnalysis[repoName].topEvents = sortedEvents;
      delete repoAnalysis[repoName].eventTypes;

      const [owner] = repoName.split("/");
      repoAnalysis[repoName].isOwner = owner === username;
    }

    return repoAnalysis;
  }
}

export default ActivityAnalyzer;
