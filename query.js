export const query = `
  {
  viewer {
    login
    name
    url
    avatarUrl
    bio
    company
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
    repositories(first:20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        description
        updatedAt
        languages(first:20) {
          nodes{
            color
            name
          }
        }
      }
    }
    starredRepositories {
      totalCount
    }
   
  }
}

`;
