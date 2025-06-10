-- ************************************************************************
-- DROP EXISTING ENTITIES
-- ************************************************************************

DROP FUNCTION IF EXISTS public.ckn_lookup_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_insert_tts_cache;
DROP FUNCTION IF EXISTS public.ckn_insert_noun;
DROP FUNCTION IF EXISTS public.ckn_insert_verb;
DROP FUNCTION IF EXISTS public.ckn_lookup_verb_examples;
DROP FUNCTION IF EXISTS public.ckn_insert_verb_example;
DROP FUNCTION IF EXISTS public.ckn_lookup_noun_examples;
DROP FUNCTION IF EXISTS public.ckn_insert_noun_example;

DROP TABLE IF EXISTS public.ckn_tts_cache;
DROP VIEW IF EXISTS public.ckn_verb_forms;
DROP VIEW IF EXISTS public.ckn_noun_forms;
DROP TABLE IF EXISTS public.ckn_noun_examples;
DROP TABLE IF EXISTS public.ckn_verb_examples;
DROP TABLE IF EXISTS public.ckn_verbs;
DROP TABLE IF EXISTS public.ckn_nouns;

-- ************************************************************************
-- CREATE TABLES
-- ************************************************************************

CREATE TABLE public.ckn_tts_cache (
  tts_cache_key SERIAL PRIMARY KEY,
  tts_cache_signature TEXT UNIQUE NOT NULL,
  tts_cache_text TEXT NOT NULL,
  tts_cache_voice TEXT NOT NULL,
  tts_cache_language TEXT NOT NULL DEFAULT 'es-US',
  tts_cache_usage_count INTEGER NOT NULL DEFAULT 1,
  tts_cache_last_used TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  tts_cache_created TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.ckn_tts_cache IS 'CKN: Caches results from Google TTS service to avoid repeat synthesis.';

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_signature IS 'SHA256 signature of normalized TTS input.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_text IS 'Original input text sent to TTS.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_voice IS 'TTS voice name used for synthesis.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_language IS 'Language code like es-US.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_usage_count IS 'How many times this entry was accessed.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_last_used IS 'Last time this cache entry was served.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_created IS 'Time this cache entry was created.';


CREATE TABLE public.ckn_nouns (
  noun_key SERIAL PRIMARY KEY,
  noun_singular TEXT NOT NULL UNIQUE,
  noun_plural TEXT NOT NULL,
  noun_gender TEXT CHECK (noun_gender IN ('M', 'F')) NOT NULL,
  noun_article TEXT GENERATED ALWAYS AS (
    CASE noun_gender
      WHEN 'M' THEN 'el'
      WHEN 'F' THEN 'la'
    END
  ) STORED
);

COMMENT ON TABLE public.ckn_nouns IS 'Stores noun vocabulary with singular/plural forms and grammatical gender.';

COMMENT ON COLUMN public.ckn_nouns.noun_key IS 'Primary key for the noun entry.';
COMMENT ON COLUMN public.ckn_nouns.noun_singular IS 'The singular form of the noun (e.g., "comensal").';
COMMENT ON COLUMN public.ckn_nouns.noun_plural IS 'The plural form of the noun (e.g., "comensales").';
COMMENT ON COLUMN public.ckn_nouns.noun_gender IS 'Grammatical gender of the noun: M = masculino, F = femenino.';
COMMENT ON COLUMN public.ckn_nouns.noun_article IS 'Definite article ("el" or "la") generated from noun_gender.';

CREATE TABLE public.ckn_noun_examples (
  example_key SERIAL PRIMARY KEY,
  noun_key INTEGER NOT NULL REFERENCES public.ckn_nouns(noun_key) ON DELETE CASCADE,
  example_data JSONB NOT NULL,  -- e.g., sentence, context, tags, region
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE TABLE public.ckn_verbs (
  verb_key SERIAL PRIMARY KEY,
  verb_infinitive TEXT NOT NULL UNIQUE,
  verb_yo TEXT,
  verb_tu TEXT,
  verb_el_ella_usted TEXT,
  verb_nosotros TEXT,
  verb_vosotros TEXT,
  verb_ellos_ellas_ustedes TEXT
);

COMMENT ON TABLE public.ckn_verbs IS 'Stores conjugated forms of Spanish verbs by grammatical subject.';

COMMENT ON COLUMN public.ckn_verbs.verb_key IS 'Primary key for the verb entry.';
COMMENT ON COLUMN public.ckn_verbs.verb_infinitive IS 'The infinitive form of the verb (e.g., "tener").';
COMMENT ON COLUMN public.ckn_verbs.verb_yo IS 'First person singular form (yo).';
COMMENT ON COLUMN public.ckn_verbs.verb_tu IS 'Second person singular informal form (tú).';
COMMENT ON COLUMN public.ckn_verbs.verb_el_ella_usted IS 'Third person singular form (él/ella/usted).';
COMMENT ON COLUMN public.ckn_verbs.verb_nosotros IS 'First person plural form (nosotros).';
COMMENT ON COLUMN public.ckn_verbs.verb_vosotros IS 'Second person plural form (vosotros – typically unused in Latin America).';
COMMENT ON COLUMN public.ckn_verbs.verb_ellos_ellas_ustedes IS 'Third person plural form (ellos/ellas/ustedes).';

CREATE TABLE public.ckn_verb_examples (
  example_key SERIAL PRIMARY KEY,
  verb_key INTEGER NOT NULL REFERENCES public.ckn_verbs(verb_key) ON DELETE CASCADE,
  example_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ************************************************************************
-- VIEWS
-- ************************************************************************

CREATE VIEW public.ckn_verb_forms AS
SELECT verb_key, verb_infinitive AS base, 'yo' AS person, verb_yo AS form FROM ckn_verbs
UNION ALL SELECT verb_key, verb_infinitive, 'tú', verb_tu FROM ckn_verbs
UNION ALL SELECT verb_key, verb_infinitive, 'él/ella/usted', verb_el_ella_usted FROM ckn_verbs
UNION ALL SELECT verb_key, verb_infinitive, 'nosotros', verb_nosotros FROM ckn_verbs
UNION ALL SELECT verb_key, verb_infinitive, 'vosotros', verb_vosotros FROM ckn_verbs
UNION ALL SELECT verb_key, verb_infinitive, 'ellos/ellas/ustedes', verb_ellos_ellas_ustedes FROM ckn_verbs;

CREATE VIEW public.ckn_noun_forms AS
SELECT noun_key, noun_singular AS form, 'singular' AS number FROM ckn_nouns
UNION ALL
SELECT noun_key, noun_plural, 'plural' FROM ckn_nouns;

-- ************************************************************************
-- RLS POLICIES
-- ************************************************************************

ALTER TABLE public.ckn_tts_cache ENABLE ROW LEVEL SECURITY;

-- Admins
CREATE POLICY "Supabase Admin can manage ckn_tts_cache" ON public.ckn_tts_cache
  FOR ALL TO supabase_auth_admin
  USING (true)
  WITH CHECK (true);

-- Authenticated users (read-only)
CREATE POLICY "Authenticated users can view ckn_tts_cache" ON public.ckn_tts_cache
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Service role (read/write)
CREATE POLICY "Service role can select ckn_tts_cache" ON public.ckn_tts_cache
  FOR SELECT TO service_role
  USING (true);

CREATE POLICY "Service role can insert ckn_tts_cache" ON public.ckn_tts_cache
  FOR INSERT TO service_role
  WITH CHECK (true);

-- ************************************************************************
-- INDEXES
-- ************************************************************************

CREATE INDEX idx_ckn_tts_cache_signature ON public.ckn_tts_cache(tts_cache_signature);
CREATE INDEX idx_ckn_tts_cache_last_used ON public.ckn_tts_cache(tts_cache_last_used);

-- ************************************************************************
-- FUNCTION: ckn_lookup_tts_cache
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
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  RETURN QUERY
  UPDATE public.ckn_tts_cache AS tts
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
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  INSERT INTO public.ckn_tts_cache (
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
  FROM public.ckn_lookup_tts_cache(arg_tts_cache_signature);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_noun
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_noun(
  arg_noun_singular TEXT,
  arg_noun_plural TEXT,
  arg_noun_gender TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  IF trim(arg_noun_singular) IS NULL OR
     trim(arg_noun_plural) IS NULL OR
     trim(arg_noun_gender) IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.ckn_nouns (
    noun_singular,
    noun_plural,
    noun_gender
  ) VALUES (
    arg_noun_singular,
    arg_noun_plural,
    arg_noun_gender
  )
  ON CONFLICT (noun_singular) DO NOTHING;
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_verb
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_verb(
  arg_verb_infinitive TEXT,
  arg_verb_yo TEXT,
  arg_verb_tu TEXT,
  arg_verb_el_ella_usted TEXT,
  arg_verb_nosotros TEXT,
  arg_verb_vosotros TEXT,
  arg_verb_ellos_ellas_ustedes TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  IF trim(arg_verb_infinitive) IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.ckn_verbs (
    verb_infinitive,
    verb_yo,
    verb_tu,
    verb_el_ella_usted,
    verb_nosotros,
    verb_vosotros,
    verb_ellos_ellas_ustedes
  ) VALUES (
    arg_verb_infinitive,
    arg_verb_yo,
    arg_verb_tu,
    arg_verb_el_ella_usted,
    arg_verb_nosotros,
    arg_verb_vosotros,
    arg_verb_ellos_ellas_ustedes
  )
  ON CONFLICT (verb_infinitive) DO NOTHING;
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_noun_example
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_noun_example(
  arg_noun_key INTEGER,
  arg_example_data JSONB
) RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.ckn_noun_examples (noun_key, example_data)
  VALUES (arg_noun_key, arg_example_data);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_noun_examples
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_noun_examples(
  arg_noun_key INTEGER
)
RETURNS TABLE (
  noun_key INTEGER,
  noun_form TEXT,
  number TEXT,
  example_data JSONB
)
LANGUAGE sql
AS $$
SELECT
  nf.noun_key,
  nf.form,
  nf.number,
  e.example_data
FROM public.ckn_noun_forms nf
JOIN public.ckn_noun_examples e ON nf.noun_key = e.noun_key
WHERE nf.noun_key = arg_noun_key;
$$;

-- ************************************************************************
-- FUNCTION: ckn_insert_verb_example
-- ************************************************************************

CREATE FUNCTION public.ckn_insert_verb_example(
  arg_verb_key INTEGER,
  arg_example_data JSONB
) RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.ckn_verb_examples (verb_key, example_data)
  VALUES (arg_verb_key, arg_example_data);
END;
$$;

-- ************************************************************************
-- FUNCTION: ckn_lookup_verb_examples
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_verb_examples(
  arg_verb_key INTEGER
)
RETURNS TABLE (
  verb_key INTEGER,
  base TEXT,
  person TEXT,
  form TEXT,
  example_data JSONB
)
LANGUAGE sql
AS $$
SELECT
  vf.verb_key,
  vf.base,
  vf.person,
  vf.form,
  e.example_data
FROM public.ckn_verb_forms vf
JOIN public.ckn_verb_examples e ON vf.verb_key = e.verb_key
WHERE vf.verb_key = arg_verb_key;
$$;


-- ************************************************************************
-- FUNCTION EXECUTION PRIVILEGES
-- ************************************************************************

GRANT EXECUTE ON FUNCTION public.ckn_lookup_tts_cache TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_tts_cache TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_verb TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_noun TO authenticated;

GRANT EXECUTE ON FUNCTION public.ckn_lookup_verb_examples TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_verb_example TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_lookup_noun_examples TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_noun TO authenticated;

