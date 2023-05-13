import connectDatabase from "./database/db.js";
connectDatabase();

import { updateExpires_at, findExpires_at } from "./database/services.js";

let findVote = await findExpires_at();
let lastVote = findVote["expires_at"] * 1000;

setInterval(async () => {
  if (lastVote < Date.now()) {
    let response = await fetch("https://api.ragnatales.com.br/vote", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language":
          "pt-BR,pt;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5",
        "sec-ch-ua":
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-apitoken":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTgwOSwiZW1haWwiOiJ0aGV2ZW5ueXhAZ21haWwuY29tIiwiZ2VuZXJhdGVkQXQiOjE2ODMxNjc3NDIuNTY4NTAyLCJpcEFkZHJlc3MiOiIyNDBiOmMwMjA6NGIwOjk4MzE6ZWM2OTozOWUzOjYwN2Y6NTEwZCIsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTIuMC4wLjAgU2FmYXJpLzUzNy4zNiJ9.-V7dGND1FAi2nn1nS_dK19gPEgyl0V0UOr8Gx5EU9m0",
      },
      referrer: "https://www.ragnatales.com.br/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    });
    let jsonData = await response.json();
    let update = await updateExpires_at(jsonData.last_vote.expires_at);
    console.log(update);
    lastVote = jsonData.last_vote.expires_at * 1000;
  }
}, 60000);
