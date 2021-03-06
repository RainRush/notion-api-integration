const { Client } = require('@notionhq/client');

exports.handler = async () => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_TODO_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response);
    return response;
  } catch (e) {
    console.error(e.body);
  }
};
