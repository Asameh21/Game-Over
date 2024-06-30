"use strict";
import { row } from "./ui.js";
import { gamesDetails } from "./index.js";

const details = document.querySelector(".details");
const nav = document.querySelector("nav");
const section = document.querySelector("section");

class desc {
  constructor(thum, titles, gen, plat, stat, desc, url) {
    this.thumbnail = thum;
    this.title = titles;
    this.genre = gen;
    this.platform = plat;
    this.status = stat;
    this.description = desc;
    this.game_url = url;
  }
}

export function setupDetailsListeners() {
  row.addEventListener("click", (event) => {
    const card = event.target.closest(".inner-box");
    if (card) {
      gamesDetails(card.id);
    }
  });
}

function removeDetails() {
  details.classList.add("d-none");
  nav.classList.remove("d-none");
  section.classList.remove("d-none");
}

export function displayDetailsPage(result) {
  details.classList.remove("d-none");
  section.classList.add("d-none");
  nav.classList.add("d-none");
  let gameDesc = new desc(
    result.thumbnail,
    result.title,
    result.genre,
    result.platform,
    result.status,
    result.description,
    result.game_url
  );

  details.innerHTML = `
    <div class="container">
      <header class="d-flex justify-content-between align-items-center py-3">
        <h3>Details Game</h3>
        <div class="details-icon">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </header>
      <div class="row details-content gy-5">
        <div class="details-img col-lg-3 col-md-6">
          <img src="${gameDesc.thumbnail}" alt="${gameDesc.title}" class="w-100" />
        </div>
        <div class="details-text col-lg-9 col-md-6">
          <h3 class="title">Title: <span>${gameDesc.title}</span></h3>
          <p class="py-1 pb-2 category">
            Category: <span class="px-1 rounded-2">${gameDesc.genre}</span>
          </p>
          <p class="py-1 pb-2 platform">
            Platform: <span class="px-1 rounded-2">${gameDesc.platform}</span>
          </p>
          <p class="py-1 pb-3 status">
            Status: <span class="px-1 rounded-2">${gameDesc.status}</span>
          </p>
          <div class="desc mb-4">${gameDesc.description}</div>
          <div class="game-link">
            <a href="${gameDesc.game_url}" class="p-2 rounded-3 mt-3">Show Game</a>
          </div>
        </div>
      </div>
    </div>
    `;

  document
    .querySelector(".details-icon")
    .addEventListener("click", removeDetails);
}
