#!/bin/bash

# Load environment variables
source ../.env

# Usage / Help
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 output-file.sql"
  echo ""
  echo "Example:"
  echo "  $0 my-data-export.sql"
  exit 1
fi

SQL_FILE="$1"

# Export selected tables
pg_dump --data-only \
  --table=public.ckn_tts_cache \
  --table=public.ckn_nouns \
  --table=public.ckn_verbs \
  --column-inserts \
  --dbname="$DIRECT_CONNECT_URL" \
  --file="$SQL_FILE"

if [[ $? -ne 0 ]]; then
  echo "❌ FAILED: Exporting data from tables."
  exit 1
else
  echo "✅ SUCCESS: Exported to $SQL_FILE"
  exit 0
fi
