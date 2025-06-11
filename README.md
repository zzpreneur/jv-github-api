# GitHub Activity Tracker

A tool to track and analyze GitHub user activity across public repositories.

## Features

- Fetches user data from GitHub's public API
- Analyzes recent contributions across repositories
- Calculates top 3 event types per repository
- Identifies repositories owned by the user

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Program

To analyze a GitHub user's activity, run:

```
node src/index.js <github-username>
```

For example, to analyze the activity of user "ge0ffrey":

```
node src/index.js ge0ffrey
```

### Output Format

The program will display:

- A list of repositories the user has contributed to recently
- For each repository:
  - Repository name
  - Whether the user owns the repository
  - Top 3 most common event types and their counts

Example output:

```
Activity Analysis for ge0ffrey:
================================

Repository: ge0ffrey/repo1
Owner: Yes
Top 3 Event Types:
  - PushEvent: 5 events
  - PullRequestEvent: 3 events
  - IssueCommentEvent: 2 events

Repository: other-user/repo2
Owner: No
Top 3 Event Types:
  - PushEvent: 2 events
  - PullRequestEvent: 1 events
```

## Development

- Lint code:
  ```
  npm run lint
  ```
- Fix linting issues:
  ```
  npm run lint:fix
  ```

## API Endpoints

The application uses GitHub's public API endpoints:

- User events: `GET /users/{username}/events`
- Repository information: `GET /repos/{owner}/{repo}`
