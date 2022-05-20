import dotenv from 'dotenv';
import compareBatches from './src/services/compareBatches.js';
import Notion from './src/models/notion.models.js';
import dispatchAction from './src/services/dispatchAction.js';
dotenv.config();

const { NOTION_KEY, NOTION_DATABASE_ID, ACTION_URL, DISPATCH_ACTION } = process.env;

let lastBatch = [];
const waitingTime = 60_000;

const notion = new Notion(NOTION_KEY, NOTION_DATABASE_ID);

async function main () {
  const newBatch = await notion.getItemsWithoutData();
  const hasMovies = newBatch.length > 0;
  const isNewBatch = compareBatches(lastBatch, newBatch);

  if (hasMovies && isNewBatch) {
    lastBatch = newBatch;
    dispatchAction(ACTION_URL, DISPATCH_ACTION, 'cinema-new-item');
  }
}

(async function () {
  main();
  setInterval(main, waitingTime);
})();
