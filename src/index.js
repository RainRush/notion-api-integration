import { Client } from '@notionhq/client';
import config from 'config';

// implement a lambda function to call page create
// need to find out the properties and fill in the properties by the input
// implement another lambda function to list out

const notion = new Client({ auth: config.notion.apiKey });
const databaseId = config.notion.databases.toDoList.id;

const listItems = async ({ databaseId }) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const { results } = response;
    console.log(results[0]);
  } catch (e) {
    console.error(e.body);
  }
};

const addItem = async ({
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
}) => {
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
  } catch (error) {
    console.error(error.body);
  }
};

addItem({
  title: 'Test add item',
});
