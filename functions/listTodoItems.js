const { Client } = require('@notionhq/client');

exports.handler = async ({ databaseId }) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_TODO_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const { results } = response;
    console.log(results.length);
    return response;
  } catch (e) {
    console.error(e.body);
  }
};
