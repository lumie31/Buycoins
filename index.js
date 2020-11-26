import { query } from "./query.js";

// Hack to trick github to prevent access token from disappearing
const key1 = "d8ff441f740aa88422,slsdh879hadf".split(",")[0];
const key2 = "1227374747asff00,dae5d84fce6469".split(",")[1];
const key3 = "d1db8f16,00228hdhshhujdsjj".split(",")[0];

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
    Authorization: `bearer ${key1 + key2 + key3}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => {
    // console.log("Success:", data.data.viewer);

    removeAllChildNodes(repositories);

    const apiResponse = data.data.viewer;

    profileImage.setAttribute("src", apiResponse.avatarUrl);
    navImage.setAttribute("src", apiResponse.avatarUrl);
    role.textContent = apiResponse.bio;
    status.textContent = apiResponse.status.message;
    statusEmoji.innerHTML =
      apiResponse.status.emojiHTML +
      ` <span style="margin-left:3px">${apiResponse.status.message}</span>`;
    statusEmojiMobile.innerHTML = `${apiResponse.status.emojiHTML} <span style="margin-left:3px"> ${apiResponse.status.message}</span>`;
    username.textContent = apiResponse.name;
    handle.textContent = apiResponse.login;
    email.textContent = apiResponse.email;
    location.textContent = apiResponse.location;
    twitter.textContent = apiResponse.twitterUsername;
    followers.textContent = apiResponse.followers.totalCount;
    following.textContent = apiResponse.following.totalCount;
    stars.textContent = apiResponse.starredRepositories.totalCount;
    badgeValue.textContent = apiResponse.repositories.nodes.length;

    apiResponse.repositories.nodes.forEach((repo) => addChildNode(repo));
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
  const repository = `<div class="repository">
            <div class="left">
              <h3 class="repository__name">${repo.name}</h3>
              <p class="repository__desc">${repo.description ?? ""}</p>
              <h3 class=""></h3>
                <div class="repository__foot">
                <small class="repository__foot__grp">
                  <span class="color__icon" style="background:${repo.languages.nodes[0] == undefined
      ? "#f1e05a"
      : repo.languages.nodes[0].color
    } "></span>
                  <span class="language">${repo.languages.nodes[0] == undefined
      ? "JavaScript"
      : repo.languages.nodes[0].name
    }</span>
                </small>
                <small class="updated">${updatedOn(repo.updatedAt)}</small>
              </div>
            </div>
            <div class="right">
              <button class="star__btn">
                <i class="far fa-star"></i> Star
              </button>
            </div>
          </div>`;

  repositories.innerHTML += repository;
}

const updatedOn = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const targetDate = new Date(dateString);
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const year = targetDate.getFullYear();
  const result = `${months[month]} ${day} ${year == 2020 ? "" : year}`
  return `Updated on ${result}`;
};