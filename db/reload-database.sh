#!/bin/bash

# Load environment variables from .env file
source ../.env

# Import schema
psql $DATABASE_URL < ./drop.sql 2>&1 # > /dev/null
psql $DATABASE_URL < ./schema.sql 2>&1 # > /dev/null
if [[ $? != 0 ]]; then
  echo "FAILED: Reload database."
  exit 1
else
  exit 0
fi
