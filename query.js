export const query = `
  {
  viewer {
    login
    avatarUrl
    bio
    company
    email
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 10, privacy: PUBLIC) {
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
