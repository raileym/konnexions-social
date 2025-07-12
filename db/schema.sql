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
-- CREATE TABLE: private.ckn_paywall
-- ************************************************************************

CREATE TABLE private.ckn_paywall (
  paywall_client_uuid TEXT PRIMARY KEY,

  -- Core package counts (used locally)
  paywall_package_green_remaining INT DEFAULT 0,  -- e.g. GenAI asks
  paywall_package_yellow_remaining INT DEFAULT 0, -- e.g. TTS usage

  -- Stripe metadata (optional until Stripe is integrated)
  paywall_stripe_customer_id TEXT,               -- maps to Stripe's customer object
  paywall_stripe_subscription_id TEXT,           -- maps to active subscription
  paywall_stripe_metadata JSONB DEFAULT '{}'::JSONB,

  -- Internal versioning + auditing
  paywall_version INT DEFAULT 1,
  paywall_updated_at TIMESTAMPTZ DEFAULT NOW(),
  paywall_created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ************************************************************************
-- CREATE TABLE: private.ckn_marketing_data
-- ************************************************************************

CREATE TABLE private.ckn_marketing_data (
  marketing_data_client_uuid TEXT PRIMARY KEY,
  marketing_data_preferences JSONB NOT NULL,
  marketing_data_version INT DEFAULT 1,
  marketing_data_updated_at TIMESTAMPTZ DEFAULT NOW(),
  marketing_data_created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ************************************************************************
-- CREATE TABLE: private.ckn_prompt_response
-- ************************************************************************

CREATE TABLE private.ckn_prompt_response (
  prompt_response_key UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_response_client_uuid TEXT NOT NULL,
  prompt_response_lesson_id TEXT NOT NULL,
  prompt_response_prompt TEXT NOT NULL,
  prompt_response_response TEXT NOT NULL,
  prompt_response_gen_ai_provider TEXT NOT NULL,
  prompt_response_version INT DEFAULT 1,
  prompt_response_updated_at TIMESTAMPTZ DEFAULT NOW(),
  prompt_response_created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE private.ckn_prompt_response IS 'CKN: Stores AI-generated prompt/response pairs for a specific user and lesson.';

COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_client_uuid IS 'Normalized (cooked) email of the user.';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_lesson_id IS 'The lesson identifier (e.g., uuid or slug).';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_prompt IS 'Prompt string sent to the AI provider.';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_response IS 'Response string returned from the AI provider.';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_gen_ai_provider IS 'Name of the AI provider used (e.g., OPENAI, CLAUDE).';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_version IS 'Optional versioning for schema evolution or retry scenarios.';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_updated_at IS 'Timestamp when this record was last updated.';
COMMENT ON COLUMN private.ckn_prompt_response.prompt_response_created_at IS 'Timestamp when this record was first created.';

-- ************************************************************************
-- CREATE TABLE: private.ckn_user_data
-- ************************************************************************

CREATE TABLE private.ckn_user_data (
  user_data_key UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_data_client_uuid TEXT NOT NULL UNIQUE,
  user_data_flex_lesson TEXT,
  user_data_current_lesson JSONB,
  user_data_lessons JSONB,
  user_data_lesson_number INT,
  user_data_lesson_prompt TEXT,
  user_data_lesson_timestamp TEXT,
  user_data_version INT DEFAULT 1,
  user_data_updated_at TIMESTAMPTZ DEFAULT now(),
  user_data_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_user_data IS 'CKN: Stores user-specific lesson state and history tied to a normalized (cooked) email.';

COMMENT ON COLUMN private.ckn_user_data.user_data_key IS 'Primary UUID key for this user data record.';
COMMENT ON COLUMN private.ckn_user_data.user_data_client_uuid IS 'Optional client-generated identifier for the user.';
COMMENT ON COLUMN private.ckn_user_data.user_data_flex_lesson IS 'Arbitrary lesson name or ID for a flexible workspace.';
COMMENT ON COLUMN private.ckn_user_data.user_data_current_lesson IS 'JSON blob representing the current lesson state.';
COMMENT ON COLUMN private.ckn_user_data.user_data_lessons IS 'JSON blob listing multiple saved lessons.';
COMMENT ON COLUMN private.ckn_user_data.user_data_lesson_number IS 'Current lesson sequence number.';
COMMENT ON COLUMN private.ckn_user_data.user_data_lesson_prompt IS 'Current lesson prompt text (e.g., scenario name or style).';
COMMENT ON COLUMN private.ckn_user_data.user_data_lesson_timestamp IS 'Timestamp string for the current lesson session.';
COMMENT ON COLUMN private.ckn_user_data.user_data_version IS 'Version of the email user data record.';
COMMENT ON COLUMN private.ckn_user_data.user_data_updated_at IS 'Timestamp of last update to this record.';
COMMENT ON COLUMN private.ckn_user_data.user_data_created_at IS 'Timestamp when this record was created.';

-- ************************************************************************
-- CREATE VIEW: private.ckn_user_data_view
-- ************************************************************************

CREATE VIEW private.ckn_user_data_view AS
SELECT
  user_data_key,
  user_data_client_uuid,
  user_data_flex_lesson,
  user_data_current_lesson,
  user_data_lessons,
  user_data_lesson_number,
  user_data_lesson_prompt,
  user_data_lesson_timestamp,
  user_data_version,
  user_data_updated_at,
  user_data_created_at
FROM private.ckn_user_data;

-- ************************************************************************
-- CREATE TABLE: private.ckn_email_code
-- ************************************************************************

CREATE TABLE private.ckn_email_code (
  email_code_key UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_code_cooked_email TEXT NOT NULL UNIQUE,
  email_code_code TEXT NOT NULL,
  email_code_created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email_code_expires_at TIMESTAMPTZ NOT NULL,
  email_code_verified BOOLEAN DEFAULT FALSE
);

CREATE INDEX ckn_email_code_index ON private.ckn_email_code (email_code_cooked_email);

-- ************************************************************************
-- CREATE TABLE: private.ckn_tts_cache
-- ************************************************************************

CREATE TABLE private.ckn_tts_cache (
  tts_cache_key SERIAL PRIMARY KEY,
  tts_cache_signature TEXT UNIQUE NOT NULL,
  tts_cache_text TEXT NOT NULL,
  tts_cache_voice TEXT NOT NULL,
  tts_cache_language TEXT NOT NULL DEFAULT 'es-US',
  tts_cache_usage_count INTEGER NOT NULL DEFAULT 1,
  tts_cache_last_used TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  tts_cache_version INT DEFAULT 1,
  tts_cache_updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  tts_cache_created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE private.ckn_tts_cache IS 'CKN: Caches results from Google TTS service to avoid repeat synthesis.';

COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_key IS 'Primary key for each TTS cache record.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_signature IS 'SHA256 signature of normalized TTS input.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_text IS 'Original input text sent to TTS.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_voice IS 'TTS voice name used for synthesis.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_language IS 'Language code like es-US.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_usage_count IS 'How many times this entry was accessed.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_last_used IS 'Last time this cache entry was served.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_version IS 'Version number of this record for schema evolution.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_updated_at IS 'Timestamp of the last update to this entry.';
COMMENT ON COLUMN private.ckn_tts_cache.tts_cache_created_at IS 'Time this cache entry was created.';

-- ************************************************************************
-- VIEW: private.ckn_tts_cache_view
-- ************************************************************************

CREATE VIEW private.ckn_tts_cache_view AS
SELECT
  tts_cache_key,
  tts_cache_signature,
  tts_cache_text,
  tts_cache_voice,
  tts_cache_language,
  tts_cache_usage_count,
  tts_cache_last_used,
  tts_cache_version,
  tts_cache_updated_at,
  tts_cache_created_at
FROM private.ckn_tts_cache;

-- ==================================================================
-- CREATE TABLE: private.ckn_lesson
-- ==================================================================

CREATE TABLE private.ckn_lesson (
  lesson_key SERIAL PRIMARY KEY,
  lesson_id TEXT UNIQUE,
  lesson_number INTEGER,
  lesson_client_uuid TEXT,
  lesson_timestamp TEXT,
  lesson_name TEXT,
  lesson_description TEXT,
  lesson_target_language TEXT,
  lesson_source_language TEXT,
  lesson_scenario TEXT,
  lesson_participant_list TEXT,
  lesson_prose TEXT,
  lesson_version INT DEFAULT 1,
  lesson_updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  lesson_created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

COMMENT ON TABLE private.ckn_lesson IS 'CKN: Stores metadata and content for each generated lesson.';

COMMENT ON COLUMN private.ckn_lesson.lesson_key IS 'Primary key for the lesson.';
COMMENT ON COLUMN private.ckn_lesson.lesson_id IS 'Globally unique identifier for the lesson.';
COMMENT ON COLUMN private.ckn_lesson.lesson_number IS 'Sequential lesson number (optional but useful for ordering).';
COMMENT ON COLUMN private.ckn_lesson.lesson_client_uuid IS 'Client UUID aligns the lesson with the client.';
COMMENT ON COLUMN private.ckn_lesson.lesson_timestamp IS 'Timestamp or slug associated with lesson creation.';
COMMENT ON COLUMN private.ckn_lesson.lesson_name IS 'Human-readable name for the lesson.';
COMMENT ON COLUMN private.ckn_lesson.lesson_description IS 'Brief description or summary of the lesson.';
COMMENT ON COLUMN private.ckn_lesson.lesson_target_language IS 'Language the lesson is written in (e.g., es).';
COMMENT ON COLUMN private.ckn_lesson.lesson_source_language IS 'Source language for translation or scaffolding.';
COMMENT ON COLUMN private.ckn_lesson.lesson_scenario IS 'Associated scenario or theme (e.g., restaurant).';
COMMENT ON COLUMN private.ckn_lesson.lesson_participant_list IS 'List of characters or speakers in the lesson.';
COMMENT ON COLUMN private.ckn_lesson.lesson_prose IS 'Raw prose or outline for the lesson narrative.';
COMMENT ON COLUMN private.ckn_lesson.lesson_version IS 'Version number for tracking schema or data changes.';
COMMENT ON COLUMN private.ckn_lesson.lesson_updated_at IS 'Time the lesson was last updated.';
COMMENT ON COLUMN private.ckn_lesson.lesson_created_at IS 'Time the lesson was originally created.';

-- ==================================================================
-- CREATE TABLE: private.ckn_module
-- ==================================================================

CREATE TABLE private.ckn_module (
  module_key SERIAL PRIMARY KEY,
  lesson_id TEXT REFERENCES private.ckn_lesson(lesson_id) ON DELETE CASCADE,
  module_name TEXT NOT NULL,  -- e.g., 'dialog_draft', 'nouns_review', etc.
  module_content JSONB NOT NULL,
  module_version INT DEFAULT 1,
  module_updated_at TIMESTAMPTZ DEFAULT now(),
  module_created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT unique_lesson_module UNIQUE (lesson_id, module_name)
);

COMMENT ON TABLE private.ckn_module IS 'CKN: Stores individual modules (e.g., dialog_draft, nouns_review) associated with a lesson.';

COMMENT ON COLUMN private.ckn_module.module_key IS 'Primary key for the module record.';
COMMENT ON COLUMN private.ckn_module.lesson_id IS 'Foreign key referencing the associated lesson.';
COMMENT ON COLUMN private.ckn_module.module_name IS 'Name of the module type (e.g., dialog_draft).';
COMMENT ON COLUMN private.ckn_module.module_content IS 'JSON content containing the module data.';
COMMENT ON COLUMN private.ckn_module.module_version IS 'Schema version of the module for migration tracking.';
COMMENT ON COLUMN private.ckn_module.module_updated_at IS 'Timestamp of the most recent update.';
COMMENT ON COLUMN private.ckn_module.module_created_at IS 'Timestamp when the record was created.';

-- ==================================================================
-- CREATE TABLE: private.ckn_noun_base
-- ==================================================================

CREATE TABLE private.ckn_noun_base (
  noun_base_key SERIAL PRIMARY KEY,
  noun_base TEXT NOT NULL UNIQUE,  -- e.g., "table", "waiter"
  noun_base_version INT DEFAULT 1,
  noun_base_updated_at TIMESTAMPTZ DEFAULT now(),
  noun_base_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_noun_base IS 'CKN: Base noun concept in English (language-neutral). Used as a root for language-specific noun forms.';

COMMENT ON COLUMN private.ckn_noun_base.noun_base_key IS 'Primary key for the base noun.';
COMMENT ON COLUMN private.ckn_noun_base.noun_base IS 'The canonical noun in English (e.g., "table", "waiter").';
COMMENT ON COLUMN private.ckn_noun_base.noun_base_version IS 'Schema or data version for tracking evolution.';
COMMENT ON COLUMN private.ckn_noun_base.noun_base_updated_at IS 'Timestamp of the most recent update.';
COMMENT ON COLUMN private.ckn_noun_base.noun_base_created_at IS 'Timestamp when this record was created.';


-- ==================================================================
-- CREATE TABLE: private.ckn_verb_base
-- ==================================================================

CREATE TABLE private.ckn_verb_base (
  verb_base_key SERIAL PRIMARY KEY,
  verb_base TEXT NOT NULL UNIQUE,  -- e.g., "to eat", "to have"
  verb_base_version INT DEFAULT 1,
  verb_base_updated_at TIMESTAMPTZ DEFAULT now(),
  verb_base_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_verb_base IS 'CKN: Base verb concept in English (language-neutral). Used as a root for language-specific verb forms.';

COMMENT ON COLUMN private.ckn_verb_base.verb_base_key IS 'Primary key for the base verb.';
COMMENT ON COLUMN private.ckn_verb_base.verb_base IS 'The canonical verb in English (e.g., "to eat", "to have").';
COMMENT ON COLUMN private.ckn_verb_base.verb_base_version IS 'Schema or data version for tracking evolution.';
COMMENT ON COLUMN private.ckn_verb_base.verb_base_updated_at IS 'Timestamp of the most recent update.';
COMMENT ON COLUMN private.ckn_verb_base.verb_base_created_at IS 'Timestamp when this record was created.';

-- ==================================================================
-- CREATE TABLE: private.ckn_noun
-- ==================================================================

CREATE TABLE private.ckn_noun (
  noun_key SERIAL PRIMARY KEY,
  noun_base_key INTEGER NOT NULL REFERENCES private.ckn_noun_base(noun_base_key) ON DELETE CASCADE,
  language TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  noun_singular TEXT NOT NULL,
  noun_plural TEXT NOT NULL,
  noun_gender TEXT CHECK (noun_gender IN ('m', 'f', 'n')),
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  noun_version INT DEFAULT 1,
  noun_updated_at TIMESTAMPTZ DEFAULT now(),
  noun_created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (noun_base_key, language)
);

COMMENT ON TABLE private.ckn_noun IS 'CKN: Stores language-specific forms of a noun including gender and pluralization.';

COMMENT ON COLUMN private.ckn_noun.noun_key IS 'Primary key for this specific noun form.';
COMMENT ON COLUMN private.ckn_noun.noun_base_key IS 'Foreign key to language-neutral noun_base.';
COMMENT ON COLUMN private.ckn_noun.language IS 'Language code (e.g., es, fr, en).';
COMMENT ON COLUMN private.ckn_noun.noun_singular IS 'Singular form of the noun.';
COMMENT ON COLUMN private.ckn_noun.noun_plural IS 'Plural form of the noun.';
COMMENT ON COLUMN private.ckn_noun.noun_gender IS 'Gender of the noun: m = masculine, f = feminine, n = neuter.';
COMMENT ON COLUMN private.ckn_noun.curated IS 'TRUE if this form is manually curated.';
COMMENT ON COLUMN private.ckn_noun.noun_version IS 'Version marker for schema or data evolution.';
COMMENT ON COLUMN private.ckn_noun.noun_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_noun.noun_created_at IS 'Timestamp when this record was created.';


-- ==================================================================
-- CREATE TABLE: private.ckn_verb
-- ==================================================================

CREATE TABLE private.ckn_verb (
  verb_key SERIAL PRIMARY KEY,
  verb_base_key INTEGER NOT NULL REFERENCES private.ckn_verb_base(verb_base_key) ON DELETE CASCADE,
  language TEXT NOT NULL,  -- e.g., 'es', 'fr', 'it', 'en'
  verb_infinitive TEXT NOT NULL,
  verb_yo TEXT,
  verb_tu TEXT,
  verb_el_ella_usted TEXT,
  verb_nosotros TEXT,
  verb_vosotros TEXT,
  verb_ellos_ellas_ustedes TEXT,
  curated BOOLEAN NOT NULL DEFAULT FALSE,
  verb_version INT DEFAULT 1,
  verb_updated_at TIMESTAMPTZ DEFAULT now(),
  verb_created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (verb_base_key, language)
);

COMMENT ON TABLE private.ckn_verb IS 'CKN: Stores language-specific conjugations of a verb for different pronouns.';

COMMENT ON COLUMN private.ckn_verb.verb_key IS 'Primary key for this specific verb form.';
COMMENT ON COLUMN private.ckn_verb.verb_base_key IS 'Foreign key to language-neutral verb_base.';
COMMENT ON COLUMN private.ckn_verb.language IS 'Language code (e.g., es, fr, en).';
COMMENT ON COLUMN private.ckn_verb.verb_infinitive IS 'Infinitive form of the verb.';
COMMENT ON COLUMN private.ckn_verb.verb_yo IS '1st person singular (yo) conjugation.';
COMMENT ON COLUMN private.ckn_verb.verb_tu IS '2nd person singular (tú) conjugation.';
COMMENT ON COLUMN private.ckn_verb.verb_el_ella_usted IS '3rd person singular (él/ella/usted) conjugation.';
COMMENT ON COLUMN private.ckn_verb.verb_nosotros IS '1st person plural (nosotros) conjugation.';
COMMENT ON COLUMN private.ckn_verb.verb_vosotros IS '2nd person plural (vosotros) conjugation.';
COMMENT ON COLUMN private.ckn_verb.verb_ellos_ellas_ustedes IS '3rd person plural (ellos/ellas/ustedes) conjugation.';
COMMENT ON COLUMN private.ckn_verb.curated IS 'TRUE if this form is manually curated.';
COMMENT ON COLUMN private.ckn_verb.verb_version IS 'Version marker for schema or data evolution.';
COMMENT ON COLUMN private.ckn_verb.verb_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_verb.verb_created_at IS 'Timestamp when this record was created.';


-- ==================================================================
-- CREATE TABLE: private.ckn_noun_example
-- ==================================================================

CREATE TABLE private.ckn_noun_example (
  noun_example_key SERIAL PRIMARY KEY,
  noun_key INTEGER NOT NULL REFERENCES private.ckn_noun(noun_key) ON DELETE CASCADE,
  noun_example_data JSONB NOT NULL,  -- e.g., sentence, context, tags, region
  noun_example_version INT DEFAULT 1,
  noun_example_updated_at TIMESTAMPTZ DEFAULT now(),
  noun_example_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_noun_example IS 'CKN: Example usage and metadata for a specific noun in context.';

COMMENT ON COLUMN private.ckn_noun_example.noun_example_key IS 'Primary key for this example.';
COMMENT ON COLUMN private.ckn_noun_example.noun_key IS 'Foreign key to the parent noun.';
COMMENT ON COLUMN private.ckn_noun_example.noun_example_data IS 'JSON object describing the example.';
COMMENT ON COLUMN private.ckn_noun_example.noun_example_version IS 'Version marker for this record.';
COMMENT ON COLUMN private.ckn_noun_example.noun_example_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_noun_example.noun_example_created_at IS 'Timestamp of record creation.';


-- ==================================================================
-- CREATE TABLE: private.ckn_verb_example
-- ==================================================================

CREATE TABLE private.ckn_verb_example (
  verb_example_key SERIAL PRIMARY KEY,
  verb_key INTEGER NOT NULL REFERENCES private.ckn_verb(verb_key) ON DELETE CASCADE,
  verb_example_data JSONB NOT NULL,
  verb_example_version INT DEFAULT 1,
  verb_example_updated_at TIMESTAMPTZ DEFAULT now(),
  verb_example_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_verb_example IS 'CKN: Example usage and metadata for a specific verb in context.';

COMMENT ON COLUMN private.ckn_verb_example.verb_example_key IS 'Primary key for this example.';
COMMENT ON COLUMN private.ckn_verb_example.verb_key IS 'Foreign key to the parent verb.';
COMMENT ON COLUMN private.ckn_verb_example.verb_example_data IS 'JSON object describing the example.';
COMMENT ON COLUMN private.ckn_verb_example.verb_example_version IS 'Version marker for this record.';
COMMENT ON COLUMN private.ckn_verb_example.verb_example_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_verb_example.verb_example_created_at IS 'Timestamp of record creation.';

-- ==================================================================
-- CREATE TABLE: private.ckn_scenarios
-- ==================================================================

CREATE TABLE private.ckn_scenarios (
  scenario_key SERIAL PRIMARY KEY,
  scenario TEXT NOT NULL UNIQUE,
  scenario_version INT DEFAULT 1,
  scenario_updated_at TIMESTAMPTZ DEFAULT now(),
  scenario_created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE private.ckn_scenarios IS 'CKN: Master list of learning scenarios (e.g., restaurant, airport).';

COMMENT ON COLUMN private.ckn_scenarios.scenario_key IS 'Primary key for this scenario.';
COMMENT ON COLUMN private.ckn_scenarios.scenario IS 'Scenario identifier string.';
COMMENT ON COLUMN private.ckn_scenarios.scenario_version IS 'Version number for schema/data tracking.';
COMMENT ON COLUMN private.ckn_scenarios.scenario_updated_at IS 'Last time this record was updated.';
COMMENT ON COLUMN private.ckn_scenarios.scenario_created_at IS 'Timestamp of record creation.';


-- ==================================================================
-- CREATE TABLE: private.ckn_noun_scenarios
-- ==================================================================

CREATE TABLE private.ckn_noun_scenarios (
  noun_key INTEGER NOT NULL REFERENCES private.ckn_noun(noun_key) ON DELETE CASCADE,
  scenario_key INTEGER NOT NULL REFERENCES private.ckn_scenarios(scenario_key) ON DELETE CASCADE,
  noun_scenario_version INT DEFAULT 1,
  noun_scenario_updated_at TIMESTAMPTZ DEFAULT now(),
  noun_scenario_created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (noun_key, scenario_key)
);

COMMENT ON TABLE private.ckn_noun_scenarios IS 'CKN: Many-to-many relationship between nouns and scenarios.';

COMMENT ON COLUMN private.ckn_noun_scenarios.noun_key IS 'Foreign key to specific noun.';
COMMENT ON COLUMN private.ckn_noun_scenarios.scenario_key IS 'Foreign key to scenario.';
COMMENT ON COLUMN private.ckn_noun_scenarios.noun_scenario_version IS 'Version marker for this mapping.';
COMMENT ON COLUMN private.ckn_noun_scenarios.noun_scenario_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_noun_scenarios.noun_scenario_created_at IS 'Timestamp of record creation.';


-- ==================================================================
-- CREATE TABLE: private.ckn_verb_scenarios
-- ==================================================================

CREATE TABLE private.ckn_verb_scenarios (
  verb_key INTEGER NOT NULL REFERENCES private.ckn_verb(verb_key) ON DELETE CASCADE,
  scenario_key INTEGER NOT NULL REFERENCES private.ckn_scenarios(scenario_key) ON DELETE CASCADE,
  verb_scenario_version INT DEFAULT 1,
  verb_scenario_updated_at TIMESTAMPTZ DEFAULT now(),
  verb_scenario_created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (verb_key, scenario_key)
);

COMMENT ON TABLE private.ckn_verb_scenarios IS 'CKN: Many-to-many relationship between verbs and scenarios.';

COMMENT ON COLUMN private.ckn_verb_scenarios.verb_key IS 'Foreign key to specific verb.';
COMMENT ON COLUMN private.ckn_verb_scenarios.scenario_key IS 'Foreign key to scenario.';
COMMENT ON COLUMN private.ckn_verb_scenarios.verb_scenario_version IS 'Version marker for this mapping.';
COMMENT ON COLUMN private.ckn_verb_scenarios.verb_scenario_updated_at IS 'Timestamp of last update.';
COMMENT ON COLUMN private.ckn_verb_scenarios.verb_scenario_created_at IS 'Timestamp of record creation.';

-- ************************************************************************
-- CREATE VIEW: private.ckn_verb_forms
-- ************************************************************************

CREATE VIEW private.ckn_verb_forms AS
SELECT verb_key, verb_infinitive AS base, 'yo' AS person, verb_yo AS form FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'tú', 'verb_tu' FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'él/ella/usted', verb_el_ella_usted FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'nosotros', verb_nosotros FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'vosotros', verb_vosotros FROM private.ckn_verb
UNION ALL SELECT verb_key, verb_infinitive, 'ellos/ellas/ustedes', verb_ellos_ellas_ustedes FROM private.ckn_verb;

COMMENT ON VIEW private.ckn_verb_forms IS 'CKN: Flattened verb conjugations per person for querying or analytics.';
COMMENT ON COLUMN private.ckn_verb_forms.verb_key IS 'Foreign key to private.ckn_verb.';
COMMENT ON COLUMN private.ckn_verb_forms.base IS 'Infinitive form of the verb.';
COMMENT ON COLUMN private.ckn_verb_forms.person IS 'Grammatical person (yo, tú, etc.).';
COMMENT ON COLUMN private.ckn_verb_forms.form IS 'Conjugated form of the verb for the person.';


-- ************************************************************************
-- CREATE VIEW: private.ckn_noun_forms
-- ************************************************************************

CREATE VIEW private.ckn_noun_forms AS
SELECT noun_key, noun_singular AS form, 'singular' AS number FROM private.ckn_noun
UNION ALL
SELECT noun_key, noun_plural, 'plural' FROM private.ckn_noun;

COMMENT ON VIEW private.ckn_noun_forms IS 'CKN: Combines singular and plural noun forms for simplified lookup.';
COMMENT ON COLUMN private.ckn_noun_forms.noun_key IS 'Foreign key to private.ckn_noun.';
COMMENT ON COLUMN private.ckn_noun_forms.form IS 'Singular or plural form of the noun.';
COMMENT ON COLUMN private.ckn_noun_forms.number IS 'Label indicating singular or plural form.';

-- ************************************************************************
-- ROW LEVEL SECURITY (RLS) POLICIES: private.ckn_tts_cache
-- ************************************************************************

-- Enable RLS
ALTER TABLE private.ckn_tts_cache ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------
-- Supabase Admin: Full access for Supabase administrative roles
-- ------------------------------------------------------------------------
CREATE POLICY "Supabase Admin can manage ckn_tts_cache" ON private.ckn_tts_cache
  FOR ALL TO supabase_auth_admin
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------
-- Authenticated Users: Allow read-only access
-- ------------------------------------------------------------------------
CREATE POLICY "Authenticated users can view ckn_tts_cache" ON private.ckn_tts_cache
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ------------------------------------------------------------------------
-- Service Role: Allow read and insert (write) access
-- ------------------------------------------------------------------------
CREATE POLICY "Service role can select ckn_tts_cache" ON private.ckn_tts_cache
  FOR SELECT TO service_role
  USING (true);

CREATE POLICY "Service role can insert ckn_tts_cache" ON private.ckn_tts_cache
  FOR INSERT TO service_role
  WITH CHECK (true);

-- ************************************************************************
-- INDEXES
-- ************************************************************************

-- Fast lookup by cooked email for verification and access logic
CREATE INDEX idx_ckn_email_code_cooked_email ON private.ckn_email_code (email_code_cooked_email);

-- Improve lookup speed by signature in TTS cache (deduplication, reuse)
CREATE INDEX idx_ckn_tts_cache_signature ON private.ckn_tts_cache (tts_cache_signature);

-- Improve recency-based purging or revalidation of cached entries
CREATE INDEX idx_ckn_tts_cache_last_used ON private.ckn_tts_cache (tts_cache_last_used);

-- ************************************************************************
-- FUNCTION: private.ckn_bump_paywall_package_counts
-- ************************************************************************

CREATE OR REPLACE FUNCTION private.ckn_bump_paywall_package_counts(
  arg_client_uuid TEXT,
  arg_bump_green_count INT,
  arg_bump_yellow_count INT
)
RETURNS TABLE (
  paywall_client_uuid TEXT,
  paywall_package_green_remaining INT,
  paywall_package_yellow_remaining INT,
  paywall_stripe_customer_id TEXT,
  paywall_stripe_subscription_id TEXT,
  paywall_stripe_metadata JSONB,
  paywall_version INT,
  paywall_updated_at TIMESTAMPTZ,
  paywall_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  -- Apply the bump atomically
  UPDATE private.ckn_paywall
  SET
    paywall_package_green_remaining = paywall_package_green_remaining + arg_bump_green_count,
    paywall_package_yellow_remaining = paywall_package_yellow_remaining + arg_bump_yellow_count,
    paywall_version = paywall_version + 1,
    paywall_updated_at = NOW()
  WHERE paywall_client_uuid = arg_client_uuid;

  -- Return the updated record via internal get function
  RETURN QUERY
  SELECT * FROM private.ckn_get_paywall(arg_client_uuid);
END;
$$;

-- ************************************************************************
-- FUNCTION: public.ckn_bump_paywall_package_counts
-- ************************************************************************

CREATE FUNCTION public.ckn_bump_paywall_package_counts(
  arg_client_uuid TEXT,
  arg_bump_green_count INT,
  arg_bump_yellow_count INT
)
RETURNS VOID
LANGUAGE sql
SECURITY INVOKER
AS $$
  SELECT private.ckn_bump_paywall_package_counts(
    arg_client_uuid,
    arg_bump_green_count,
    arg_bump_yellow_count
  );
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_get_paywall
-- ************************************************************************

CREATE FUNCTION private.ckn_get_paywall(
  arg_client_uuid TEXT
)
RETURNS TABLE (
  paywall_client_uuid TEXT,
  paywall_content JSONB,
  paywall_version INT,
  paywall_updated_at TIMESTAMPTZ,
  paywall_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.paywall_client_uuid,
    p.paywall_content,
    p.paywall_version,
    p.paywall_updated_at,
    p.paywall_created_at
  FROM private.ckn_paywall p
  WHERE p.paywall_client_uuid = arg_client_uuid;
END;
$$;

-- ************************************************************************
-- FUNCTION: public.ckn_get_paywall
-- ************************************************************************

CREATE FUNCTION public.ckn_get_paywall(
  arg_client_uuid TEXT
)
RETURNS TABLE (
  paywall_client_uuid TEXT,
  paywall_content JSONB,
  paywall_version INT,
  paywall_updated_at TIMESTAMPTZ,
  paywall_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT * FROM private.ckn_get_paywall(arg_client_uuid);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_upsert_paywall
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_paywall(
  arg_client_uuid TEXT,
  arg_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RAISE LOG '→ FUNC: private.ckn_upsert_paywall | uuid=%, content=%',
    arg_client_uuid, arg_content;

  BEGIN
    INSERT INTO private.ckn_paywall (
      paywall_client_uuid,
      paywall_content
    )
    VALUES (
      arg_client_uuid,
      arg_content
    )
    ON CONFLICT (paywall_client_uuid) DO UPDATE
    SET
      paywall_content = EXCLUDED.paywall_content,
      paywall_version = private.ckn_paywall.paywall_version + 1,
      paywall_updated_at = NOW();

  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in private.ckn_upsert_paywall: %', SQLERRM;
      RAISE EXCEPTION 'private.ckn_upsert_paywall failed';
  END;
END;
$$;

-- ************************************************************************
-- FUNCTION: public.ckn_upsert_paywall
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_paywall(
  arg_client_uuid TEXT,
  arg_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM private.ckn_upsert_paywall(arg_client_uuid, arg_content);
END;
$$;


-- ************************************************************************
-- FUNCTION: private.ckn_upsert_marketing_data
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_marketing_data(
  arg_client_uuid TEXT,
  arg_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RAISE LOG '→ FUNC: private.ckn_upsert_marketing_data | uuid=%, content=%',
    arg_client_uuid, arg_content;

  BEGIN
    INSERT INTO private.ckn_marketing_data (
      marketing_data_client_uuid,
      marketing_data_preferences
    )
    VALUES (
      arg_client_uuid,
      arg_content
    )
    ON CONFLICT (marketing_data_client_uuid) DO UPDATE
    SET
      marketing_data_preferences = EXCLUDED.marketing_data_preferences,
      marketing_data_version = private.ckn_marketing_data.marketing_data_version + 1,
      marketing_data_updated_at = NOW();

  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in private.ckn_upsert_marketing_data: %', SQLERRM;
      RAISE EXCEPTION 'private.ckn_upsert_marketing_data failed';
  END;
END;
$$;

-- ************************************************************************
-- SHIM FUNCTION: public.ckn_upsert_marketing_data
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_marketing_data(
  arg_client_uuid TEXT,
  arg_content JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RAISE LOG '→ SHIM: public.ckn_upsert_marketing_data | uuid=%, content=%',
    arg_client_uuid, arg_content;

  BEGIN
    PERFORM private.ckn_upsert_marketing_data(arg_client_uuid, arg_content);
  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in public.ckn_upsert_marketing_data: %', SQLERRM;
      RAISE EXCEPTION 'public.ckn_upsert_marketing_data failed';
  END;
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_get_marketing_data
-- ************************************************************************

CREATE FUNCTION private.ckn_get_marketing_data(
  arg_client_uuid TEXT
)
RETURNS TABLE (
  marketing_data_client_uuid TEXT,
  marketing_data_preferences JSONB,
  marketing_data_version INT,
  marketing_data_updated_at TIMESTAMPTZ,
  marketing_data_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.marketing_data_client_uuid,
    m.marketing_data_preferences,
    m.marketing_data_version,
    m.marketing_data_updated_at,
    m.marketing_data_created_at
  FROM private.ckn_marketing_data m
  WHERE m.marketing_data_client_uuid = arg_client_uuid;
END;
$$;

-- ************************************************************************
-- SHIM FUNCTION: public.ckn_get_marketing_data
-- ************************************************************************

CREATE FUNCTION public.ckn_get_marketing_data(
  arg_client_uuid TEXT
)
RETURNS TABLE (
  marketing_data_client_uuid TEXT,
  marketing_data_preferences JSONB,
  marketing_data_version INT,
  marketing_data_updated_at TIMESTAMPTZ,
  marketing_data_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM private.ckn_get_marketing_data(arg_client_uuid);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_upsert_marketing_preferences
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_marketing_preferences(
  arg_client_uuid TEXT,
  arg_preferences JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RAISE LOG '→ FUNC: private.ckn_upsert_marketing_preferences | uuid=%, preferences=%',
    arg_client_uuid, arg_preferences;

  BEGIN
    INSERT INTO private.ckn_marketing_data (
      marketing_data_client_uuid,
      marketing_data_preferences
    )
    VALUES (
      arg_client_uuid,
      arg_preferences
    )
    ON CONFLICT (marketing_data_client_uuid) DO UPDATE
    SET
      marketing_data_preferences = EXCLUDED.marketing_data_preferences,
      marketing_data_version = private.ckn_marketing_data.marketing_data_version + 1,
      marketing_data_updated_at = NOW();

  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in private.ckn_upsert_marketing_preferences: %', SQLERRM;
      RAISE EXCEPTION 'private.ckn_upsert_marketing_preferences failed';
  END;
END;
$$;

-- ************************************************************************
-- SHIM FUNCTION: public.ckn_upsert_marketing_preferences
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_marketing_preferences(
  arg_client_uuid TEXT,
  arg_preferences JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RAISE LOG '→ SHIM: public.ckn_upsert_marketing_preferences | uuid=%, preferences=%',
    arg_client_uuid, arg_preferences;

  BEGIN
    PERFORM private.ckn_upsert_marketing_preferences(arg_client_uuid, arg_preferences);
  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in public.ckn_upsert_marketing_preferences: %', SQLERRM;
      RAISE EXCEPTION 'public.ckn_upsert_marketing_preferences failed';
  END;
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_get_marketing_preferences
-- ************************************************************************

CREATE FUNCTION private.ckn_get_marketing_preferences(
  arg_client_uuid TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  prefs JSONB;
BEGIN
  SELECT m.marketing_data_preferences
  INTO prefs
  FROM private.ckn_marketing_data m
  WHERE m.marketing_data_client_uuid = arg_client_uuid;

  RETURN COALESCE(prefs, '{}'::JSONB);
END;
$$;

-- ************************************************************************
-- SHIM FUNCTION: public.ckn_get_marketing_preferences
-- ************************************************************************

CREATE FUNCTION public.ckn_get_marketing_preferences(
  arg_client_uuid TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN private.ckn_get_marketing_preferences(arg_client_uuid);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_insert_prompt_response
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_prompt_response(
  arg_client_uuid TEXT,
  arg_lesson_id TEXT,
  arg_prompt TEXT,
  arg_response TEXT,
  arg_gen_ai_provider TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  -- RAISE LOG '→ FUNC: private.ckn_insert_prompt_response | uuid=%, lesson=%, provider=%',
  --   arg_client_uuid, arg_lesson_id, arg_gen_ai_provider;

  BEGIN
    INSERT INTO private.ckn_prompt_response (
      prompt_response_client_uuid,
      prompt_response_lesson_id,
      prompt_response_prompt,
      prompt_response_response,
      prompt_response_gen_ai_provider
    )
    VALUES (
      arg_client_uuid,
      arg_lesson_id,
      arg_prompt,
      arg_response,
      arg_gen_ai_provider
    );

  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in private.ckn_insert_prompt_response: %', SQLERRM;
      RAISE EXCEPTION 'private.ckn_insert_prompt_response failed';
  END;
END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_insert_prompt_response
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_prompt_response(
  arg_client_uuid TEXT,
  arg_lesson_id TEXT,
  arg_prompt TEXT,
  arg_response TEXT,
  arg_gen_ai_provider TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- RAISE LOG '→ SHIM: public.ckn_insert_prompt_response | email=%, lesson=%, prompt=%, response=%, provider=%',
  --   arg_client_uuid, arg_lesson_id, arg_prompt, arg_response, arg_gen_ai_provider;

  BEGIN
    PERFORM private.ckn_insert_prompt_response(
      arg_client_uuid,
      arg_lesson_id,
      arg_prompt,
      arg_response,
      arg_gen_ai_provider
    );
  EXCEPTION
    WHEN OTHERS THEN
      RAISE LOG '‼️ ERROR in public.ckn_insert_prompt_response: %', SQLERRM;
      RAISE EXCEPTION 'public.ckn_insert_prompt_response failed';
  END;
END;
$$;


-- ************************************************************************
-- FUNCTION: private.ckn_insert_lesson
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_lesson(
  arg_lesson_id TEXT,
  arg_lesson_number INTEGER,
  arg_lesson_client_uuid TEXT,
  arg_lesson_timestamp TEXT,
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
    lesson_client_uuid,
    lesson_timestamp,
    lesson_name,
    lesson_description,
    lesson_target_language,
    lesson_source_language,
    lesson_scenario,
    lesson_participant_list,
    lesson_prose
  )
  VALUES (
    arg_lesson_id,
    arg_lesson_number,
    arg_lesson_client_uuid,
    arg_lesson_timestamp,
    arg_lesson_name,
    arg_lesson_description,
    arg_lesson_target_language,
    arg_lesson_source_language,
    arg_lesson_scenario,
    arg_lesson_participant_list,
    arg_lesson_prose
  )
  ON CONFLICT (lesson_id) DO UPDATE
  SET
    lesson_number = EXCLUDED.lesson_number,
    lesson_client_uuid = EXCLUDED.lesson_client_uuid,
    lesson_timestamp = EXCLUDED.lesson_timestamp,
    lesson_name = EXCLUDED.lesson_name,
    lesson_description = EXCLUDED.lesson_description,
    lesson_target_language = EXCLUDED.lesson_target_language,
    lesson_source_language = EXCLUDED.lesson_source_language,
    lesson_scenario = EXCLUDED.lesson_scenario,
    lesson_participant_list = EXCLUDED.lesson_participant_list,
    lesson_prose = EXCLUDED.lesson_prose,
    lesson_updated_at = NOW();

END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_insert_lesson
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_lesson(
  arg_lesson_id TEXT,
  arg_lesson_number INTEGER,
  arg_lesson_client_uuid TEXT,
  arg_lesson_timestamp TEXT,
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
    arg_lesson_number,
    arg_lesson_client_uuid,
    arg_lesson_timestamp,
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
-- FUNCTION: ckn_upsert_module
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_module(
  arg_lesson_id TEXT,
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
    lesson_id,
    module_name,
    module_content
  ) VALUES (
    arg_lesson_id,
    arg_module_name,
    arg_module_content
  )
  ON CONFLICT (lesson_id, module_name) DO UPDATE SET
    module_content = EXCLUDED.module_content,
    module_updated_at = now();
END;
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_upsert_module
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_module(
  arg_lesson_id TEXT,
  arg_module_name TEXT,
  arg_module_content JSONB
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT private.ckn_upsert_module(
    arg_lesson_id,
    arg_module_name,
    arg_module_content
  );
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_get_user_data
-- ************************************************************************

CREATE FUNCTION private.ckn_get_user_data(
  arg_client_uuid TEXT
)
RETURNS SETOF private.ckn_user_data_view
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_user_data_view
  WHERE user_data_client_uuid = arg_client_uuid;
$$;


-- ************************************************************************
-- FUNCTION SHIM: public.ckn_get_user_data
-- ************************************************************************

CREATE FUNCTION public.ckn_get_user_data(
  arg_client_uuid TEXT
)
RETURNS SETOF private.ckn_user_data_view
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT * FROM private.ckn_get_user_data(arg_client_uuid);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_upsert_user_data
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_user_data(
  arg_client_uuid TEXT,
  arg_flex_lesson TEXT,
  arg_current_lesson JSONB,
  arg_lessons JSONB,
  arg_lesson_number INT,
  arg_lesson_prompt TEXT,
  arg_lesson_timestamp TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO private.ckn_user_data (
    user_data_client_uuid,
    user_data_flex_lesson,
    user_data_current_lesson,
    user_data_lessons,
    user_data_lesson_number,
    user_data_lesson_prompt,
    user_data_lesson_timestamp
  )
  VALUES (
    arg_client_uuid,
    arg_flex_lesson,
    arg_current_lesson,
    arg_lessons,
    arg_lesson_number,
    arg_lesson_prompt,
    arg_lesson_timestamp
  )
  ON CONFLICT (user_data_client_uuid)
  DO UPDATE SET
    user_data_client_uuid = EXCLUDED.user_data_client_uuid,
    user_data_flex_lesson = EXCLUDED.user_data_flex_lesson,
    user_data_current_lesson = EXCLUDED.user_data_current_lesson,
    user_data_lessons = EXCLUDED.user_data_lessons,
    user_data_lesson_number = EXCLUDED.user_data_lesson_number,
    user_data_lesson_prompt = EXCLUDED.user_data_lesson_prompt,
    user_data_lesson_timestamp = EXCLUDED.user_data_lesson_timestamp,
    user_data_updated_at = now();
END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_upsert_user_data
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_user_data(
  arg_client_uuid TEXT,
  arg_flex_lesson TEXT,
  arg_current_lesson JSONB,
  arg_lessons JSONB,
  arg_lesson_number INT,
  arg_lesson_prompt TEXT,
  arg_lesson_timestamp TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM private.ckn_upsert_user_data(
    arg_client_uuid,
    arg_flex_lesson,
    arg_current_lesson,
    arg_lessons,
    arg_lesson_number,
    arg_lesson_prompt,
    arg_lesson_timestamp
  );
END;
$$;

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
-- FUNCTION SHIM: public.ckn_get_noun_by_scenario
-- ************************************************************************

CREATE FUNCTION public.ckn_get_noun_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_noun_record
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM private.ckn_get_noun_by_scenario(arg_scenario, arg_language);
END;
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
         v.verb_nosotros, v.verb_vosotros, v.verb_ellos_ellas_ustedes, v.curated
  FROM private.ckn_verb v
  JOIN private.ckn_verb_scenarios vs ON v.verb_key = vs.verb_key
  JOIN private.ckn_scenarios s ON vs.scenario_key = s.scenario_key
  JOIN private.ckn_verb_base vb ON vb.verb_base_key = v.verb_base_key
  WHERE s.scenario = arg_scenario
    AND v.language = arg_language;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_get_verb_by_scenario
-- ************************************************************************

CREATE FUNCTION public.ckn_get_verb_by_scenario(
  arg_scenario TEXT,
  arg_language TEXT
)
RETURNS SETOF private.ckn_verb_record
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM private.ckn_get_verb_by_scenario(arg_scenario, arg_language);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_lookup_tts_cache (returns view type)
-- ************************************************************************

CREATE FUNCTION private.ckn_lookup_tts_cache(
  arg_tts_cache_signature TEXT
)
RETURNS SETOF private.ckn_tts_cache_view
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  -- Update usage stats
  UPDATE private.ckn_tts_cache AS tts
  SET 
    tts_cache_usage_count = tts.tts_cache_usage_count + 1,
    tts_cache_last_used = timezone('utc', now())
  WHERE tts.tts_cache_signature = arg_tts_cache_signature;

  -- Return result from view
  RETURN QUERY
  SELECT *
  FROM private.ckn_tts_cache_view
  WHERE tts_cache_signature = arg_tts_cache_signature;
END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_lookup_tts_cache
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_tts_cache(
  arg_tts_cache_signature TEXT
)
RETURNS SETOF private.ckn_tts_cache_view
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_lookup_tts_cache(arg_tts_cache_signature);
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_insert_tts_cache (returns view type)
-- ************************************************************************

CREATE FUNCTION private.ckn_insert_tts_cache(
  arg_tts_cache_signature TEXT,
  arg_tts_cache_text TEXT,
  arg_tts_cache_voice TEXT,
  arg_tts_cache_language TEXT DEFAULT 'es-US'
)
RETURNS SETOF private.ckn_tts_cache_view
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
-- FUNCTION SHIM: public.ckn_insert_tts_cache
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_tts_cache(
  arg_tts_cache_signature TEXT,
  arg_tts_cache_text TEXT,
  arg_tts_cache_voice TEXT,
  arg_tts_cache_language TEXT DEFAULT 'es-US'
)
RETURNS SETOF private.ckn_tts_cache_view
LANGUAGE sql
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
-- FUNCTION SHIM: public.ckn_insert_noun
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
-- FUNCTION: private.ckn_insert_verb
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

  INSERT INTO private.ckn_verb_scenarios (verb_key, scenario_key)
  VALUES (local_verb_key, local_scenario_key)
  ON CONFLICT DO NOTHING;
END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_insert_verb
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
-- FUNCTION: private.ckn_insert_noun_example
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
-- FUNCTION: public.ckn_insert_noun_example
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_noun_example(
  arg_noun_key INTEGER,
  arg_noun_example_data JSONB
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT private.ckn_insert_noun_example(
    arg_noun_key,
    arg_noun_example_data
  );
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_noun_example
-- ************************************************************************

CREATE FUNCTION private.ckn_lookup_noun_example(
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
-- FUNCTION: public.ckn_lookup_noun_example
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_noun_example(
  arg_noun_key INTEGER
)
RETURNS TABLE (
  noun_key INTEGER,
  noun_form TEXT,
  number TEXT,
  noun_example_data JSONB
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT * FROM private.ckn_lookup_noun_example(arg_noun_key);
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
-- FUNCTION SHIM: public.ckn_insert_verb_example
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_verb_example(
  arg_verb_key INTEGER,
  arg_verb_example_data JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM private.ckn_insert_verb_example(
    arg_verb_key,
    arg_verb_example_data
  );
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_lookup_verb_example
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
-- FUNCTION SHIM: public.ckn_lookup_verb_example
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_verb_example(
  arg_verb_key INTEGER
)
RETURNS TABLE (
  verb_key INTEGER,
  base TEXT,
  person TEXT,
  form TEXT,
  verb_example_data JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM private.ckn_lookup_verb_example(arg_verb_key);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_get_module_by_lesson_and_name
-- ************************************************************************

CREATE FUNCTION private.ckn_get_module_by_lesson_and_name(
  lesson_id TEXT,
  module_name TEXT
)
RETURNS JSONB
LANGUAGE sql
SECURITY DEFINER
SET search_path = private, public
AS $$
  SELECT module_content FROM private.ckn_module
  WHERE lesson_id = $1 AND module_name = $2
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_get_module_by_lesson_and_name
-- ************************************************************************

CREATE FUNCTION public.ckn_get_module_by_lesson_and_name(
  lesson_id TEXT,
  module_name TEXT
)
RETURNS JSONB
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT private.ckn_get_module_by_lesson_and_name(lesson_id, module_name);
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_upsert_email_code
-- ************************************************************************

CREATE FUNCTION private.ckn_upsert_email_code(
  arg_cooked_email TEXT,
  arg_code TEXT,
  arg_expires_at TIMESTAMPTZ
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  INSERT INTO private.ckn_email_code (
    email_code_cooked_email,
    email_code_code,
    email_code_expires_at
  ) VALUES (
    arg_cooked_email,
    arg_code,
    arg_expires_at
  )
  ON CONFLICT (email_code_cooked_email)
  DO UPDATE SET
    email_code_code = excluded.email_code_code,
    email_code_expires_at = excluded.email_code_expires_at,
    email_code_created_at = now(),
    email_code_verified = false;
END;
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_upsert_email_code
-- ************************************************************************

CREATE FUNCTION public.ckn_upsert_email_code(
  arg_cooked_email TEXT,
  arg_code TEXT,
  arg_expires_at TIMESTAMPTZ
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM private.ckn_upsert_email_code(arg_cooked_email, arg_code, arg_expires_at);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_verify_cooked_email
-- ************************************************************************
CREATE FUNCTION private.ckn_verify_cooked_email(
  arg_cooked_email TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM private.ckn_email_code
    WHERE email_code_cooked_email = arg_cooked_email
      AND email_code_verified = TRUE
  );
END;
$$;

-- ************************************************************************
-- FUNCTION SHIM: public.ckn_verify_cooked_email
-- ************************************************************************

CREATE FUNCTION public.ckn_verify_cooked_email(
  arg_cooked_email TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN private.ckn_verify_cooked_email(arg_cooked_email);
END;
$$;

-- ************************************************************************
-- FUNCTION: private.ckn_verify_email_code
-- ************************************************************************

CREATE FUNCTION private.ckn_verify_email_code(
  arg_cooked_email TEXT,
  arg_code TEXT
)
RETURNS TABLE (
  email_code_key UUID,
  email_code_cooked_email TEXT,
  email_code_code TEXT,
  email_code_verified BOOLEAN,
  email_code_expires_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private, public
AS $$
BEGIN
  -- RAISE LOG '→ ENTERING: private.ckn_verify_email_code | cooked_email=%, code=%', arg_cooked_email, arg_code;

  RETURN QUERY
  WITH to_verify AS (
    SELECT ec.email_code_key
    FROM private.ckn_email_code ec
    WHERE ec.email_code_cooked_email = arg_cooked_email
      AND ec.email_code_code = arg_code
      AND ec.email_code_verified = FALSE
      AND ec.email_code_expires_at > NOW()
  )
  UPDATE private.ckn_email_code
  SET 
    email_code_verified = TRUE,
    email_code_created_at = NOW()
  WHERE private.ckn_email_code.email_code_key IN (SELECT to_verify.email_code_key FROM to_verify)
  RETURNING 
    private.ckn_email_code.email_code_key,
    private.ckn_email_code.email_code_cooked_email,
    private.ckn_email_code.email_code_code,
    private.ckn_email_code.email_code_verified,
    private.ckn_email_code.email_code_expires_at;
END;
$$;

-- ************************************************************************
-- FUNCTION SHIMS: public.ckn_verify_email_code
-- ************************************************************************

-- PUBLIC SHIM: delegates to private function
CREATE FUNCTION public.ckn_verify_email_code(
  arg_cooked_email TEXT,
  arg_code TEXT
)
RETURNS TABLE (
  email_code_key UUID,
  email_code_cooked_email TEXT,
  email_code_code TEXT,
  email_code_verified BOOLEAN,
  email_code_expires_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM private.ckn_verify_email_code(arg_cooked_email, arg_code);
END;
$$;

-- ************************************************************************
-- GRANTS
-- ************************************************************************

GRANT USAGE ON SCHEMA private TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA private TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA private
GRANT EXECUTE ON FUNCTIONS TO service_role;

GRANT EXECUTE ON FUNCTION private.ckn_bump_paywall_package_counts(TEXT, INT, INT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_marketing_data(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_marketing_preferences(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_module_by_lesson_and_name(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_noun_by_scenario(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_paywall(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_user_data(TEXT) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_get_verb_by_scenario(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_lesson(TEXT, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_noun(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_noun_example(INTEGER, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_prompt_response(TEXT, TEXT, TEXT, TEXT, TEXT) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_tts_cache(TEXT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_verb(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_insert_verb_example(INTEGER, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_lookup_noun_example(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_lookup_tts_cache(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_lookup_verb_example(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_email_code(TEXT, TEXT, TIMESTAMPTZ) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_email_code(TEXT, TEXT, TIMESTAMPTZ) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_marketing_data(TEXT, JSONB) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_marketing_preferences(TEXT, JSONB) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_module(TEXT, TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_paywall(TEXT, JSONB) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_upsert_user_data(TEXT, TEXT, JSONB, JSONB, INT, TEXT, TEXT) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_verify_cooked_email(TEXT) to service_role;
GRANT EXECUTE ON FUNCTION private.ckn_verify_email_code(TEXT, TEXT) to service_role;

ALTER ROLE service_role SET search_path = private, public;

GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_email_code TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_lesson TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_marketing_data TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_module TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_noun TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_noun_base TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_noun_example TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_noun_scenarios TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_paywall TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_prompt_response TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_scenarios TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_tts_cache TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_user_data TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_verb TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_verb_base TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_verb_example TO service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE private.ckn_verb_scenarios TO service_role;
