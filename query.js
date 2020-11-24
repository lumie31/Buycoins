export const query = `
  {
  viewer {
    login
    name
    avatarUrl
    bio
    location
    email
    status {
      emoji
      emojiHTML
      message
    }
    twitterUsername
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(last: 10, privacy: PUBLIC) {
      nodes {
        name
        description
        updatedAt
      }
    }
    starredRepositories {
      totalCount
    }
  }
}

`;
