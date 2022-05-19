import axios from 'axios';
import dotenv from 'dotenv';
import compareBatches from './src/compareBatches.js';
import Notion from './src/models/notion.models.js';
dotenv.config();

const { NOTION_KEY, NOTION_DATABASE_ID, ACTION_URL, DISPATCH_ACTION } = process.env;

let lastBatch = [];
const waitingTime = 60_000;

const notion = new Notion(NOTION_KEY, NOTION_DATABASE_ID);

async function main () {
  const currentMoviesWithoutData = await notion.getItemsWithoutData();
  const hasMovies = currentMoviesWithoutData.length > 0;
  const isNewBatch = compareBatches(lastBatch, currentMoviesWithoutData);

  if (hasMovies && isNewBatch) {
    lastBatch = currentMoviesWithoutData;
    await axios.post(`${ACTION_URL}`,
      { event_type: 'cinema-new-item' },
      {
        headers: {
          Accept: 'application/vnd.github.everest-preview+json',
          Authorization: `token ${DISPATCH_ACTION}`
        }
      }
    );
  }
}

(async function () {
  main();
  setInterval(main, waitingTime);
})();
