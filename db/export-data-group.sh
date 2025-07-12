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
  echo "  user     → user login tables"
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

# Get date and time suffix
STAMP=$(date +%Y-%m-%d-%H%M)

# Define group -> table mappings
declare -A GROUP_TABLES
GROUP_TABLES["tts"]="--table=private.ckn_tts_cache"
GROUP_TABLES["cost"]="--table=private.ckn_prompt_response"
GROUP_TABLES["user"]="--table=private.ckn_email_code"
GROUP_TABLES["all"]="\
--table=private.ckn_email_code \
--table=private.ckn_lesson \
--table=private.ckn_marketing_data \
--table=private.ckn_module \
--table=private.ckn_noun \
--table=private.ckn_noun_base \
--table=private.ckn_noun_example \
--table=private.ckn_noun_scenarios \
--table=private.ckn_paywall \
--table=private.ckn_prompt_response \
--table=private.ckn_scenarios \
--table=private.ckn_tts_cache \
--table=private.ckn_user_data \
--table=private.ckn_verb \
--table=private.ckn_verb_base \
--table=private.ckn_verb_example \
--table=private.ckn_verb_scenarios"
# Process each group
for GROUP in "$@"; do
  TABLES="${GROUP_TABLES[$GROUP]}"
  if [[ -z "$TABLES" ]]; then
    echo "⚠️ WARNING: Unknown group '$GROUP'. Skipping..."
    continue
  fi

  FILENAME="${PREFIX}-${GROUP}-${STAMP}.sql"

  echo "📦 Exporting group '$GROUP' → $FILENAME"

  pg_dump --data-only \
    $TABLES \
    --column-inserts \
    --dbname="$DIRECT_CONNECT_URL" \
    --file="$FILENAME"

  if [[ $? -ne 0 ]]; then
    echo "❌ FAILED: Export for group '$GROUP'"
  else
    echo "✅ SUCCESS: Exported '$GROUP' to $FILENAME"
  fi
done
