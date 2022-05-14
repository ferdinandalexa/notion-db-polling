import { Client } from '@notionhq/client';

class Notion {
  constructor (NOTION_KEY, DATABASE_ID) {
    this.notion = new Client({ auth: NOTION_KEY });
    this.DATABASE_ID = DATABASE_ID;
  }

  async getItemsWithoutData () {
    const response = await this.notion.databases.query({
      database_id: this.DATABASE_ID,
      filter: {
        property: 'isFilled',
        checkbox: {
          equals: false
        }
      }
    }
    );
    return response.results;
  }
}

export default Notion;
