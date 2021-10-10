const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_TODO_DATABASE_ID;

  const { message } = JSON.parse(event.body);

  const {
    title,
    canDelegateAfterPlanning = false,
    category,
    createdDate,
    doneDate,
    dueDate,
    priority,
    size,
    stakeholders,
    status,
    types,
  } = message;
  try {
    let properties = {
      Task: { title: [{ text: { content: title } }] },
      'Can delegate after planning': { checkbox: canDelegateAfterPlanning },
      'Created Date': {
        date: { start: createdDate || new Date().toISOString().split('T')[0] },
      },
    };

    if (category) {
      properties = { ...properties, Category: { select: { name: category } } };
    }

    if (doneDate) {
      properties = {
        ...properties,
        'Done Date': { date: { start: doneDate } },
      };
    }

    if (dueDate) {
      properties = { ...properties, 'Due Date': { date: { start: dueDate } } };
    }

    if (priority) {
      properties = { ...properties, Priority: { select: { name: priority } } };
    }

    if (size) {
      properties = { ...properties, Size: { select: { name: size } } };
    }

    if (stakeholders) {
      properties = {
        ...properties,
        Stakeholders: { rich_text: [{ text: { content: stakeholders } }] },
      };
    }

    if (status) {
      properties = { ...properties, Status: { select: { name: status } } };
    }

    if (types?.length > 0) {
      const typesMultiSelect = types.map((type) => ({ name: type }));
      properties = { ...properties, Type: { multi_select: typesMultiSelect } };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    });
    console.log(response);
    console.log('Success! Entry added.');
    return {
      statusCode: 200,
      // update to use the correct response
      body: JSON.stringify(
        {
          message: 'Test response',
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(error.body);
  }
};
