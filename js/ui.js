"use strict";

import { setupDetailsListeners } from "./details.js";
import { getGames } from "./index.js";
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
export const row = document.querySelector("#games .row");

class card {
  constructor(iid, thum, titles, desc, gen, plat) {
    this.id = iid;
    this.thumbnail = thum;
    this.title = titles;
    this.genre = gen;
    this.platform = plat;
    this.short_description = desc;
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function handleNavLinkClick(e) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  e.target.classList.add("active");

  const category = e.target.textContent.trim().toLowerCase();
  row.innerHTML = `<div class="loader-container gy-0 position-absolute top-0 start-0 d-flex align-items-center justify-content-center w-100 h-100"><div class="loader"></div></div>
`;

  getGames(category);
}

const debouncedHandleNavLinkClick = debounce(handleNavLinkClick, 300);

export function setupNavLinks() {
  navLinks.forEach((ele) => {
    ele.addEventListener("click", debouncedHandleNavLinkClick);
  });
}

let mainSrc;
export function displayData(games) {
  const fragment = document.createDocumentFragment();
  games.forEach((ele) => {
    const box = document.createElement("div");
    let gamme = new card(
      ele.id,
      ele.thumbnail,
      ele.title,
      ele.short_description,
      ele.genre,
      ele.platform
    );
    box.className = "box col-lg-3 col-md-4 col-sm-6";
    box.innerHTML = `
        <div class="inner-box rounded-3" id="${gamme.id}">
          <div class="card-img px-3 pt-3">
            <img src="${gamme.thumbnail}" alt="${gamme.title}" class="rounded-3" />
          </div>
          <div class="card-text">
            <div class="card-head d-flex px-3 justify-content-between align-items-center pt-3">
              <p class="card-title">${gamme.title}</p>
              <p class="card-fees p-2 rounded-3 ms-2">Free</p>
            </div>
            <div class="card-desc py-3 mb-2">
              <p class="px-3 text-center">${gamme.short_description}</p>
            </div>
            <div class="card-footer d-flex px-3 py-2 justify-content-between align-items-center">
              <p class="cate p-2 rounded-3 me-3">${gamme.genre}</p>
              <p class="player p-2 rounded-3">${gamme.platform}</p>
            </div>
          </div>
        </div>
      `;
    fragment.appendChild(box);
  });
  row.innerHTML = "";
  row.appendChild(fragment);
  setupDetailsListeners();
  // imgConverter();
}

// function imgConverter() {
//   let boxs = document.querySelectorAll(".box .inner-box");
//   boxs.forEach((box) => {
//     box.addEventListener("mouseenter", () => {
//       let boxImg = box.children[0];
//       mainSrc = box.children[0].children[0].src;
//       let boxVidSrc = mainSrc.replace("thumbnail.jpg", "videoplayback.webm");
//       boxImg.innerHTML = `<video muted autoplay ><source src="${boxVidSrc}" class ="w-100"></video>`;
//     });
//     box.addEventListener("mouseleave", () => {
//       let videoEle = box.children[0];

//       let boxImgSrc = mainSrc;
//       videoEle.innerHTML = `<img src="${boxImgSrc}" class="rounded-3" />`;
//     });
//   });
// }
