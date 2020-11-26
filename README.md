# BuyCoins | Frontend Engineer Assessment 
[![Netlify Status](https://api.netlify.com/api/v1/badges/a8746e28-bd22-4263-bd4c-e3d014ac6286/deploy-status)](https://app.netlify.com/sites/buycoins-githubclone/deploys)

<div align="center">
  <br>
  <img src="./assets/buycoins-logo.jpg" alt="buycoins-logo" width="400">
  <br><br>
</div>

## Description
This project is a re-creation of my GitHub profile "repositories" tab leveraging the GraphQL GitHub API

## Tools and Technologies used
- HTML
- CSS
- JavaScript
- GraphQL API Explorer

## Some Issues I encountered
1. This project is my first experience working with the GraphQL GitHub API. Even though I'm familiar with the idea behind GraphQL, getting a hang of the API posed an issue at first. 
1. The case of my GitHub personal access token deleting by itself after pushing to GitHub.
 <https://stackoverflow.com/questions/53579650/github-api-personal-access-token-removes-itself> 

1. The case of my font-family not working correctly when I tested with apple devices (I use a Windows PC)
## How I fixed them / Things I learnt
1. I got the grasp of the GraphQL API Explorer and everything became clear onwards. 
1. I learnt that GitHub deletes it access token (single string) whenever it's committed to a GitHub repository.  So my walkaround this was to break the access token into several variables and concatenate them at the point of Authorizing. This meant that the token wasn't coming as a single string but as several variables concatenated together. (A better solution would have been storing my secret in a `.env` file and ignoring it using a `.gitignore` file but since I didn't want to use any `npm` module  for that purpose, hence my solution above)

1. The font-family Github uses is a default font on Windows so I didn't have to import an external font. Testing on a Windows machine and Android seemed fine until I tested the project on a Mac and an iPhone and noticed the font-family wasn't working. My walkaround this was to add a font-family fallback which catered for the Apple device space and this solved the issue of breaking font-family

## General Comment
It was both a fun and challenging experience working on this project. Going through the question at first, I thought to myself, this is basic until I started working on it and saw that even as simple as the interface looked, it was a carefully thought-out one with several simple-looking complex components.
> Thank you for the opportunity to be a part of this. Hope to hear from you soon.

## Contribute?
No, you can't. This is a takehome assignment 🙄