import axios from 'axios';
import dotenv from 'dotenv';
import Notion from './src/models/notion.models.js';
dotenv.config();

const { NOTION_KEY, NOTION_DATABASE_ID, ACTION_URL, DISPATCH_ACTION } = process.env;

let currentMoviesWithoutData = [];

const notion = new Notion(NOTION_KEY, NOTION_DATABASE_ID);

async function main () {
  currentMoviesWithoutData = await notion.getItemsWithoutData();
  if (currentMoviesWithoutData.length > 0) {
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
  setInterval(main, 30000);
})();
