#!/usr/bin/env bash

# Load environment variables
source ../.env

# Check for at least one file argument
if [[ $# -lt 1 ]]; then
  echo ""
  echo "Usage: $0 file1.sql [file2.sql ...]"
  echo ""
  echo "Each file will be imported using psql and \$DIRECT_CONNECT_URL"
  echo ""
  exit 1
fi

# Loop over all provided files
for FILE in "$@"; do
  if [[ ! -f "$FILE" ]]; then
    echo "⚠️ WARNING: File not found: $FILE"
    continue
  fi

  echo "📥 Importing file: $FILE"
  psql "$DIRECT_CONNECT_URL" < "$FILE"

  if [[ $? -ne 0 ]]; then
    echo "❌ FAILED: Import for $FILE"
  else
    echo "✅ SUCCESS: Imported $FILE"
  fi
done
