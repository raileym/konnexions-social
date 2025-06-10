#!/bin/bash

# Load environment variables
source ../.env

# Help message
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 [nouns-*.csv] [verbs-*.csv] ..."
  echo ""
  echo "nouns-*.csv format: singular,plural,gender"
  echo "verbs-*.csv format: infinitive,yo,tú,él/ella/usted,nosotros,vosotros,ellos/ellas/ustedes"
  exit 1
fi

for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ Skipping: '$file' is not a valid file"
    continue
  fi

  echo "📦 Processing: $file"

  while IFS=, read -r col1 col2 col3 col4 col5 col6 col7; do
    # Trim whitespace from all columns
    col1=$(echo "$col1" | xargs)
    col2=$(echo "$col2" | xargs)
    col3=$(echo "$col3" | xargs)
    col4=$(echo "$col4" | xargs)
    col5=$(echo "$col5" | xargs)
    col6=$(echo "$col6" | xargs)
    col7=$(echo "$col7" | xargs)

    # Skip blank or header lines
    [[ -z "$col1" || "$col1" == "infinitive" || "$col1" == "singular" ]] && continue

    if [[ "$file" == nouns* ]]; then
      # Expect: singular, plural, gender
      if [[ -z "$col2" || -z "$col3" ]]; then
        echo "⚠️ Skipping malformed noun row: '$col1, $col2, $col3'"
        continue
      fi
      psql "$DATABASE_URL" -c "SELECT public.ckn_insert_noun('$col1', '$col2', '$col3');" > /dev/null

    elif [[ "$file" == verbs* ]]; then
      # Expect: infinitive, yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes
      if [[ -z "$col2" || -z "$col3" || -z "$col4" || -z "$col5" || -z "$col6" || -z "$col7" ]]; then
        echo "⚠️ Skipping malformed verb row: '$col1,...'"
        continue
      fi
      psql "$DATABASE_URL" -c "SELECT public.ckn_insert_verb('$col1', '$col2', '$col3', '$col4', '$col5', '$col6', '$col7');" > /dev/null

    else
      echo "⚠️  Unrecognized file type: $file (must start with 'nouns' or 'verbs')"
      break
    fi
  done < "$file"

  echo "✅ Finished: $file"
done
