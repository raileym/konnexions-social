-- **********************************************************************
-- *** INITIAL SETUP: DROP FUNCTIONS, TABLES, TYPES, VIEWS, SCHEMAS ***
-- **********************************************************************

-- Optional: Uncomment if cryptographic functions are needed
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- **********************************************************************
-- DROP FUNCTIONS (PRIVATE)
-- **********************************************************************

DROP FUNCTION IF EXISTS private.ckn_get_user_data;
DROP FUNCTION IF EXISTS private.ckn_get_module_by_lesson_and_name;
DROP FUNCTION IF EXISTS private.ckn_get_noun_by_scenario;
DROP FUNCTION IF EXISTS private.ckn_get_verb_by_scenario;
DROP FUNCTION IF EXISTS private.ckn_insert_lesson;
DROP FUNCTION IF EXISTS private.ckn_insert_noun;
DROP FUNCTION IF EXISTS private.ckn_insert_noun_example;
DROP FUNCTION IF EXISTS private.ckn_insert_prompt_response;
DROP FUNCTION IF EXISTS private.ckn_insert_tts_cache;
DROP FUNCTION IF EXISTS private.ckn_insert_verb;
DROP FUNCTION IF EXISTS private.ckn_insert_verb_example;
DROP FUNCTION IF EXISTS private.ckn_lookup_noun_example;
DROP FUNCTION IF EXISTS private.ckn_lookup_tts_cache;
DROP FUNCTION IF EXISTS private.ckn_lookup_verb_example;
DROP FUNCTION IF EXISTS private.ckn_upsert_email_code;
DROP FUNCTION IF EXISTS private.ckn_upsert_user_data;
DROP FUNCTION IF EXISTS private.ckn_upsert_module;
DROP FUNCTION IF EXISTS private.ckn_verify_cooked_email;
DROP FUNCTION IF EXISTS private.ckn_verify_email_code;
DROP FUNCTION IF EXISTS private.ckn_upsert_marketing_data;
DROP FUNCTION IF EXISTS private.ckn_get_marketing_data;
DROP FUNCTION IF EXISTS private.ckn_upsert_marketing_preferences;
DROP FUNCTION IF EXISTS private.ckn_get_marketing_preferences;

-- **********************************************************************
-- DROP FUNCTIONS (PUBLIC SHIMS)
-- **********************************************************************

DROP FUNCTION IF EXISTS PUBLIC.ckn_lookup_noun_example;
DROP FUNCTION IF EXISTS public.ckn_get_user_data;
DROP FUNCTION IF EXISTS public.ckn_get_module_by_lesson_and_name;
DROP FUNCTION IF EXISTS public.ckn_get_noun_by_scenario;
DROP FUNCTION IF EXISTS public.ckn_get_verb_by_scenario;
DROP FUNCTION IF EXISTS public.ckn_insert_lesson;
DROP FUNCTION IF EXISTS public.ckn_insert_noun;
DROP FUNCTION IF EXISTS public.ckn_insert_noun_example;
DROP FUNCTION IF EXISTS public.ckn_insert_prompt_response;
DROP FUNCTION IF EXISTS public.ckn_insert_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_insert_verb;
DROP FUNCTION IF EXISTS public.ckn_insert_verb_example;
DROP FUNCTION IF EXISTS public.ckn_lookup_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_lookup_verb_example;
DROP FUNCTION IF EXISTS public.ckn_upsert_email_code;
DROP FUNCTION IF EXISTS public.ckn_upsert_user_data;
DROP FUNCTION IF EXISTS public.ckn_upsert_module;
DROP FUNCTION IF EXISTS public.ckn_verify_cooked_email;
DROP FUNCTION IF EXISTS public.ckn_verify_email_code;
DROP FUNCTION IF EXISTS public.ckn_upsert_marketing_data;
DROP FUNCTION IF EXISTS public.ckn_get_marketing_data;
DROP FUNCTION IF EXISTS public.ckn_upsert_marketing_preferences;
DROP FUNCTION IF EXISTS public.ckn_get_marketing_preferences;

-- **********************************************************************
-- DROP VIEWS
-- **********************************************************************

DROP VIEW IF EXISTS private.ckn_verb_forms;
DROP VIEW IF EXISTS private.ckn_noun_forms;
DROP VIEW IF EXISTS private.ckn_user_data_view;
DROP VIEW IF EXISTS private.ckn_tts_cache_view;

-- **********************************************************************
-- DROP INDEXES
-- **********************************************************************

DROP INDEX IF EXISTS private.ckn_email_code_index;

-- **********************************************************************
-- DROP TABLES
-- **********************************************************************

DROP TABLE IF EXISTS private.ckn_email_code;
DROP TABLE IF EXISTS private.ckn_tts_cache;
DROP TABLE IF EXISTS private.ckn_noun_example;
DROP TABLE IF EXISTS private.ckn_verb_example;
DROP TABLE IF EXISTS private.ckn_noun_scenarios;
DROP TABLE IF EXISTS private.ckn_verb_scenarios;
DROP TABLE IF EXISTS private.ckn_scenarios;
DROP TABLE IF EXISTS private.ckn_verb;
DROP TABLE IF EXISTS private.ckn_noun;
DROP TABLE IF EXISTS private.ckn_noun_base;
DROP TABLE IF EXISTS private.ckn_verb_base;
DROP TABLE IF EXISTS private.ckn_module;
DROP TABLE IF EXISTS private.ckn_lesson;
DROP TABLE IF EXISTS private.ckn_user_data;
DROP TABLE IF EXISTS private.ckn_prompt_response;
DROP TABLE IF EXISTS private.ckn_marketing_data;

-- **********************************************************************
-- DROP TYPES
-- **********************************************************************

DROP TYPE IF EXISTS private.ckn_noun_record;
DROP TYPE IF EXISTS private.ckn_verb_record;

-- **********************************************************************
-- DROP SCHEMA
-- **********************************************************************

DROP SCHEMA IF EXISTS private;
