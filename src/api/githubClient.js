import axios from "axios";

class GitHubClient {
  constructor() {
    this.baseURL = "https://api.github.com";
    this.client = axios.create({
      baseURL: this.baseURL,
    });
  }

  async getUserEvents(username) {
    try {
      const response = await this.client.get(`/users/${username}/events`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch events for user ${username}: ${error.message}`
      );
    }
  }

  async getRepository(owner, repo) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch repository ${owner}/${repo}: ${error.message}`
      );
    }
  }
}

export default GitHubClient;
