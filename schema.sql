-- ************************************************************************
-- DROP TABLES
-- ************************************************************************

DROP TABLE IF EXISTS public.ckn_tts_cache;


-- ************************************************************************
-- CREATE TABLES
-- ************************************************************************

CREATE TABLE public.ckn_tts_cache (
  tts_cache_key SERIAL PRIMARY KEY,
  tts_cache_signature TEXT UNIQUE NOT NULL,                           -- SHA256 or similar
  tts_cache_text TEXT NOT NULL,                                       -- Original normalized input
  tts_cache_voice TEXT NOT NULL,                                      -- Which Google voice used
  tts_cache_language TEXT NOT NULL DEFAULT 'es-US',                   -- Language code
  tts_cache_usage_count INTEGER NOT NULL DEFAULT 1,                   -- How many times reused
  tts_cache_last_used TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  tts_cache_created TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.ckn_tts_cache IS 'CKN: Caches results from Google TTS service to avoid repeat synthesis.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_signature IS 'SHA256 signature of normalized TTS input.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_text IS 'Original input text sent to TTS.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_voice IS 'TTS voice name used for synthesis.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_language IS 'Language code like es-US.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_usage_count IS 'How many times this entry was accessed.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_last_used IS 'Last time this cache entry was served.';
COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_created IS 'Time this cache entry was created.';

-- ************************************************************************
-- RLS POLICIES
-- ************************************************************************

ALTER TABLE public.ckn_tts_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Supabase Admin can manage ckn_tts_cache" ON public.ckn_tts_cache
  FOR ALL USING (current_user = 'supabase_auth_admin')
  WITH CHECK (current_user = 'supabase_auth_admin');

CREATE POLICY "Authenticated users can view ckn_tts_cache" ON public.ckn_tts_cache
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ************************************************************************
-- INDEXES (Optional)
-- ************************************************************************

CREATE INDEX idx_ckn_tts_cache_signature ON public.ckn_tts_cache(tts_cache_signature);
CREATE INDEX idx_ckn_tts_cache_last_used ON public.ckn_tts_cache(tts_cache_last_used);

-- ************************************************************************
-- FUNCTION: public.ckn_lookup_tts_cache
-- ************************************************************************

CREATE FUNCTION public.ckn_lookup_tts_cache(
    arg_tts_cache_signature TEXT
)
RETURNS TABLE (
    tts_cache_key INTEGER,
    tts_cache_signature TEXT,
    tts_cache_text TEXT,
    tts_cache_voice TEXT,
    tts_cache_language TEXT,
    tts_cache_usage_count INTEGER,
    tts_cache_last_used TIMESTAMP WITH TIME ZONE,
    tts_cache_created TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  RETURN QUERY
  UPDATE public.ckn_tts_cache
  SET 
    tts_cache_usage_count = tts_cache_usage_count + 1,
    tts_cache_last_used = timezone('utc', now())
  WHERE tts_cache_signature = arg_tts_cache_signature
  RETURNING 
    tts_cache_key,
    tts_cache_signature,
    tts_cache_text,
    tts_cache_voice,
    tts_cache_language,
    tts_cache_usage_count,
    tts_cache_last_used,
    tts_cache_created;
END;
$$;

-- ************************************************************************
-- FUNCTION: public.ckn_insert_tts_cache
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
    tts_cache_last_used TIMESTAMP WITH TIME ZONE,
    tts_cache_created TIMESTAMP WITH TIME ZONE
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
-- GRANT FUNCTION EXECUTION PRIVILEGES
-- ************************************************************************

GRANT EXECUTE ON FUNCTION public.ckn_lookup_tts_cache(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_tts_cache(TEXT, TEXT, TEXT, TEXT) TO authenticated;
