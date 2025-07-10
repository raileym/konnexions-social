#!/usr/bin/env bash

# Load environment variables
source ../.env

# Help Message
if [[ $# -lt 2 ]]; then
  echo ""
  echo "Usage: $0 -file <prefix> [group1 group2 ...]"
  echo ""
  echo "Groups:"
  echo "  tts      → private.ckn_tts_cache"
  echo "  cost     → private.ckn_prompt_response"
  echo "  all      → all major tables"
  echo ""
  echo "Example:"
  echo "  $0 -file mybackup tts cost"
  echo ""
  exit 1
fi

# Parse -file flag
if [[ "$1" != "-file" ]]; then
  echo "❌ ERROR: First argument must be -file"
  exit 1
fi

PREFIX=$2
shift 2

# Optional override for suffix (latest by default)
LATEST_SUFFIX=$(ls -t ${PREFIX}-*.sql 2>/dev/null | head -n 1 | sed -E "s/^${PREFIX}-[^-]+-//" | sed 's/\.sql$//')

if [[ -z "$LATEST_SUFFIX" ]]; then
  echo "❌ ERROR: No matching backup files found for prefix '$PREFIX'"
  exit 1
fi

# Import each group
for GROUP in "$@"; do
  FILENAME="${PREFIX}-${GROUP}-${LATEST_SUFFIX}.sql"
  if [[ ! -f "$FILENAME" ]]; then
    echo "⚠️ WARNING: File not found: $FILENAME"
    continue
  fi

  echo "📥 Importing group '$GROUP' ← $FILENAME"

  psql "$DIRECT_CONNECT_URL" < "$FILENAME"

  if [[ $? -ne 0 ]]; then
    echo "❌ FAILED: Import for group '$GROUP'"
  else
    echo "✅ SUCCESS: Imported '$GROUP' from $FILENAME"
  fi
done
