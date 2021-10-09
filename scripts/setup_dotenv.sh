#!bin/bash
set -e

echo "NOTION_API_KEY=\"$NOTION_API_KEY\"" >> .env
echo "NOTION_TODO_DATABASE_ID=\"$NOTION_TODO_DATABASE_ID\"" >> .env
