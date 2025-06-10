#!/bin/bash

# Load environment variables
source ../.env

# Usage / Help
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 input-file.sql"
  echo ""
  echo "Example:"
  echo "  $0 my-data-export.sql"
  exit 1
fi

SQL_FILE="$1"

if [[ ! -f "$SQL_FILE" ]]; then
  echo "❌ File not found: $SQL_FILE"
  exit 1
fi

# Import the data
psql "$DATABASE_URL" < "$SQL_FILE"

if [[ $? -ne 0 ]]; then
  echo "❌ FAILED: Importing data from $SQL_FILE"
  exit 1
else
  echo "✅ SUCCESS: Imported data from $SQL_FILE"
  exit 0
fi
