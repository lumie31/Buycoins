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
    repositories(last: 10, privacy: PUBLIC) {
      nodes {
        name
        description
        updatedAt
        languages(last:10) {
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

// GitHub access token - This should be secret. I tried putting this in a separate file and adding the file in a .gitignore but the file couldn't be accessed in production, hence my reason for exposing it.
export const API_KEY = "0f759c9da2be4b8979b974c574f6c1287e61f46a";