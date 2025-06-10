#!/bin/bash

# Load environment variables from .env file
source ../.env

psql "$DATABASE_URL" < ./ckn_tts_cache_data.sql
