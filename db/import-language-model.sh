#!/bin/bash

# Load environment variables
source ../.env

# Help message
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 [nouns-*.json] [verbs-*.json] ..."
  echo ""
  echo "nouns-*.json format: nested scenario-keyed object with language-keyed csv strings"
  echo "verbs-*.json format: nested scenario-keyed object with language-keyed csv strings"
  exit 1
fi

for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ Skipping: '$file' is not a valid file"
    continue
  fi

  echo "📦 Processing: $file"

  if [[ "$file" == data-sets/nouns* ]]; then
    jq -c 'to_entries[] as $s |
      $s.value | to_entries[] |
      { base: .key, values: .value } |
      { scenario: $s.key, base: .base, translations: .values }' "$file" |
    while read -r entry; do
      scenario=$(echo "$entry" | jq -r '.scenario')
      base=$(echo "$entry" | jq -r '.base')
      for language in en es fr it; do
        csv=$(echo "$entry" | jq -r --arg lang "$language" '.translations[$lang]')
        [[ "$csv" == "null" || -z "$csv" ]] && continue
        IFS=',' read -r singular plural gender <<< "$csv"
        
        # Escape single quotes for SQL
        esc() { echo "$1" | sed "s/'/''/g"; }

        echo "Adding $base: $language"
        psql "$DATABASE_URL" -c "SELECT private.ckn_insert_noun(
          '$(esc "$base")',
          '$(esc "$singular")',
          '$(esc "$plural")',
          '$(esc "$gender")',
          '$(esc "$scenario")',
          '$(esc "$language")',
          true);" > /dev/null
      done
    done

  elif [[ "$file" == data-sets/verbs* ]]; then
    jq -c 'to_entries[] as $s |
      $s.value | to_entries[] |
      { base: .key, values: .value } |
      { scenario: $s.key, base: .base, translations: .values }' "$file" |
    while read -r entry; do
      scenario=$(echo "$entry" | jq -r '.scenario')
      base=$(echo "$entry" | jq -r '.base')
      for language in en es fr it; do
        csv=$(echo "$entry" | jq -r --arg lang "$language" '.translations[$lang]')
        [[ "$csv" == "null" || -z "$csv" ]] && continue
        IFS=',' read -r inf yo tu el_ella_usted noso voso ellos <<< "$csv"

        # Escape single quotes for SQL
        esc() { echo "$1" | sed "s/'/''/g"; }

        echo "Adding $base: $language"
        psql "$DATABASE_URL" -c "SELECT private.ckn_insert_verb(
          '$(esc "$base")',
          '$(esc "$inf")',
          '$(esc "$yo")',
          '$(esc "$tu")',
          '$(esc "$el_ella_usted")',
          '$(esc "$noso")',
          '$(esc "$voso")',
          '$(esc "$ellos")',
          '$(esc "$scenario")',
          '$(esc "$language")',
          true);" > /dev/null        
      done
    done

  else
    echo "⚠️  Unrecognized file type: $file (must start with 'nouns' or 'verbs')"
    exit 1
  fi

  echo "✅ Finished: $file"
done
