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
  language_code TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  noun_singular TEXT NOT NULL,
  noun_plural TEXT NOT NULL,
  noun_gender TEXT CHECK (noun_gender IN ('M', 'F', 'N')),
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (noun_base_key, language_code)
);

CREATE TABLE private.ckn_verb (
  verb_key SERIAL PRIMARY KEY,
  verb_base_key INTEGER REFERENCES private.ckn_verb_base(verb_base_key) ON DELETE CASCADE,
  language_code TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  verb_infinitive TEXT NOT NULL,
  verb_yo TEXT,
  verb_tu TEXT,
  verb_el_ella_usted TEXT,
  verb_nosotros TEXT,
  verb_vosotros TEXT,
  verb_ellos_ellas_ustedes TEXT,
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (verb_base_key, language_code)
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
-- FUNCTION: ckn_get_noun_by_scenario
-- ************************************************************************

CREATE FUNCTION private.ckn_get_noun_by_scenario(
  arg_scenario TEXT,
  arg_language_code TEXT
)
RETURNS SETOF private.ckn_noun_record
LANGUAGE sql
SECURITY INVOKER
AS $$
  SELECT nb.noun_base, n.noun_singular, n.noun_plural, n.noun_gender, n.curated
  FROM private.ckn_noun n
  JOIN private.ckn_noun_scenarios ns ON n.noun_key = ns.noun_key
  JOIN private.ckn_scenarios s ON ns.scenario_key = s.scenario_key
  JOIN private.ckn_noun_base nb ON nb.noun_base_key = n.noun_base_key
  WHERE s.scenario = arg_scenario
    AND n.language_code = arg_language_code;
$$;

-- ************************************************************************
-- FUNCTION: ckn_get_verb_by_scenario
-- ************************************************************************

CREATE FUNCTION private.ckn_get_verb_by_scenario(
  arg_scenario TEXT,
  arg_language_code TEXT
)
RETURNS SETOF private.ckn_verb_record
LANGUAGE sql
SECURITY INVOKER
AS $$
  SELECT vb.verb_base, v.verb_infinitive, v.verb_yo, v.verb_tu, v.verb_el_ella_usted,
         v.verb_nosotros, v.verb_vosotros, v.verb_ellos_ellas_ustedes, curated
  FROM private.ckn_verb v
  JOIN private.ckn_verb_scenarios vs ON v.verb_key = vs.verb_key
  JOIN private.ckn_scenarios s ON vs.scenario_key = s.scenario_key
  JOIN private.ckn_verb_base vb ON vb.verb_base_key = v.verb_base_key
  WHERE s.scenario = arg_scenario
    AND v.language_code = arg_language_code;
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
SECURITY INVOKER
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
SECURITY INVOKER
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
  arg_language_code TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
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
     trim(arg_language_code) IS NULL THEN
    RETURN;
  END IF;

  RAISE LOG 'Inserting Noun: noun_base(%), noun_singular(%), noun_plural(%), language_code(%), scenario(%)', arg_noun_base, arg_noun_singular, arg_noun_plural, arg_language_code, arg_scenario;

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
    WHERE noun_base_key = local_noun_base_key AND language_code = arg_language_code
  ) THEN
    RAISE LOG 'Noun already exists for base % and language %', arg_noun_base, arg_language_code;
  ELSE
    INSERT INTO private.ckn_noun (
      noun_base_key,
      language_code,
      noun_singular,
      noun_plural,
      noun_gender,
      curated
    ) VALUES (
      local_noun_base_key,
      arg_language_code,
      arg_noun_singular,
      arg_noun_plural,
      arg_noun_gender,
      arg_curated
    );
  END IF;

  SELECT noun_key INTO local_noun_key
  FROM private.ckn_noun
  WHERE noun_base_key = local_noun_base_key AND language_code = arg_language_code;

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
  arg_language_code TEXT,
  arg_curated BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
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
    language_code,
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
    arg_language_code,
    arg_verb_infinitive,
    arg_verb_yo,
    arg_verb_tu,
    arg_verb_el_ella_usted,
    arg_verb_nosotros,
    arg_verb_vosotros,
    arg_verb_ellos_ellas_ustedes,
    arg_curated
  )
  ON CONFLICT (verb_base_key, language_code) DO NOTHING;

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
-- FUNCTION EXECUTION PRIVILEGES
-- ************************************************************************

GRANT USAGE ON SCHEMA private TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA private TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA private
GRANT EXECUTE ON FUNCTIONS TO service_role;
