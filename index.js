import { query, API_KEY } from "./config.js";

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
    "Authorization": `bearer ${API_KEY.split(",")[1]}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((data) => {
    // console.log("Success:", data.data.viewer);

    removeAllChildNodes(repositories);

    let apiResponse = data.data.viewer;

    profileImage.setAttribute("src", apiResponse.avatarUrl);
    navImage.setAttribute("src", apiResponse.avatarUrl);
    role.textContent = apiResponse.bio;
    status.textContent = apiResponse.status.message;
    statusEmoji.innerHTML =
      apiResponse.status.emojiHTML + `<span>${apiResponse.status.message}</span>`;
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
  // console.log(repo.languages.nodes[0])
  let repository = document.createElement("div");
  repository.className = "repository";

  let left = document.createElement("div");
  left.className = "left";

  let right = document.createElement("div");
  right.className = "right";

  let h3 = document.createElement("h3");
  h3.className = "repository__name";
  let h3TextNode = document.createTextNode(repo.name);
  h3.appendChild(h3TextNode);

  let p = document.createElement("p");
  p.className = "repository__desc";
  let pTextNode = document.createTextNode(repo.description ?? "");
  p.appendChild(pTextNode);

  let div = document.createElement("div");
  div.className = "repository__foot";

  let smallMain = document.createElement("small");
  smallMain.className = "repository__foot__grp";

  let spanColor = document.createElement("span");
  spanColor.className = "color__icon";
  spanColor.style.backgroundColor = repo.languages.nodes[0].color;

  let spanLang = document.createElement("span");
  spanLang.className = "language";
  let spanLangTextNode = document.createTextNode(repo.languages.nodes[0].name);
  spanLang.appendChild(spanLangTextNode);

  smallMain.appendChild(spanColor);
  smallMain.appendChild(spanLang);

  div.appendChild(smallMain)


  let small = document.createElement("small");
  small.className = "updated";
  let smallTextNode = document.createTextNode(yDaysFromNow(repo.updatedAt));
  small.appendChild(smallTextNode);

  div.appendChild(small);


  let i = document.createElement("i");
  i.className = "far fa-star";

  let btn = document.createElement("button");
  btn.className = "star__btn";
  let btnTextNode = document.createTextNode(` Star`);
  btn.appendChild(i);
  btn.appendChild(btnTextNode);

  left.appendChild(h3);
  left.appendChild(p);
  left.appendChild(div);

  right.appendChild(btn);

  repository.appendChild(left);
  repository.appendChild(right);

  repositories.appendChild(repository);
}

// const xDaysFromNow = (dateString) => {
//   let today = new Date();
//   let targetDate = new Date(dateString);
//   let timeDiff = today.getTime() - targetDate.getTime();
//   return "Updated " + Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + " days ago";
// }

const yDaysFromNow = (dateString) => {
  let months = [
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
  let targetDate = new Date(dateString);
  let month = targetDate.getMonth();
  let day = targetDate.getDate();
  let result = `${months[month]} ${day}`
  return `Updated on ${result}`;
};