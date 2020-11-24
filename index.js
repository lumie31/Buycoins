import { query } from "./query.js";
import { API_KEY } from "./token.js";

const data = { query };

const navImage = document.querySelector(".rightmenu__image");
const profileImage = document.querySelector(".userimage");
const username = document.querySelector(".username h2")
const handle = document.querySelector(".username p");
const status = document.querySelector(".status");
const statusEmoji = document.querySelector(".floating__status");
const statusEmojiMobile = document.querySelector(".mobile__status");
const role = document.querySelector(".job");
const email = document.querySelector(".contact .email");
const location = document.querySelector(".contact .location");
const twitter = document.querySelector(".contact .twitter__username");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const stars = document.querySelector(".stars");
const badgeValue = document.querySelector(".badge");
const repositories = document.querySelector(".repositories");

fetch(`https://api.github.com/graphql`, {
  method: "POST",
  headers: {
    "Authorization": `bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Success:", data.data.viewer);

    removeAllChildNodes(repositories);

    let apiResponse = data.data.viewer;

    profileImage.setAttribute("src", apiResponse.avatarUrl);
    navImage.setAttribute("src", apiResponse.avatarUrl);
    role.textContent = apiResponse.bio;
    status.textContent = apiResponse.status.message;
    statusEmoji.innerHTML = apiResponse.status.emojiHTML;
    statusEmojiMobile.innerHTML = `${apiResponse.status.emojiHTML} ${apiResponse.status.message}`;
    username.textContent = apiResponse.name;
    handle.textContent = apiResponse.login;
    email.textContent = apiResponse.email;
    location.textContent = apiResponse.location;
    twitter.textContent = apiResponse.twitterUsername;
    followers.textContent = apiResponse.followers.totalCount;
    following.textContent = apiResponse.following.totalCount;
    stars.textContent = apiResponse.starredRepositories.totalCount;
    badgeValue.textContent = apiResponse.repositories.nodes.length;

    apiResponse.repositories.nodes.forEach(
      (repo) => addChildNode(repo)
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const addChildNode = (repo) => {
  var repository = document.createElement("div");
  repository.className = "repository";

  var left = document.createElement("div");
  left.className = "left";

  var right = document.createElement("div");
  right.className = "right";

  var h3 = document.createElement("h3");
  h3.className = "repository__name";
  var h3TextNode = document.createTextNode(repo.name);
  h3.appendChild(h3TextNode);

  var p = document.createElement("p");
  p.className = "repository__desc";
  var pTextNode = document.createTextNode(repo.description ?? "");
  p.appendChild(pTextNode);

  var small = document.createElement("small");
  small.className = "updated";
  var smallTextNode = document.createTextNode(xDaysFromNow(repo.updatedAt));
  small.appendChild(smallTextNode);

  var i = document.createElement("i")
  i.className = "far fa-star";

  var btn = document.createElement("button");
  btn.className = "star__btn";
  var btnTextNode = document.createTextNode(` Star`);
  btn.appendChild(i);
  btn.appendChild(btnTextNode);

  left.appendChild(h3);
  left.appendChild(p);
  left.appendChild(small);

  right.appendChild(btn);

  repository.appendChild(left);
  repository.appendChild(right);

  repositories.appendChild(repository);
}

const xDaysFromNow = (dateString) => {
  var today = new Date();
  var targetDate = new Date(dateString);
  var timeDiff = today.getTime() - targetDate.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + " days ago";
}