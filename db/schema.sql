-- ************************************************************************
-- DROP EXISTING ENTITIES
-- ************************************************************************

DROP FUNCTION IF EXISTS private.ckn_lookup_tts_cache;
DROP FUNCTION IF EXISTS private.ckn_insert_tts_cache;
DROP FUNCTION IF EXISTS private.ckn_insert_noun;
DROP FUNCTION IF EXISTS private.ckn_insert_verb;
DROP FUNCTION IF EXISTS private.ckn_lookup_verb_example;
DROP FUNCTION IF EXISTS private.ckn_insert_verb_example;
DROP FUNCTION IF EXISTS private.ckn_lookup_noun_examples;
DROP FUNCTION IF EXISTS private.ckn_insert_noun_example;
DROP FUNCTION IF EXISTS private.ckn_get_noun_by_scenario;
DROP FUNCTION IF EXISTS private.ckn_get_verb_by_scenario;

DROP FUNCTION IF EXISTS private.ckn_insert_lesson;
-- DROP FUNCTION IF EXISTS private.ckn_upsert_lesson;
-- DROP FUNCTION IF EXISTS private.ckn_get_lesson_by_signature;

DROP FUNCTION IF EXISTS private.ckn_upsert_module;

DROP FUNCTION IF EXISTS public.ckn_lookup_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_insert_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_insert_noun;
DROP FUNCTION IF EXISTS public.ckn_insert_verb;
DROP FUNCTION IF EXISTS public.ckn_get_noun_by_scenario;
DROP FUNCTION IF EXISTS public.ckn_get_verb_by_scenario;

-- DROP FUNCTION IF EXISTS public.ckn_upsert_lesson;
-- DROP FUNCTION IF EXISTS public.ckn_get_lesson_by_signature;

DROP FUNCTION IF EXISTS public.ckn_insert_lesson;

DROP VIEW IF EXISTS private.ckn_verb_forms;
DROP VIEW IF EXISTS private.ckn_noun_forms;

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

DROP TYPE IF EXISTS private.ckn_noun_record;
DROP TYPE IF EXISTS private.ckn_verb_record;

DROP SCHEMA IF EXISTS private;

-- ************************************************************************
-- CREATE PRIVATE SCHEMA
-- ************************************************************************

CREATE SCHEMA IF NOT EXISTS private;

-- ************************************************************************
-- CREATE TYPES
-- ************************************************************************

CREATE TYPE private.ckn_noun_record AS (
  noun_base TEXT,
  noun_singular TEXT,
  noun_plural TEXT,
  noun_gender TEXT,
  curated BOOLEAN
);

CREATE TYPE private.ckn_verb_record AS (
  verb_base TEXT,
  verb_infinitive TEXT,
  verb_yo TEXT,
  verb_tu TEXT,
  verb_el_ella_usted TEXT,
  verb_nosotros TEXT,
  verb_vosotros TEXT,
  verb_ellos_ellas_ustedes TEXT,
  curated BOOLEAN
);

-- ************************************************************************
-- CREATE TABLES
-- ************************************************************************

