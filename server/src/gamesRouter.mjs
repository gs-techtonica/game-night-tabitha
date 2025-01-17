import express from "express";
import got from "got";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const router = express.Router();

router.get("/", async ({ query: { name } }, response) => {
  const { games } = await bga("search", { searchParams: { name } });
  response.json(games);
});

const bga = got.extend({
  prefixUrl: "https://api.boardgameatlas.com/api/",
  responseType: "json",
  resolveBodyOnly: true,
  searchParams: { client_id: process.env.GAME_API_KEY },
});

export default router;
