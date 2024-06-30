"use strict";

import { displayData, setupNavLinks } from "./ui.js";
import { displayDetailsPage } from "./details.js";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "4f0c17468dmsha1bf65a42ce62edp1ec202jsn49b669d42f7d",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

const cache = new Map();

export async function getGames(category) {
  if (cache.has(category)) {
    displayData(cache.get(category));
    return;
  }
  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    cache.set(category, result);
    displayData(result);
  } catch (error) {
    console.error("Error fetching games:", error);
    alert("Failed to fetch games. Please try again later.");
  }
}

export async function gamesDetails(id) {
  try {
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    displayDetailsPage(result);
  } catch (error) {
    console.error("Error fetching game details:", error);
    alert("Failed to fetch game details. Please try again later.");
  }
}

setupNavLinks();
getGames("MMORPG");
