#!/bin/bash

# Load environment variables from .env file
source ../.env

# Export data from public.ckn_tts_cache
pg_dump --data-only \
  --table=public.ckn_tts_cache \
  --column-inserts \
  --dbname="$DIRECT_CONNECT_URL" \
  --file=ckn_tts_cache_data.sql

# if [[ $? != 0 ]]; then
#   echo "FAILED: Exporting tts cache data."
#   exit 1
# else
#   echo "SUCCESS: Exported tts cache to ckn_tts_cache_data.sql"
#   exit 0
# fi