CREATE TABLE private.ckn_tts_cache (
  tts_cache_key SERIAL PRIMARY KEY,
  tts_cache_signature TEXT UNIQUE NOT NULL,
  tts_cache_text TEXT NOT NULL,
  tts_cache_voice TEXT NOT NULL,
  tts_cache_language TEXT NOT NULL DEFAULT 'es-US',
  tts_cache_usage_count INTEGER NOT NULL DEFAULT 1,
  tts_cache_last_used TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  tts_cache_created TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE private.ckn_tts_cache IS 'CKN: Caches results from Google TTS service to avoid repeat synthesis.';

COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_signature IS 'SHA256 signature of normalized TTS input.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_text IS 'Original input text sent to TTS.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_voice IS 'TTS voice name used for synthesis.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_language IS 'Language code like es-US.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_usage_count IS 'How many times this entry was accessed.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_last_used IS 'Last time this cache entry was served.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_created IS 'Time this cache entry was created.';

-- ==================================================================
-- LESSON
-- ==================================================================

-- CREATE TABLE private.ckn_lesson (
--   lesson_key SERIAL PRIMARY KEY,

--   lesson_id INTEGER,
--   lesson_signature TEXT UNIQUE,

--   lesson_name TEXT,
--   lesson_description TEXT,

--   lesson_target_language TEXT,
--   lesson_source_language TEXT,
--   lesson_scenario TEXT,

--   lesson_participant_list TEXT,
--   lesson_prose TEXT,
--   lesson_translation JSONB,

--   dialog_draft JSONB,
--   dialog_review JSONB,
--   dialog_resolve JSONB,

--   nouns_draft JSONB,
--   nouns_review JSONB,
--   nouns_resolve JSONB,

--   verbs_draft JSONB,
--   verbs_review JSONB,
--   verbs_resolve JSONB,

--   verbs_expanded_complete JSONB,
--   verbs_expanded_incomplete JSONB,
--   verbs_expanded_triple JSONB
-- );

CREATE TABLE private.ckn_lesson (
  lesson_key SERIAL PRIMARY KEY,

  lesson_id TEXT UNIQUE,
  lesson_number INTEGER,
  lesson_uuid TEXT,
  lesson_timestamp TIMESTAMP,

  lesson_name TEXT,
  lesson_description TEXT,

  lesson_target_language TEXT,
  lesson_source_language TEXT,
  lesson_scenario TEXT,

  lesson_participant_list TEXT,
  lesson_prose TEXT
);


-- ==================================================================
-- MODULE
-- ==================================================================

CREATE TABLE private.ckn_module (
  module_key SERIAL PRIMARY KEY,

  lesson_id TEXT REFERENCES private.ckn_lesson(lesson_id) ON DELETE CASCADE,

  module_name TEXT NOT NULL,  -- e.g., 'dialog_draft', 'nouns_review', etc.
  module_content JSONB NOT NULL,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE private.ckn_module
ADD CONSTRAINT unique_lesson_module UNIQUE (lesson_id, module_name);


-- ==================================================================
-- LANGUAGE-NEUTRAL CORE TABLES
-- ==================================================================

CREATE TABLE private.ckn_noun_base (
  noun_base_key SERIAL PRIMARY KEY,
  noun_base TEXT NOT NULL UNIQUE  -- e.g., "table", "waiter"
);

CREATE TABLE private.ckn_verb_base (
  verb_base_key SERIAL PRIMARY KEY,
  verb_base TEXT NOT NULL UNIQUE  -- e.g., "to eat", "to have"
);

-- ==================================================================
-- LANGUAGE-SPECIFIC TABLES (SHARE STRUCTURE ACROSS ALL LANGUAGES)
-- ==================================================================

CREATE TABLE private.ckn_noun (
  noun_key SERIAL PRIMARY KEY,
  noun_base_key INTEGER REFERENCES private.ckn_noun_base(noun_base_key) ON DELETE CASCADE,
  language TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  noun_singular TEXT NOT NULL,
  noun_plural TEXT NOT NULL,
  noun_gender TEXT CHECK (noun_gender IN ('m', 'f', 'n')),
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (noun_base_key, language)
);

CREATE TABLE private.ckn_verb (
  verb_key SERIAL PRIMARY KEY,
  verb_base_key INTEGER REFERENCES private.ckn_verb_base(verb_base_key) ON DELETE CASCADE,
  language TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  verb_infinitive TEXT NOT NULL,
  verb_yo TEXT,
  verb_tu TEXT,
  verb_el_ella_usted TEXT,
  verb_nosotros TEXT,
  verb_vosotros TEXT,
  verb_ellos_ellas_ustedes TEXT,
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (verb_base_key, language)
);

CREATE TABLE private.ckn_noun_example (
  noun_example_key SERIAL PRIMARY KEY,
  noun_key INTEGER NOT NULL REFERENCES private.ckn_noun(noun_key) ON DELETE CASCADE,
  noun_example_data JSONB NOT NULL,  -- e.g., sentence, context, tags, region
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE TABLE private.ckn_verb_example (
  verb_example_key SERIAL PRIMARY KEY,
  verb_key INTEGER NOT NULL REFERENCES private.ckn_verb(verb_key) ON DELETE CASCADE,
  verb_example_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==================================================================
-- SCENARIOS
-- ==================================================================

CREATE TABLE private.ckn_scenarios (
  scenario_key SERIAL PRIMARY KEY,
  scenario TEXT NOT NULL UNIQUE  -- 'restaurant', 'hotel', 'airport'
);

CREATE TABLE private.ckn_noun_scenarios (
  noun_key INTEGER REFERENCES private.ckn_noun(noun_key) ON DELETE CASCADE,
  scenario_key INTEGER REFERENCES private.ckn_scenarios(scenario_key) ON DELETE CASCADE,
  PRIMARY KEY (noun_key, scenario_key)
);

CREATE TABLE private.ckn_verb_scenarios (
  verb_key INTEGER REFERENCES private.ckn_verb(verb_key) ON DELETE CASCADE,
  scenario_key INTEGER REFERENCES private.ckn_scenarios(scenario_key) ON DELETE CASCADE,
  PRIMARY KEY (verb_key, scenario_key)
);

-- ************************************************************************
-- VIEWS
-- ************************************************************************

CREATE VIEW private.ckn_verb_forms AS
SELECT verb_key, verb_infinitive AS base, 'yo' AS person, verb_yo AS form FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'tú', verb_tu FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'él/ella/usted', verb_el_ella_usted FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'nosotros', verb_nosotros FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'vosotros', verb_vosotros FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'ellos/ellas/ustedes', verb_ellos_ellas_ustedes FROM private.ckn_verb;

CREATE VIEW private.ckn_noun_forms AS
SELECT noun_key, noun_singular AS form, 'singular' AS number FROM private.ckn_noun
UNION ALL
SELECT noun_key, noun_plural, 'plural' FROM private.ckn_noun;

-- ************************************************************************
-- RLS POLICIES
-- ************************************************************************

ALTER TABLE private.ckn_tts_cache ENABLE ROW LEVEL SECURITY;

-- Admins
CREATE POLICY "Supabase Admin can manage ckn_tts_cache" ON private.ckn_tts_cache
  FOR ALL TO supabase_auth_admin
  USING (true)
  WITH CHECK (true);

-- Authenticated users (read-only)
CREATE POLICY "Authenticated users can view ckn_tts_cache" ON private.ckn_tts_cache
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Service role (read/write)
CREATE POLICY "Service role can select ckn_tts_cache" ON private.ckn_tts_cache
  FOR SELECT TO service_role
  USING (true);

CREATE POLICY "Service role can insert ckn_tts_cache" ON private.ckn_tts_cache
  FOR INSERT TO service_role
  WITH CHECK (true);

-- ************************************************************************
-- INDEXES
-- ************************************************************************

CREATE INDEX idx_ckn_tts_cache_signature ON private.ckn_tts_cache(tts_cache_signature);
CREATE INDEX idx_ckn_tts_cache_last_used ON private.ckn_tts_cache(tts_cache_last_used);

-- ************************************************************************
-- FUNCTION: ckn_insert_lesson
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_lesson(
  arg_lesson_id INTEGER,
  arg_lesson_uuid TEXT,
  arg_lesson_signature TEXT,
  arg_lesson_name TEXT,
  arg_lesson_description TEXT,
  arg_lesson_target_language TEXT,
  arg_lesson_source_language TEXT,
  arg_lesson_scenario TEXT,
  arg_lesson_participant_list TEXT,
  arg_lesson_prose TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_lesson (
    lesson_id,
    lesson_number,
    lesson_uuid,
    lesson_timestamp,
    lesson_name,
    lesson_description,
    lesson_target_language,
    lesson_source_language,
    lesson_scenario,
    lesson_participant_list,
    lesson_prose
  ) VALUES (
    arg_lesson_id,
    arg_lesson_number,
    arg_lesson_uuid,
    arg_lesson_timestamp,
    arg_lesson_name,
    arg_lesson_description,
    arg_lesson_target_language,
    arg_lesson_source_language,
    arg_lesson_scenario,
    arg_lesson_participant_list,
    arg_lesson_prose
  )
  ON CONFLICT (lesson_signature) DO NOTHING;
END;
$$;

-- CREATE FUNCTION private.ckn_insert_lesson(
--   arg_lesson_id INTEGER,
--   arg_lesson_signature TEXT,
--   arg_lesson_name TEXT,
--   arg_lesson_description TEXT,
--   arg_lesson_target_language TEXT,
--   arg_lesson_source_language TEXT,
--   arg_lesson_scenario TEXT,
--   arg_lesson_participant_list TEXT,
--   arg_lesson_prose TEXT,
--   arg_lesson_translation JSONB,

--   arg_dialog_draft JSONB,
--   arg_dialog_review JSONB,
--   arg_dialog_resolve JSONB,

--   arg_nouns_draft JSONB,
--   arg_nouns_review JSONB,
--   arg_nouns_resolve JSONB,

--   arg_verbs_draft JSONB,
--   arg_verbs_review JSONB,
--   arg_verbs_resolve JSONB,

--   arg_verbs_expanded_complete JSONB,
--   arg_verbs_expanded_incomplete JSONB,
--   arg_verbs_expanded_triple JSONB
-- )
-- RETURNS VOID
-- LANGUAGE plpgsql
-- SECURITY INVOKER
-- AS $$
-- BEGIN
--   INSERT INTO private.ckn_lesson (
--     lesson_id,
--     lesson_signature,
--     lesson_name,
--     lesson_description,
--     lesson_target_language,
--     lesson_source_language,
--     lesson_scenario,
--     lesson_participant_list,
--     lesson_prose,
--     lesson_translation,
--     dialog_draft,
--     dialog_review,
--     dialog_resolve,
--     nouns_draft,
--     nouns_review,
--     nouns_resolve,
--     verbs_draft,
--     verbs_review,
--     verbs_resolve,
--     verbs_expanded_complete,
--     verbs_expanded_incomplete,
--     verbs_expanded_triple
--   ) VALUES (
--     arg_lesson_id,
--     arg_lesson_signature,
--     arg_lesson_name,
--     arg_lesson_description,
--     arg_lesson_target_language,
--     arg_lesson_source_language,
--     arg_lesson_scenario,
--     arg_lesson_participant_list,
--     arg_lesson_prose,
--     arg_lesson_translation,
--     arg_dialog_draft,
--     arg_dialog_review,
--     arg_dialog_resolve,
--     arg_nouns_draft,
--     arg_nouns_review,
--     arg_nouns_resolve,
--     arg_verbs_draft,
--     arg_verbs_review,
--     arg_verbs_resolve,
--     arg_verbs_expanded_complete,
--     arg_verbs_expanded_incomplete,
--     arg_verbs_expanded_triple
--   )
--   ON CONFLICT (lesson_signature) DO NOTHING;
-- END;
-- $$;

-- ************************************************************************
-- FUNCTION: ckn_upsert_module
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_module(
  arg_lesson_signature TEXT,
  arg_module_name TEXT,
  arg_module_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_module (
    lesson_signature,
    module_name,
    module_content
  ) VALUES (
    arg_lesson_signature,
    arg_module_name,
    arg_module_content
  )
  ON CONFLICT (lesson_signature, module_name) DO UPDATE SET
    module_content = EXCLUDED.module_content,
    updated_at = now();
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_upsert_lesson
-- ************************************************************************

-- CREATE FUNCTION private.ckn_upsert_lesson(
--   arg_lesson_id INTEGER,
--   arg_lesson_signature TEXT,
--   arg_lesson_name TEXT,
--   arg_lesson_description TEXT,
--   arg_lesson_target_language TEXT,
--   arg_lesson_source_language TEXT,
--   arg_lesson_scenario TEXT,
--   arg_lesson_participant_list TEXT,
--   arg_lesson_prose TEXT,
--   arg_lesson_translation JSONB,

--   arg_dialog_draft JSONB,
--   arg_dialog_review JSONB,
--   arg_dialog_resolve JSONB,

--   arg_nouns_draft JSONB,
--   arg_nouns_review JSONB,
--   arg_nouns_resolve JSONB,

--   arg_verbs_draft JSONB,
--   arg_verbs_review JSONB,
--   arg_verbs_resolve JSONB,

--   arg_verbs_expanded_complete JSONB,
--   arg_verbs_expanded_incomplete JSONB,
--   arg_verbs_expanded_triple JSONB
-- )
-- RETURNS VOID
-- LANGUAGE plpgsql
-- SECURITY INVOKER
-- AS $$
-- BEGIN
--   INSERT INTO private.ckn_lesson (
--     lesson_id,
--     lesson_signature,
--     lesson_name,
--     lesson_description,
--     lesson_target_language,
--     lesson_source_language,
--     lesson_scenario,
--     lesson_participant_list,
--     lesson_prose,
--     lesson_translation,
--     dialog_draft,
--     dialog_review,
--     dialog_resolve,
--     nouns_draft,
--     nouns_review,
--     nouns_resolve,
--     verbs_draft,
--     verbs_review,
--     verbs_resolve,
--     verbs_expanded_complete,
--     verbs_expanded_incomplete,
--     verbs_expanded_triple
--   ) VALUES (
--     arg_lesson_id,
--     arg_lesson_signature,
--     arg_lesson_name,
--     arg_lesson_description,
--     arg_lesson_target_language,
--     arg_lesson_source_language,
--     arg_lesson_scenario,
--     arg_lesson_participant_list,
--     arg_lesson_prose,
--     arg_lesson_translation,
--     arg_dialog_draft,
--     arg_dialog_review,
--     arg_dialog_resolve,
--     arg_nouns_draft,
--     arg_nouns_review,
--     arg_nouns_resolve,
--     arg_verbs_draft,
--     arg_verbs_review,
--     arg_verbs_resolve,
--     arg_verbs_expanded_complete,
--     arg_verbs_expanded_incomplete,
--     arg_verbs_expanded_triple
--   )
--   ON CONFLICT (lesson_signature) DO UPDATE SET
--     lesson_id = EXCLUDED.lesson_id,
--     lesson_name = EXCLUDED.lesson_name,
--     lesson_description = EXCLUDED.lesson_description,
--     lesson_target_language = EXCLUDED.lesson_target_language,
--     lesson_source_language = EXCLUDED.lesson_source_language,
--     lesson_scenario = EXCLUDED.lesson_scenario,
--     lesson_participant_list = EXCLUDED.lesson_participant_list,
--     lesson_prose = EXCLUDED.lesson_prose,
--     lesson_translation = EXCLUDED.lesson_translation,
--     dialog_draft = EXCLUDED.dialog_draft,
--     dialog_review = EXCLUDED.dialog_review,
--     dialog_resolve = EXCLUDED.dialog_resolve,
--     nouns_draft = EXCLUDED.nouns_draft,
--     nouns_review = EXCLUDED.nouns_review,
--     nouns_resolve = EXCLUDED.nouns_resolve,
--     verbs_draft = EXCLUDED.verbs_draft,
--     verbs_review = EXCLUDED.verbs_review,
--     verbs_resolve = EXCLUDED.verbs_resolve,
--     verbs_expanded_complete = EXCLUDED.verbs_expanded_complete,
--     verbs_expanded_incomplete = EXCLUDED.verbs_expanded_incomplete,
--     verbs_expanded_triple = EXCLUDED.verbs_expanded_triple;
-- END;
-- $$;

-- ************************************************************************
-- FUNCTION: ckn_get_lesson_by_signature
-- ************************************************************************

-- CREATE FUNCTION private.ckn_get_lesson_by_signature(arg_lesson_signature TEXT)
-- RETURNS TABLE (
--   lesson_key INTEGER,
--   lesson_id INTEGER,
--   lesson_signature TEXT,
--   lesson_name TEXT,
--   lesson_description TEXT,
--   lesson_target_language TEXT,
--   lesson_source_language TEXT,
--   lesson_scenario TEXT,
--   lesson_participant_list TEXT,
--   lesson_prose TEXT,
--   lesson_translation JSONB,
--   dialog_draft JSONB,
--   dialog_review JSONB,
--   dialog_resolve JSONB,
--   nouns_draft JSONB,
--   nouns_review JSONB,
--   nouns_resolve JSONB,
--   verbs_draft JSONB,
--   verbs_review JSONB,
--   verbs_resolve JSONB,
--   verbs_expanded_complete JSONB,
--   verbs_expanded_incomplete JSONB,
--   verbs_expanded_triple JSONB
-- )
-- LANGUAGE sql
-- SECURITY INVOKER
-- AS $$
--   SELECT * FROM private.ckn_lesson
--   WHERE lesson_signature = arg_lesson_signature;
-- $$;

-- ************************************************************************
-- FUNCTION: ckn_get_noun_by_scenario
-- ************************************************************************

CREATE FUNCTION private.ckn_get_noun_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_noun_record
LANGUAGE sql
SECURITY DEFINER
SET search_path = private, public
AS $$
  SELECT nb.noun_base, n.noun_singular, n.noun_plural, n.noun_gender, n.curated
  FROM private.ckn_noun n
  JOIN private.ckn_noun_scenarios ns ON n.noun_key = ns.noun_key
  JOIN private.ckn_scenarios s ON ns.scenario_key = s.scenario_key
  JOIN private.ckn_noun_base nb ON nb.noun_base_key = n.noun_base_key
  WHERE s.scenario = arg_scenario
    AND n.language = arg_language;
$$;

-- ************************************************************************
-- FUNCTION: ckn_get_verb_by_scenario
-- ************************************************************************

CREATE FUNCTION private.ckn_get_verb_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_verb_record
LANGUAGE sql
SECURITY DEFINER
SET search_path = private, public
AS $$
  SELECT vb.verb_base, v.verb_infinitive, v.verb_yo, v.verb_tu, v.verb_el_ella_usted,
         v.verb_nosotros, v.verb_vosotros, v.verb_ellos_ellas_ustedes, curated
  FROM private.ckn_verb v
  JOIN private.ckn_verb_scenarios vs ON v.verb_key = vs.verb_key
  JOIN private.ckn_scenarios s ON vs.scenario_key = s.scenario_key
  JOIN private.ckn_verb_base vb ON vb.verb_base_key = v.verb_base_key
  WHERE s.scenario = arg_scenario
    AND v.language = arg_language;
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_tts_cache
-- ************************************************************************

CREATE FUNCTION private.ckn_lookup_tts_cache(arg_tts_cache_signature TEXT)
RETURNS TABLE (
  tts_cache_key INTEGER,
  tts_cache_signature TEXT,
  tts_cache_text TEXT,
  tts_cache_voice TEXT,
  tts_cache_language TEXT,
  tts_cache_usage_count INTEGER,
  tts_cache_last_used TIMESTAMPTZ,
  tts_cache_created TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  RETURN QUERY
  UPDATE private.ckn_tts_cache AS tts
  SET 
    tts_cache_usage_count = tts.tts_cache_usage_count + 1,
    tts_cache_last_used = timezone('utc', now())
  WHERE tts.tts_cache_signature = arg_tts_cache_signature
  RETURNING 
    tts.tts_cache_key,
    tts.tts_cache_signature,
    tts.tts_cache_text,
    tts.tts_cache_voice,
    tts.tts_cache_language,
    tts.tts_cache_usage_count,
    tts.tts_cache_last_used,
    tts.tts_cache_created;
END;
$$;


-- ************************************************************************
-- FUNCTION: ckn_insert_tts_cache
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_tts_cache(
  arg_tts_cache_signature TEXT,
  arg_tts_cache_text TEXT,
  arg_tts_cache_voice TEXT,
  arg_tts_cache_language TEXT DEFAULT 'es-US'
)
RETURNS TABLE (
  tts_cache_key INTEGER,
  tts_cache_signature TEXT,
  tts_cache_text TEXT,
  tts_cache_voice TEXT,
  tts_cache_language TEXT,
  tts_cache_usage_count INTEGER,
  tts_cache_last_used TIMESTAMPTZ,
  tts_cache_created TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_tts_cache (
    tts_cache_signature,
    tts_cache_text,
    tts_cache_voice,
    tts_cache_language
  )
  VALUES (
    arg_tts_cache_signature,
    arg_tts_cache_text,
    arg_tts_cache_voice,
    arg_tts_cache_language
  );

  RETURN QUERY
  SELECT *
  FROM private.ckn_lookup_tts_cache(arg_tts_cache_signature);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_noun
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_noun(
  arg_noun_base TEXT,
  arg_noun_singular TEXT,
  arg_noun_plural TEXT,
  arg_noun_gender TEXT,
  arg_scenario TEXT,
  arg_language TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
DECLARE
  local_noun_key INTEGER;
  local_noun_base_key INTEGER;
  local_scenario_key INTEGER;
BEGIN
  IF trim(arg_noun_base) IS NULL OR
     trim(arg_noun_singular) IS NULL OR
     trim(arg_noun_plural) IS NULL OR
     trim(arg_noun_gender) IS NULL OR
     trim(arg_scenario) IS NULL OR
     trim(arg_language) IS NULL THEN
    RETURN;
  END IF;

  RAISE LOG 'Inserting Noun: noun_base(%), noun_singular(%), noun_plural(%), language(%), scenario(%)', arg_noun_base, arg_noun_singular, arg_noun_plural, arg_language, arg_scenario;

  -- Insert scenario if not exists
  IF EXISTS (SELECT 1 FROM private.ckn_scenarios WHERE scenario = arg_scenario) THEN
    RAISE LOG 'Scenario already exists: %', arg_scenario;
  ELSE
    INSERT INTO private.ckn_scenarios (scenario) VALUES (arg_scenario);
  END IF;

  SELECT scenario_key INTO local_scenario_key
  FROM private.ckn_scenarios
  WHERE scenario = arg_scenario;

  -- Insert noun base if not exists
  IF EXISTS (SELECT 1 FROM private.ckn_noun_base WHERE noun_base = arg_noun_base) THEN
    RAISE LOG 'Noun base already exists: %', arg_noun_base;
  ELSE
    INSERT INTO private.ckn_noun_base (noun_base) VALUES (arg_noun_base);
  END IF;

  SELECT noun_base_key INTO local_noun_base_key
  FROM private.ckn_noun_base
  WHERE noun_base = arg_noun_base;

  -- Insert noun
  IF EXISTS (
    SELECT 1 FROM private.ckn_noun
    WHERE noun_base_key = local_noun_base_key AND language = arg_language
  ) THEN
    RAISE LOG 'Noun already exists for base % and language %', arg_noun_base, arg_language;
  ELSE
    INSERT INTO private.ckn_noun (
      noun_base_key,
      language,
      noun_singular,
      noun_plural,
      noun_gender,
      curated
    ) VALUES (
      local_noun_base_key,
      arg_language,
      arg_noun_singular,
      arg_noun_plural,
      arg_noun_gender,
      arg_curated
    );
  END IF;

  SELECT noun_key INTO local_noun_key
  FROM private.ckn_noun
  WHERE noun_base_key = local_noun_base_key AND language = arg_language;

  -- Insert into junction table
  IF EXISTS (
    SELECT 1 FROM private.ckn_noun_scenarios
    WHERE noun_key = local_noun_key AND scenario_key = local_scenario_key
  ) THEN
    RAISE LOG 'Noun-to-scenario mapping already exists: % → %', arg_noun_singular, arg_scenario;
  ELSE
    INSERT INTO private.ckn_noun_scenarios (noun_key, scenario_key)
    VALUES (local_noun_key, local_scenario_key);
  END IF;
END;
$$;



-- ************************************************************************
-- FUNCTION: ckn_insert_verb
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_verb(
  arg_verb_base TEXT,
  arg_verb_infinitive TEXT,
  arg_verb_yo TEXT,
  arg_verb_tu TEXT,
  arg_verb_el_ella_usted TEXT,
  arg_verb_nosotros TEXT,
  arg_verb_vosotros TEXT,
  arg_verb_ellos_ellas_ustedes TEXT,
  arg_scenario TEXT,
  arg_language TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
DECLARE
  local_verb_key INTEGER;
  local_scenario_key INTEGER;
  local_verb_base_key INTEGER;

BEGIN
  IF trim(arg_verb_infinitive) IS NULL OR trim(arg_scenario) IS NULL THEN
    RETURN;
  END IF;

  -- Insert scenario if missing
  INSERT INTO private.ckn_scenarios (scenario)
  VALUES (arg_scenario)
  ON CONFLICT (scenario) DO NOTHING;

  SELECT scenario_key INTO local_scenario_key
  FROM private.ckn_scenarios
  WHERE scenario = arg_scenario;

  INSERT INTO private.ckn_verb_base (verb_base)
  VALUES (arg_verb_base)
  ON CONFLICT (verb_base) DO NOTHING;

  SELECT verb_base_key INTO local_verb_base_key
  FROM private.ckn_verb_base
  WHERE verb_base = arg_verb_base;

  -- Insert verb
  INSERT INTO private.ckn_verb (
    verb_base_key,
    language,
    verb_infinitive,
    verb_yo,
    verb_tu,
    verb_el_ella_usted,
    verb_nosotros,
    verb_vosotros,
    verb_ellos_ellas_ustedes,
    curated
  ) VALUES (
    local_verb_base_key,
    arg_language,
    arg_verb_infinitive,
    arg_verb_yo,
    arg_verb_tu,
    arg_verb_el_ella_usted,
    arg_verb_nosotros,
    arg_verb_vosotros,
    arg_verb_ellos_ellas_ustedes,
    arg_curated
  )
  ON CONFLICT (verb_base_key, language) DO NOTHING;

  SELECT verb_key INTO local_verb_key
  FROM private.ckn_verb
  WHERE verb_infinitive = arg_verb_infinitive;

  -- Insert into relation table
  INSERT INTO private.ckn_verb_scenarios (verb_key, scenario_key)
  VALUES (local_verb_key, local_scenario_key)
  ON CONFLICT DO NOTHING;
END;
$$;


-- ************************************************************************
-- FUNCTION: ckn_insert_noun_example
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_noun_example(
  arg_noun_key INTEGER,
  arg_noun_example_data JSONB
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_noun_example (noun_key, noun_example_data)
  VALUES (arg_noun_key, arg_noun_example_data);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_noun_examples
-- ************************************************************************

CREATE FUNCTION private.ckn_lookup_noun_examples(
  arg_noun_key INTEGER
)
RETURNS TABLE (
  noun_key INTEGER,
  noun_form TEXT,
  number TEXT,
  noun_example_data JSONB
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = private, public
AS $$
SELECT
  nf.noun_key,
  nf.form,
  nf.number,
  e.noun_example_data
FROM private.ckn_noun_forms nf
JOIN private.ckn_noun_example e ON nf.noun_key = e.noun_key
WHERE nf.noun_key = arg_noun_key;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_verb_example
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_verb_example(
  arg_verb_key INTEGER,
  arg_verb_example_data JSONB
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_verb_example (verb_key, verb_example_data)
  VALUES (arg_verb_key, arg_verb_example_data);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_verb_example
-- ************************************************************************

CREATE FUNCTION private.ckn_lookup_verb_example(
  arg_verb_key INTEGER
)
RETURNS TABLE (
  verb_key INTEGER,
  base TEXT,
  person TEXT,
  form TEXT,
  verb_example_data JSONB
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = private, public
AS $$
SELECT
  vf.verb_key,
  vf.base,
  vf.person,
  vf.form,
  e.verb_example_data
FROM private.ckn_verb_forms vf
JOIN private.ckn_verb_example e ON vf.verb_key = e.verb_key
WHERE vf.verb_key = arg_verb_key;
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_insert_lesson
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_lesson(
  arg_lesson_id INTEGER,
  arg_lesson_uuid TEXT,
  arg_lesson_signature TEXT,
  arg_lesson_name TEXT,
  arg_lesson_description TEXT,
  arg_lesson_target_language TEXT,
  arg_lesson_source_language TEXT,
  arg_lesson_scenario TEXT,
  arg_lesson_participant_list TEXT,
  arg_lesson_prose TEXT
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT private.ckn_insert_lesson(
    arg_lesson_id,
    arg_lesson_uuid,
    arg_lesson_signature,
    arg_lesson_name,
    arg_lesson_description,
    arg_lesson_target_language,
    arg_lesson_source_language,
    arg_lesson_scenario,
    arg_lesson_participant_list,
    arg_lesson_prose
  );
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_lookup_tts_cache
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature TEXT)
RETURNS TABLE (
  tts_cache_key INTEGER,
  tts_cache_signature TEXT,
  tts_cache_text TEXT,
  tts_cache_voice TEXT,
  tts_cache_language TEXT,
  tts_cache_usage_count INTEGER,
  tts_cache_last_used TIMESTAMPTZ,
  tts_cache_created TIMESTAMPTZ
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_lookup_tts_cache(arg_tts_cache_signature);
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_insert_tts_cache
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_tts_cache(
  arg_tts_cache_signature TEXT,
  arg_tts_cache_text TEXT,
  arg_tts_cache_voice TEXT,
  arg_tts_cache_language TEXT DEFAULT 'es-US'
)
RETURNS TABLE (
  tts_cache_key INTEGER,
  tts_cache_signature TEXT,
  tts_cache_text TEXT,
  tts_cache_voice TEXT,
  tts_cache_language TEXT,
  tts_cache_usage_count INTEGER,
  tts_cache_last_used TIMESTAMPTZ,
  tts_cache_created TIMESTAMPTZ
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_insert_tts_cache(
    arg_tts_cache_signature,
    arg_tts_cache_text,
    arg_tts_cache_voice,
    arg_tts_cache_language
  );
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_insert_noun
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_noun(
  arg_noun_base TEXT,
  arg_noun_singular TEXT,
  arg_noun_plural TEXT,
  arg_noun_gender TEXT,
  arg_scenario TEXT,
  arg_language TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT private.ckn_insert_noun(
    arg_noun_base,
    arg_noun_singular,
    arg_noun_plural,
    arg_noun_gender,
    arg_scenario,
    arg_language,
    arg_curated
  );
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_insert_verb
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_verb(
  arg_verb_base TEXT,
  arg_verb_infinitive TEXT,
  arg_verb_yo TEXT,
  arg_verb_tu TEXT,
  arg_verb_el_ella_usted TEXT,
  arg_verb_nosotros TEXT,
  arg_verb_vosotros TEXT,
  arg_verb_ellos_ellas_ustedes TEXT,
  arg_scenario TEXT,
  arg_language TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT private.ckn_insert_verb(
    arg_verb_base,
    arg_verb_infinitive,
    arg_verb_yo,
    arg_verb_tu,
    arg_verb_el_ella_usted,
    arg_verb_nosotros,
    arg_verb_vosotros,
    arg_verb_ellos_ellas_ustedes,
    arg_scenario,
    arg_language,
    arg_curated
  );
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_get_noun_by_scenario
-- ************************************************************************

CREATE FUNCTION public.ckn_get_noun_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_noun_record
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_get_noun_by_scenario(arg_scenario, arg_language);
$$;

CREATE FUNCTION public.ckn_get_verb_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_verb_record
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_get_verb_by_scenario(arg_scenario, arg_language);
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_upsert_lesson
-- ************************************************************************

-- CREATE FUNCTION public.ckn_upsert_lesson(
--   -- same signature as the private function
--   arg_lesson_id INTEGER,
--   arg_lesson_signature TEXT,
--   arg_lesson_name TEXT,
--   arg_lesson_description TEXT,
--   arg_lesson_target_language TEXT,
--   arg_lesson_source_language TEXT,
--   arg_lesson_scenario TEXT,
--   arg_lesson_participant_list TEXT,
--   arg_lesson_prose TEXT,
--   arg_lesson_translation JSONB,

--   arg_dialog_draft JSONB,
--   arg_dialog_review JSONB,
--   arg_dialog_resolve JSONB,

--   arg_nouns_draft JSONB,
--   arg_nouns_review JSONB,
--   arg_nouns_resolve JSONB,

--   arg_verbs_draft JSONB,
--   arg_verbs_review JSONB,
--   arg_verbs_resolve JSONB,

--   arg_verbs_expanded_complete JSONB,
--   arg_verbs_expanded_incomplete JSONB,
--   arg_verbs_expanded_triple JSONB
-- )
-- RETURNS VOID
-- LANGUAGE SQL
-- SECURITY DEFINER
-- AS $$
--   SELECT private.ckn_upsert_lesson(
--     arg_lesson_id,
--     arg_lesson_signature,
--     arg_lesson_name,
--     arg_lesson_description,
--     arg_lesson_target_language,
--     arg_lesson_source_language,
--     arg_lesson_scenario,
--     arg_lesson_participant_list,
--     arg_lesson_prose,
--     arg_lesson_translation,
--     arg_dialog_draft,
--     arg_dialog_review,
--     arg_dialog_resolve,
--     arg_nouns_draft,
--     arg_nouns_review,
--     arg_nouns_resolve,
--     arg_verbs_draft,
--     arg_verbs_review,
--     arg_verbs_resolve,
--     arg_verbs_expanded_complete,
--     arg_verbs_expanded_incomplete,
--     arg_verbs_expanded_triple
--   );
-- $$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_get_lesson_by_signature
-- ************************************************************************

-- CREATE FUNCTION public.ckn_get_lesson_by_signature(arg_lesson_signature TEXT)
-- RETURNS TABLE (
--   lesson_key INTEGER,
--   lesson_id INTEGER,
--   lesson_signature TEXT,
--   lesson_name TEXT,
--   lesson_description TEXT,
--   lesson_target_language TEXT,
--   lesson_source_language TEXT,
--   lesson_scenario TEXT,
--   lesson_participant_list TEXT,
--   lesson_prose TEXT,
--   lesson_translation JSONB,
--   dialog_draft JSONB,
--   dialog_review JSONB,
--   dialog_resolve JSONB,
--   nouns_draft JSONB,
--   nouns_review JSONB,
--   nouns_resolve JSONB,
--   verbs_draft JSONB,
--   verbs_review JSONB,
--   verbs_resolve JSONB,
--   verbs_expanded_complete JSONB,
--   verbs_expanded_incomplete JSONB,
--   verbs_expanded_triple JSONB
-- )
-- LANGUAGE SQL
-- SECURITY DEFINER
-- AS $$
--   SELECT * FROM private.ckn_get_lesson_by_signature(arg_lesson_signature);
-- $$;

-- ************************************************************************
-- FUNCTION EXECUTION PRIVILEGES
-- ************************************************************************

GRANT USAGE ON SCHEMA private TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA private TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA private
GRANT EXECUTE ON FUNCTIONS TO service_role;

-- Scenario-based lookup
GRANT EXECUTE ON FUNCTION private.ckn_get_noun_by_scenario(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_verb_by_scenario(TEXT, TEXT) TO service_role;

-- TTS cache operations
GRANT EXECUTE ON FUNCTION private.ckn_lookup_tts_cache(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_tts_cache(TEXT, TEXT, TEXT, TEXT) TO service_role;

-- Noun insert
GRANT EXECUTE ON FUNCTION private.ckn_insert_noun(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) TO service_role;

-- Verb insert
GRANT EXECUTE ON FUNCTION private.ckn_insert_verb(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) TO service_role;

-- Noun example insert + lookup
GRANT EXECUTE ON FUNCTION private.ckn_insert_noun_example(INTEGER, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_lookup_noun_examples(INTEGER) TO service_role;

-- Verb example insert + lookup
GRANT EXECUTE ON FUNCTION private.ckn_insert_verb_example(INTEGER, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_lookup_verb_example(INTEGER) TO service_role;

GRANT EXECUTE ON FUNCTION private.ckn_insert_lesson(
  INTEGER,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT
) TO service_role;


-- GRANT EXECUTE ON FUNCTION private.ckn_upsert_lesson(
--   INTEGER,
--   TEXT,
--   TEXT,
--   TEXT,
--   TEXT,
--   TEXT,
--   TEXT,
--   TEXT,
--   TEXT,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB,
--   JSONB
-- ) TO service_role;

-- GRANT EXECUTE ON FUNCTION private.ckn_get_lesson_by_signature(TEXT) TO service_role;

ALTER ROLE service_role SET search_path = private, public;

