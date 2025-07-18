--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: ckn_insert_tts_cache(text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text DEFAULT 'es-US'::text) RETURNS TABLE(tts_cache_key integer, tts_cache_signature text, tts_cache_text text, tts_cache_voice text, tts_cache_language text, tts_cache_usage_count integer, tts_cache_last_used timestamp with time zone, tts_cache_created timestamp with time zone)
    LANGUAGE plpgsql
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


ALTER FUNCTION public.ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text) OWNER TO postgres;

--
-- Name: ckn_lookup_tts_cache(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature text) RETURNS TABLE(tts_cache_key integer, tts_cache_signature text, tts_cache_text text, tts_cache_voice text, tts_cache_language text, tts_cache_usage_count integer, tts_cache_last_used timestamp with time zone, tts_cache_created timestamp with time zone)
    LANGUAGE plpgsql
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


ALTER FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature text) OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      PERFORM pg_notify(
          'realtime:system',
          jsonb_build_object(
              'error', SQLERRM,
              'function', 'realtime.send',
              'event', event,
              'topic', topic,
              'private', private
          )::text
      );
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connexions.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: ckn_tts_cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ckn_tts_cache (
    tts_cache_key integer NOT NULL,
    tts_cache_signature text NOT NULL,
    tts_cache_text text NOT NULL,
    tts_cache_voice text NOT NULL,
    tts_cache_language text DEFAULT 'es-US'::text NOT NULL,
    tts_cache_usage_count integer DEFAULT 1 NOT NULL,
    tts_cache_last_used timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    tts_cache_created timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.ckn_tts_cache OWNER TO postgres;

--
-- Name: TABLE ckn_tts_cache; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.ckn_tts_cache IS 'CKN: Caches results from Google TTS service to avoid repeat synthesis.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_signature; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_signature IS 'SHA256 signature of normalized TTS input.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_text; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_text IS 'Original input text sent to TTS.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_voice; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_voice IS 'TTS voice name used for synthesis.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_language; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_language IS 'Language code like es-US.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_usage_count; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_usage_count IS 'How many times this entry was accessed.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_last_used; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_last_used IS 'Last time this cache entry was served.';


--
-- Name: COLUMN ckn_tts_cache.tts_cache_created; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.ckn_tts_cache.tts_cache_created IS 'Time this cache entry was created.';


--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ckn_tts_cache_tts_cache_key_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ckn_tts_cache_tts_cache_key_seq OWNER TO postgres;

--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ckn_tts_cache_tts_cache_key_seq OWNED BY public.ckn_tts_cache.tts_cache_key;


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: ckn_tts_cache tts_cache_key; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ckn_tts_cache ALTER COLUMN tts_cache_key SET DEFAULT nextval('public.ckn_tts_cache_tts_cache_key_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: ckn_tts_cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) FROM stdin;
69	b23bf3afd09d43e05343d23b2424af1302268d1994d3a35c57e99ae2d4c13990	pasan	es-US-Wavenet-B	es-US	2	2025-06-09 13:40:10.127727+00	2025-06-09 13:40:10.127727+00
63	c4c687aab19ea06c6fd0531a8063b391b027d25885a97838dba645fb87501569	tiene su identificación y boleto listos?	es-US-Wavenet-B	es-US	2	2025-06-09 13:39:08.405229+00	2025-06-09 13:39:08.405229+00
65	4a9952e355e6085e3898490e0306fb01d1db9ee50997efae07960cf4a1b8b331	sí, aquí tiene mi pasaporte y la confirmación de vuelo.	es-US-Wavenet-B	es-US	2	2025-06-09 13:39:14.021028+00	2025-06-09 13:39:14.021028+00
67	e1931aa37771ea3c7495def507ebd43ce418c6ae7ecf714be17136fbff39531b	perfecto, por favor coloque su equipaje de mano en el escáner.	es-US-Wavenet-A	es-US	2	2025-06-09 13:39:21.127311+00	2025-06-09 13:39:21.127311+00
59	eaba7f65436463eb5f756ce51b3c0f429957249caf18b5dfbbb27ab3f2aaec8b	en qué puedo ayudarte?	es-US-Wavenet-B	es-US	4	2025-06-09 13:39:47.108731+00	2025-06-09 13:32:21.950499+00
61	a8dabcdb56513335d8835c2ed1d21e07bba0d8ca31cdbf264d670cd1030af280	hola, soy el gerente del hotel.	es-US-Wavenet-B	es-US	4	2025-06-09 13:39:47.665896+00	2025-06-09 13:32:23.797419+00
43	2fd1ae8c2f064fc9519bf809bd1641727eb4fd8366bbaf8d0646252ef3bb2bb5	sí, por favor.	es-US-Wavenet-B	es-US	2	2025-06-09 12:37:15.187905+00	2025-06-09 12:37:15.187905+00
1	a80897215bfeca30c04e7796c593f66024daf5a1d18107671fd6f759cfa8ddd8	hola!	es-US-Wavenet-B	es-US	19	2025-06-09 13:48:31.809481+00	2025-06-09 12:37:03.099332+00
47	a0342209fbe1cf847dd4b6040408d35eaedc392f6d223842e97aa5cdf4357270	muchas gracias.	es-US-Wavenet-B	es-US	2	2025-06-09 12:37:16.359041+00	2025-06-09 12:37:16.359041+00
5	a03678c8ceeb351419a24b3bc1a747a3e42e7de8164e9a898ee4657c6f898a06	tienen una mesa disponible para esta noche?	es-US-Wavenet-B	es-US	17	2025-06-09 13:48:32.855697+00	2025-06-09 12:37:04.653168+00
7	ba2353695bedfac7ca1427be8187ea9faff827d0ecf94076455d050c37966cc9	sí, tenemos mesas disponibles.	es-US-Wavenet-A	es-US	16	2025-06-09 13:48:34.453215+00	2025-06-09 12:37:05.65119+00
51	55f269e63385926ccd6af5f314abcbe2fca27c97ef22c0adcbbf4246ab6793b6	de nada!	es-US-Wavenet-A	es-US	2	2025-06-09 12:37:17.228844+00	2025-06-09 12:37:17.228844+00
55	e9c9eeef35b97adbe896946d6508e02df89767dfb9b24dd22af191339e06f6eb	que disfruten su cena.	es-US-Wavenet-A	es-US	2	2025-06-09 12:37:18.012148+00	2025-06-09 12:37:18.012148+00
11	19815ba52a356d7d68cffa14046a56b12c090b52e8c16347c91570425b073ef5	para cuántas personas sería la reserva?	es-US-Wavenet-A	es-US	4	2025-06-09 12:39:29.905986+00	2025-06-09 12:37:06.518685+00
15	b90f1b8d36f732e362a198377208135351e53f6766283fa9dee00b22caaaf4b2	para dos personas, por favor.	es-US-Wavenet-B	es-US	4	2025-06-09 12:39:30.218882+00	2025-06-09 12:37:07.448905+00
19	bd18e2ab19e3ae37fe626815bd880ad06029c5790decb9882d553c614f55baec	perfecto, por aquí.	es-US-Wavenet-A	es-US	4	2025-06-09 12:39:30.533567+00	2025-06-09 12:37:08.264006+00
23	11d021a251abaf73117e14fed5d7edf0c67d29d4f3988a1d02fa83ae96cf6d26	prefieren una mesa cerca de la ventana o en el centro del restaurante?	es-US-Wavenet-A	es-US	4	2025-06-09 12:39:30.859007+00	2025-06-09 12:37:09.236835+00
27	4a7ce42d2eab9be614708dc4aef4e06a2f7549f2ccbecf465df7f929bf8ab759	gracias!	es-US-Wavenet-B	es-US	4	2025-06-09 12:39:31.233054+00	2025-06-09 12:37:09.999526+00
31	8221e1eed9f5f19595e0403bdedf6242cee8287b50ab5c26ef12000ec87fd038	por supuesto, síganme.	es-US-Wavenet-A	es-US	4	2025-06-09 12:39:31.559827+00	2025-06-09 12:37:10.852547+00
35	42e65b9979c87ce2830504ef1df9ea960668ff624e00b76bc073ee34995428b8	aquí tienen su mesa.	es-US-Wavenet-A	es-US	4	2025-06-09 12:39:31.841484+00	2025-06-09 12:37:12.606297+00
39	bcad3dea28bce8f793b9fed213641589adb7b82321a915b9ca00eec18961447d	les gustaría ver el menú?	es-US-Wavenet-A	es-US	3	2025-06-09 12:39:31.907299+00	2025-06-09 12:37:14.172436+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-06-04 10:07:30
20211116045059	2025-06-04 10:07:33
20211116050929	2025-06-04 10:07:35
20211116051442	2025-06-04 10:07:37
20211116212300	2025-06-04 10:07:40
20211116213355	2025-06-04 10:07:42
20211116213934	2025-06-04 10:07:44
20211116214523	2025-06-04 10:07:46
20211122062447	2025-06-04 10:07:49
20211124070109	2025-06-04 10:07:51
20211202204204	2025-06-04 10:07:53
20211202204605	2025-06-04 10:07:55
20211210212804	2025-06-04 10:08:01
20211228014915	2025-06-04 10:08:03
20220107221237	2025-06-04 10:08:05
20220228202821	2025-06-04 10:08:07
20220312004840	2025-06-04 10:08:09
20220603231003	2025-06-04 10:08:13
20220603232444	2025-06-04 10:08:15
20220615214548	2025-06-04 10:08:17
20220712093339	2025-06-04 10:08:19
20220908172859	2025-06-04 10:08:21
20220916233421	2025-06-04 10:08:24
20230119133233	2025-06-04 10:08:26
20230128025114	2025-06-04 10:08:28
20230128025212	2025-06-04 10:08:31
20230227211149	2025-06-04 10:08:33
20230228184745	2025-06-04 10:08:35
20230308225145	2025-06-04 10:08:37
20230328144023	2025-06-04 10:08:39
20231018144023	2025-06-04 10:08:41
20231204144023	2025-06-04 10:08:45
20231204144024	2025-06-04 10:08:47
20231204144025	2025-06-04 10:08:49
20240108234812	2025-06-04 10:08:51
20240109165339	2025-06-04 10:08:53
20240227174441	2025-06-04 10:08:57
20240311171622	2025-06-04 10:08:59
20240321100241	2025-06-04 10:09:04
20240401105812	2025-06-04 10:09:10
20240418121054	2025-06-04 10:09:13
20240523004032	2025-06-04 10:09:20
20240618124746	2025-06-04 10:09:22
20240801235015	2025-06-04 10:09:24
20240805133720	2025-06-04 10:09:26
20240827160934	2025-06-04 10:09:28
20240919163303	2025-06-04 10:09:31
20240919163305	2025-06-04 10:09:33
20241019105805	2025-06-04 10:09:35
20241030150047	2025-06-04 10:09:43
20241108114728	2025-06-04 10:09:46
20241121104152	2025-06-04 10:09:48
20241130184212	2025-06-04 10:09:51
20241220035512	2025-06-04 10:09:53
20241220123912	2025-06-04 10:09:55
20241224161212	2025-06-04 10:09:57
20250107150512	2025-06-04 10:09:59
20250110162412	2025-06-04 10:10:01
20250123174212	2025-06-04 10:10:03
20250128220012	2025-06-04 10:10:05
20250506224012	2025-06-04 10:10:07
20250523164012	2025-06-04 10:10:09
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
tts-cache	tts-cache	\N	2025-06-04 21:16:55.720637+00	2025-06-04 21:16:55.720637+00	t	f	\N	\N	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-06-04 10:07:26.431675
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-06-04 10:07:26.444389
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-06-04 10:07:26.449183
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-06-04 10:07:26.48415
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-06-04 10:07:26.5089
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-06-04 10:07:26.516409
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-06-04 10:07:26.5247
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-06-04 10:07:26.530842
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-06-04 10:07:26.537281
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-06-04 10:07:26.54399
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-06-04 10:07:26.55051
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-06-04 10:07:26.556787
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-06-04 10:07:26.566017
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-06-04 10:07:26.572619
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-06-04 10:07:26.578185
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-06-04 10:07:26.609093
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-06-04 10:07:26.61496
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-06-04 10:07:26.6212
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-06-04 10:07:26.629812
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-06-04 10:07:26.637167
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-06-04 10:07:26.647098
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-06-04 10:07:26.658176
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-06-04 10:07:26.690032
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-06-04 10:07:26.716573
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-06-04 10:07:26.726066
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-06-04 10:07:26.732211
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
be3cec54-8ca5-4bc1-9808-30c397f8767e	tts-cache	a80897215bfeca30c04e7796c593f66024daf5a1d18107671fd6f759cfa8ddd8.mp3	\N	2025-06-04 21:20:37.838709+00	2025-06-09 12:37:04.098027+00	2025-06-04 21:20:37.838709+00	{"eTag": "\\"b1152d53f9714a4097e8888cba26edd2\\"", "size": 5568, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:04.000Z", "contentLength": 5568, "httpStatusCode": 200}	7f6235f6-54be-47a4-931d-b22e0ffc95bd	\N	{}
3de46ab1-1c53-4a56-be6e-6922ddd98884	tts-cache	719a974bb007e6d804d2fe634ac05e32220db1d2f392cd1c8212b697bf15b73b.mp3	\N	2025-06-04 21:20:37.838398+00	2025-06-04 21:20:39.883+00	2025-06-04 21:20:37.838398+00	{"eTag": "\\"18788b0b7dd2ba892156c0498d60e28b\\"", "size": 9792, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:40.000Z", "contentLength": 9792, "httpStatusCode": 200}	97fda1fe-34e8-4f8e-81d2-774e98fdc35b	\N	{}
1930a329-2e8c-4e60-a168-1d9b993cb35d	tts-cache	b8f3f4eacd6d28fc7b54f22696c93b0bf40325690fbc77a0fb11e84a0752987e.mp3	\N	2025-06-04 21:20:37.875814+00	2025-06-04 21:20:40.340969+00	2025-06-04 21:20:37.875814+00	{"eTag": "\\"aca09a5d85dbda31573b410559cf7d09\\"", "size": 14208, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:41.000Z", "contentLength": 14208, "httpStatusCode": 200}	bfac7a7c-598c-4a92-b46e-ce3315c8c1c5	\N	{}
87f262f0-2ea7-4f8b-a732-14ff5b946464	tts-cache	f2ffbca8873f9aa10eda5004d29b9fe06efbf4c98b7a2d355b43965f21f5fa6f.mp3	\N	2025-06-04 21:20:38.041592+00	2025-06-04 21:20:40.708273+00	2025-06-04 21:20:38.041592+00	{"eTag": "\\"8e2ca07ed9f7dd192d219a649d6f8bb3\\"", "size": 34752, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:41.000Z", "contentLength": 34752, "httpStatusCode": 200}	a55c801d-7076-445a-aa5d-167648ddea65	\N	{}
626ab7bc-9e25-43c4-9a45-841a8500220e	tts-cache	a56c0a73b323243c31155757de1a153d544cfb4872e0986a9f5415092fb30dfe.mp3	\N	2025-06-04 21:20:37.816527+00	2025-06-04 21:20:40.505855+00	2025-06-04 21:20:37.816527+00	{"eTag": "\\"df6a0cd9f5fc42666e89c318dd293712\\"", "size": 6336, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:41.000Z", "contentLength": 6336, "httpStatusCode": 200}	b7c33df1-43e2-441f-845e-f36251cb262a	\N	{}
e6f10a59-ca3f-48b3-ba59-2f60e41c34b6	tts-cache	ffafc690e193789d83c268481fc497278753c24ad4ecefe7d74d15f2cd7f5ea7.mp3	\N	2025-06-04 21:20:38.93894+00	2025-06-04 21:20:40.771073+00	2025-06-04 21:20:38.93894+00	{"eTag": "\\"872853ea4288f440fb9a0794e317f9c4\\"", "size": 32256, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:41.000Z", "contentLength": 32256, "httpStatusCode": 200}	57b5fa36-5f10-435e-b8d5-6d94c0c51142	\N	{}
edc805c9-9200-46d9-aef2-7cc7186052a3	tts-cache	6e1ecbe0eadde0b7dc2bdddc94e82eef1f63959a6cfd33c2f8487ae65809fc32.mp3	\N	2025-06-04 21:20:38.668171+00	2025-06-04 21:20:40.817896+00	2025-06-04 21:20:38.668171+00	{"eTag": "\\"a0e81b2e971abd6cdf303a0e1145b93e\\"", "size": 11712, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:41.000Z", "contentLength": 11712, "httpStatusCode": 200}	13db29f4-c053-4ee6-83db-db81bb7d9aaa	\N	{}
80a7c382-19ab-4599-a598-ad9199ccb8d2	tts-cache	5d1e727e4be0959ff94c59c64522d5cfabe389a8ced275c61f6e80782fc4542e.mp3	\N	2025-06-04 21:20:38.843734+00	2025-06-04 21:20:41.446645+00	2025-06-04 21:20:38.843734+00	{"eTag": "\\"43b85152eda92b19e589c9aaefb98509\\"", "size": 36480, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 36480, "httpStatusCode": 200}	707c78b5-4385-41e7-80d8-1103ba50ccf8	\N	{}
ac8616b5-2f63-4cb6-9379-ad5bd9b0e0d7	tts-cache	2b967009b79789bf638a3edc0fbb434ce54f13d3ffabb0796efcd898d0183e70.mp3	\N	2025-06-04 21:20:38.967482+00	2025-06-04 21:20:41.509434+00	2025-06-04 21:20:38.967482+00	{"eTag": "\\"84e531ffac09e7d075a42ef40bfba319\\"", "size": 6144, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 6144, "httpStatusCode": 200}	30de54c9-ffbf-4977-a090-e281f26281ce	\N	{}
9feafa43-1767-4132-958a-9eadca417156	tts-cache	9e56a2ce65840bd0955f5f45046b135207e9a004dec2569994f2d7c35df2d4b7.mp3	\N	2025-06-04 21:20:39.005954+00	2025-06-04 21:20:41.52796+00	2025-06-04 21:20:39.005954+00	{"eTag": "\\"f9da7f6ae7fbd584bc5043d64f546703\\"", "size": 8448, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 8448, "httpStatusCode": 200}	f345303a-87e3-44a6-a168-0cf043aa625b	\N	{}
06e13fda-e2e2-4549-99cc-75ff0c9effda	tts-cache	85a987716b6ae1e55f21b5b1b093b06776119ee03e82b53c6f26f4bf0042ba7b.mp3	\N	2025-06-04 21:20:38.94052+00	2025-06-04 21:20:41.682388+00	2025-06-04 21:20:38.94052+00	{"eTag": "\\"64a37b9c9295f256808df44ba989d92a\\"", "size": 27648, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 27648, "httpStatusCode": 200}	8071100f-09a5-4bea-a255-8f2408f9eae3	\N	{}
0589237c-540a-4dc7-b5b6-de62c7874281	tts-cache	e71bb197b2ce5c81c3f5bc4bf5267fe1f5bab84f6fc112f2b7e3e47b2650ab6b.mp3	\N	2025-06-04 21:20:39.649903+00	2025-06-04 21:20:41.927684+00	2025-06-04 21:20:39.649903+00	{"eTag": "\\"b07d2a49042ed0d8323b86879b6fb85b\\"", "size": 9792, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 9792, "httpStatusCode": 200}	5b70135a-21b5-466f-a8a7-ea636f6185bb	\N	{}
cf4c87a7-de6d-43a3-99f2-cf8bf799a598	tts-cache	c075abbb668b8531a49336d8f130ef555363568317c20b29e01afa66956770d1.mp3	\N	2025-06-04 21:20:39.617879+00	2025-06-04 21:20:41.979923+00	2025-06-04 21:20:39.617879+00	{"eTag": "\\"f6abdebc419ee17ce1c5ff057965b56c\\"", "size": 35904, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:42.000Z", "contentLength": 35904, "httpStatusCode": 200}	e783fbc9-88e2-4395-b5f1-95b26adb199c	\N	{}
7f336258-3e7d-4a00-929f-bbbaa7c44388	tts-cache	43ca7326e03fe1697033088a6d05dc304265cd1d1ef597aacfb32d2f261ce7a7.mp3	\N	2025-06-04 21:20:40.784683+00	2025-06-04 21:20:42.217964+00	2025-06-04 21:20:40.784683+00	{"eTag": "\\"351e18f44e5c2c1e9d4f4406738807fd\\"", "size": 10944, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T21:20:43.000Z", "contentLength": 10944, "httpStatusCode": 200}	33d669de-37e0-45e7-987c-46a99966a10b	\N	{}
a72f8f85-55da-4883-ba51-db7a06b6c9e5	tts-cache	dbde924d6e7cf5911b37797a2289c011ccc69bd1c4dfd101c06bf4d10b72d57e.mp3	\N	2025-06-07 21:48:40.42091+00	2025-06-07 21:48:40.42091+00	2025-06-07 21:48:40.42091+00	{"eTag": "\\"e9f2cccd5a4e97e673299389c1a3d705\\"", "size": 7872, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-07T21:48:41.000Z", "contentLength": 7872, "httpStatusCode": 200}	e46b1afa-848b-41b0-99e9-cfee8343553a	\N	{}
1ad82363-651d-4362-9b28-fc5ba39d17de	tts-cache	a8dabcdb56513335d8835c2ed1d21e07bba0d8ca31cdbf264d670cd1030af280.mp3	\N	2025-06-09 01:55:56.899364+00	2025-06-09 13:32:23.258435+00	2025-06-09 01:55:56.899364+00	{"eTag": "\\"6035284a38e8bd2f4feb1c0846bf5927\\"", "size": 18816, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:32:24.000Z", "contentLength": 18816, "httpStatusCode": 200}	b1cc350d-5ead-47c4-9fe8-b585350271a5	\N	{}
14be9dd7-0836-4f7e-9750-4b34de35a6ef	tts-cache	a0342209fbe1cf847dd4b6040408d35eaedc392f6d223842e97aa5cdf4357270.mp3	\N	2025-06-04 23:33:02.683968+00	2025-06-09 12:37:16.519286+00	2025-06-04 23:33:02.683968+00	{"eTag": "\\"06cc82b054f2e09a5c692b23a8d38ed4\\"", "size": 10752, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:17.000Z", "contentLength": 10752, "httpStatusCode": 200}	7b9eb160-dcdc-43a9-bb96-b74c93155fb9	\N	{}
841f92fc-0f68-436f-9074-13339b0bf956	tts-cache	2f8400651a2fe250e8058548e50bdd21c8a123efe1c0dda97bfed3faf083b788.mp3	\N	2025-06-07 21:33:50.584479+00	2025-06-07 21:33:58.050635+00	2025-06-07 21:33:50.584479+00	{"eTag": "\\"6ef89b941c5173cf5fb7bd1b143e48aa\\"", "size": 10368, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-07T21:33:59.000Z", "contentLength": 10368, "httpStatusCode": 200}	00552152-5aa6-42c2-baad-ea9bb8da530b	\N	{}
fc61febd-1880-4d0c-8649-7a4cf2bf0383	tts-cache	0274465c7bf0ae76e39ecb169bfc881c1c12ed418b4e3f7578eaad7d5fa57d5d.mp3	\N	2025-06-07 21:48:20.265759+00	2025-06-07 21:48:20.265759+00	2025-06-07 21:48:20.265759+00	{"eTag": "\\"dbdbcfe84a3b550b1d092574dd75431b\\"", "size": 7872, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-07T21:48:21.000Z", "contentLength": 7872, "httpStatusCode": 200}	bd2d87dc-8c3f-45d7-a4ce-f3158d4a6f81	\N	{}
7b7387eb-5dfa-4ba4-b5ae-889d0bbabb72	tts-cache	8221e1eed9f5f19595e0403bdedf6242cee8287b50ab5c26ef12000ec87fd038.mp3	\N	2025-06-07 21:33:54.209289+00	2025-06-09 12:37:10.785673+00	2025-06-07 21:33:54.209289+00	{"eTag": "\\"c5c6a044c768a4bee9535579bd552a5f\\"", "size": 15744, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:11.000Z", "contentLength": 15744, "httpStatusCode": 200}	d85c644c-e6b5-49c9-abae-4e24c5c618ea	\N	{}
0ffce453-a9ae-4cb6-9605-7ad8de0fa483	tts-cache	55f269e63385926ccd6af5f314abcbe2fca27c97ef22c0adcbbf4246ab6793b6.mp3	\N	2025-06-04 23:33:02.582504+00	2025-06-09 12:37:17.242749+00	2025-06-04 23:33:02.582504+00	{"eTag": "\\"c46ad72bfb65b3996dcb3482fa8dcd42\\"", "size": 7104, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:18.000Z", "contentLength": 7104, "httpStatusCode": 200}	774da6be-22b6-4bfa-b2e4-8f7d0366935a	\N	{}
efeef0ab-d51f-4472-8642-b8c7cad78507	tts-cache	4a9952e355e6085e3898490e0306fb01d1db9ee50997efae07960cf4a1b8b331.mp3	\N	2025-06-09 13:39:13.818395+00	2025-06-09 13:39:13.818395+00	2025-06-09 13:39:13.818395+00	{"eTag": "\\"c908c7d776758726b81689cfd0e27aa8\\"", "size": 31296, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:39:14.000Z", "contentLength": 31296, "httpStatusCode": 200}	6f0842ac-d7f1-40fb-8570-9248b2c833d7	\N	{}
912811d5-01f1-4756-a227-3dbb294862a2	tts-cache	4526b32a054de795b91de58116534a37f292f66792867895a9a8e7df18848981.mp3	\N	2025-06-04 23:33:01.712188+00	2025-06-04 23:33:16.695539+00	2025-06-04 23:33:01.712188+00	{"eTag": "\\"0d3270d8f068101cde7c9957c86e711e\\"", "size": 24384, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 24384, "httpStatusCode": 200}	c68e8a05-28d0-480e-a28a-06f5fbf50993	\N	{}
3111e1a1-8bfc-4e67-bfe5-6f003238d9f5	tts-cache	7d5a02895c8f89f6547c5ef5bd9c6483f83ea17cd3477870b15ca34f713d714f.mp3	\N	2025-06-04 23:33:02.690127+00	2025-06-04 23:33:16.772075+00	2025-06-04 23:33:02.690127+00	{"eTag": "\\"07aa4e888f5d21d125bb56cec673227d\\"", "size": 19584, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 19584, "httpStatusCode": 200}	15d42846-a663-4830-8d0f-b40be9468ff5	\N	{}
eda21ba0-4968-47ae-a5f3-60797697c90f	tts-cache	530406055c0a6accef7996d690d11a5d738105c746f2edc7917fd546591d21a3.mp3	\N	2025-06-04 23:33:02.471571+00	2025-06-04 23:33:16.772907+00	2025-06-04 23:33:02.471571+00	{"eTag": "\\"0ef76d30ce63b8c5f6e2e894dbb5d630\\"", "size": 8256, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 8256, "httpStatusCode": 200}	c89336e4-4b71-4a60-9202-acfd4841e3bb	\N	{}
d2bcba43-31f9-44bc-9e92-b7302ca181d2	tts-cache	c4e57e3c26a357cacd958d123c5b4f2faaeda3518d25202a6f8bd3c67e628b54.mp3	\N	2025-06-04 23:33:01.767789+00	2025-06-04 23:33:16.842616+00	2025-06-04 23:33:01.767789+00	{"eTag": "\\"b2a69639df55d59ef5e146aa66cfb0a5\\"", "size": 20544, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 20544, "httpStatusCode": 200}	4090ca22-7aec-41da-b0cd-3b5796981663	\N	{}
fda97681-b73c-4929-8271-b0c97a13df8a	tts-cache	f280343b9af73824db9a9e38b6d69a3eed4d25cf54b1c2bbd5996151dd516a20.mp3	\N	2025-06-04 23:33:02.728785+00	2025-06-04 23:33:16.583145+00	2025-06-04 23:33:02.728785+00	{"eTag": "\\"fa4f60a3fbc519ba8920b0af9e6a25d6\\"", "size": 21504, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 21504, "httpStatusCode": 200}	4d8c3628-e3fa-4195-8777-1bff731e4904	\N	{}
a778c980-9db0-46eb-97c4-ad886b04394d	tts-cache	15ea3dcfe40e6c36d58da5919e5e15266490beff904563f2a02c165404093a6a.mp3	\N	2025-06-04 23:33:02.734454+00	2025-06-04 23:33:16.7534+00	2025-06-04 23:33:02.734454+00	{"eTag": "\\"39ca75661cd226096d6690b708e09129\\"", "size": 13056, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 13056, "httpStatusCode": 200}	b814a5a5-50c3-44a7-8552-b7c3381680c2	\N	{}
b16fc155-bf2a-4a4d-b3b9-620e3b65ddec	tts-cache	b23bf3afd09d43e05343d23b2424af1302268d1994d3a35c57e99ae2d4c13990.mp3	\N	2025-06-09 13:40:09.333502+00	2025-06-09 13:40:09.333502+00	2025-06-09 13:40:09.333502+00	{"eTag": "\\"b9f824792db41f1f2debee7c8c308dae\\"", "size": 6528, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:40:10.000Z", "contentLength": 6528, "httpStatusCode": 200}	b4bf9525-d375-41a6-82ac-ad4283097974	\N	{}
f792681a-68c5-4573-8470-890d957e31ef	tts-cache	ba2353695bedfac7ca1427be8187ea9faff827d0ecf94076455d050c37966cc9.mp3	\N	2025-06-07 21:33:50.596646+00	2025-06-09 12:37:05.558479+00	2025-06-07 21:33:50.596646+00	{"eTag": "\\"409aa2bcfe70c713236537e3fc80e4c6\\"", "size": 20736, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:06.000Z", "contentLength": 20736, "httpStatusCode": 200}	698170d1-911a-4efe-b0cb-51e9a94e0d24	\N	{}
bd898831-6dca-49fa-af6e-3c5a55ce86ee	tts-cache	bd18e2ab19e3ae37fe626815bd880ad06029c5790decb9882d553c614f55baec.mp3	\N	2025-06-07 21:33:54.132481+00	2025-06-09 12:37:08.215948+00	2025-06-07 21:33:54.132481+00	{"eTag": "\\"6719e36a1baa4140c25d640da997fbd2\\"", "size": 13056, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:09.000Z", "contentLength": 13056, "httpStatusCode": 200}	86aedf80-d0de-4608-89aa-4e031653ed86	\N	{}
aa606560-f00f-4895-9355-80337f6d9827	tts-cache	eaba7f65436463eb5f756ce51b3c0f429957249caf18b5dfbbb27ab3f2aaec8b.mp3	\N	2025-06-09 01:55:53.413177+00	2025-06-09 13:32:21.741393+00	2025-06-09 01:55:53.413177+00	{"eTag": "\\"c890fbf3324d22433ad3095098fcb10c\\"", "size": 12096, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:32:22.000Z", "contentLength": 12096, "httpStatusCode": 200}	90bfe884-c87d-46df-9665-4f9dcd82882d	\N	{}
0bfc63e3-ce3d-437b-9a10-12cfb8771249	tts-cache	e1931aa37771ea3c7495def507ebd43ce418c6ae7ecf714be17136fbff39531b.mp3	\N	2025-06-09 13:39:20.712445+00	2025-06-09 13:39:20.712445+00	2025-06-09 13:39:20.712445+00	{"eTag": "\\"52081285a2148cecc5e141463df5b17e\\"", "size": 37248, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:39:21.000Z", "contentLength": 37248, "httpStatusCode": 200}	ea0d04ca-98d7-47d0-8b81-5f9437c337da	\N	{}
a9f87564-9c02-48ec-93ee-60286afc32b1	tts-cache	8e123dd4a7c0bb69e5ad32331b78ac07ca69fedfba105e18f725144ae7f2ef43.mp3	\N	2025-06-04 23:33:01.595659+00	2025-06-04 23:33:16.632098+00	2025-06-04 23:33:01.595659+00	{"eTag": "\\"4c89c8b449bb9aade7e12474102c9df1\\"", "size": 11520, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 11520, "httpStatusCode": 200}	e183c787-a9b9-467c-985e-681eece19b6a	\N	{}
a74fb48a-1609-4b62-88dd-0149bdbac7e8	tts-cache	bc20462810368478105fd2e05bfadc04bc811994af520f447f5aabbda765e56f.mp3	\N	2025-06-09 02:17:46.252106+00	2025-06-09 02:17:46.410374+00	2025-06-09 02:17:46.252106+00	{"eTag": "\\"87544bc2cafd5608159d9b4ae312f1b9\\"", "size": 14400, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:47.000Z", "contentLength": 14400, "httpStatusCode": 200}	d4fec92f-4219-4012-be78-ad1fac8d75d6	\N	{}
3eb8343f-a648-47e9-a3c6-93d950ce821c	tts-cache	34f2bd9e1e7cec53d0b5ace9a80edd3f21142cad7a2e2b51a4947e2b4ac1e80a.mp3	\N	2025-06-07 21:33:50.74863+00	2025-06-07 21:33:56.504128+00	2025-06-07 21:33:50.74863+00	{"eTag": "\\"8e876fe7d7b8d17f9c0857e1490a6a2e\\"", "size": 5760, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-07T21:33:57.000Z", "contentLength": 5760, "httpStatusCode": 200}	238ea20a-40c8-4b37-96fc-97b85ff166b5	\N	{}
7caad8d7-d6dd-447b-b83d-b031af67d2f7	tts-cache	b0db4e7162b9c34caba78033117e98ee64edc272cacfb33e73c1ed89c1bc32f5.mp3	\N	2025-06-09 02:17:42.377909+00	2025-06-09 02:17:42.619231+00	2025-06-09 02:17:42.377909+00	{"eTag": "\\"0ec3b7648ea0b74fa3975fa4ed53581b\\"", "size": 22656, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:43.000Z", "contentLength": 22656, "httpStatusCode": 200}	a9d6a830-7144-41c4-8f54-7b7c310ac771	\N	{}
820fc13e-678d-4414-816a-0af8f5d8505b	tts-cache	763142153a57df0afde43eb6a9ca40b4e2d6a68264d4ac536ab7da69770c35b2.mp3	\N	2025-06-09 02:17:44.70248+00	2025-06-09 02:17:44.888733+00	2025-06-09 02:17:44.70248+00	{"eTag": "\\"f01f61359772d4076e95ad1580b36c20\\"", "size": 19968, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:45.000Z", "contentLength": 19968, "httpStatusCode": 200}	72077e1e-c354-45fb-8faf-620d69cff6ac	\N	{}
7002343e-79d6-4587-83a2-f8c2c0fdd8f3	tts-cache	9fa1a48c500e5c266eac007bed428f05d7c1d257499acd1fa5480dc74de0948c.mp3	\N	2025-06-09 02:17:43.204489+00	2025-06-09 02:17:43.33334+00	2025-06-09 02:17:43.204489+00	{"eTag": "\\"401255321bbe6c8a94a39ed9f8f65cc7\\"", "size": 18240, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:44.000Z", "contentLength": 18240, "httpStatusCode": 200}	7bc7d16f-32e1-44f1-aff0-07437c4657e8	\N	{}
a7348b47-d517-4f23-acc5-f030cf196e36	tts-cache	19815ba52a356d7d68cffa14046a56b12c090b52e8c16347c91570425b073ef5.mp3	\N	2025-06-07 21:33:50.792921+00	2025-06-09 12:37:06.527871+00	2025-06-07 21:33:50.792921+00	{"eTag": "\\"a9c54ecf116e7e13fe97d82b4def5b51\\"", "size": 22080, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:07.000Z", "contentLength": 22080, "httpStatusCode": 200}	386ccf6b-8475-4c19-9c6f-947bcfc91401	\N	{}
f747766b-ac24-4259-9dc4-958706311ef3	tts-cache	62a44756a308e2c1b0624e9c3cebfac87fd60950163dfb99ef6d141ed4ab9de0.mp3	\N	2025-06-09 02:17:43.950533+00	2025-06-09 02:17:44.113081+00	2025-06-09 02:17:43.950533+00	{"eTag": "\\"8d45416eaa94f7d2beeacb5aa42d3304\\"", "size": 23424, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:45.000Z", "contentLength": 23424, "httpStatusCode": 200}	8050de81-6a94-46f9-9193-2b8332a90102	\N	{}
d2264bd3-0f79-48e9-b4e9-4250f6b205a1	tts-cache	ec2e90cd9f6d91f3b1debc5b3d7e336ea035420f18e42f054cd94b882b7398de.mp3	\N	2025-06-09 02:17:45.589823+00	2025-06-09 02:17:45.607221+00	2025-06-09 02:17:45.589823+00	{"eTag": "\\"f1f49610dc632149e47391ec8db58b97\\"", "size": 21888, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:46.000Z", "contentLength": 21888, "httpStatusCode": 200}	07d7942b-ff63-46a3-81c4-8af109c6e5cc	\N	{}
cf12e370-e9e7-4e70-a9c7-40c8875dc494	tts-cache	49a41a30a1fa759fceeeffcdadc5c10c75415fe8989cc92184934fa3d718f64f.mp3	\N	2025-06-09 02:17:46.931092+00	2025-06-09 02:17:47.107036+00	2025-06-09 02:17:46.931092+00	{"eTag": "\\"9e64ebdac6aeead3de82d1022327553f\\"", "size": 14016, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T02:17:48.000Z", "contentLength": 14016, "httpStatusCode": 200}	d4585a1d-2fe0-4ed3-b776-160ad70a99bc	\N	{}
2a586914-c9c7-4c5a-8279-3ca8cea7f8a3	tts-cache	96494ef08c03ca3a96f93dba850008fc0bb77c1e03c46d62d218a4fad98c10e2.mp3	\N	2025-06-04 23:33:01.728621+00	2025-06-04 23:33:16.490053+00	2025-06-04 23:33:01.728621+00	{"eTag": "\\"ae9f2698a4120df9cc840890d3ade9c4\\"", "size": 21312, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 21312, "httpStatusCode": 200}	c02debba-730b-415c-a3a9-0a69dc946bd7	\N	{}
ce21ceac-500c-48cf-814b-013eb82d55f7	tts-cache	92ada18fc05488fb8b14e4263a1240632fe315e29084e4b3bfe039c48bf736ff.mp3	\N	2025-06-04 23:33:01.689283+00	2025-06-04 23:33:16.731889+00	2025-06-04 23:33:01.689283+00	{"eTag": "\\"46336aab85b9745b840df9f3b02ccdbe\\"", "size": 16704, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 16704, "httpStatusCode": 200}	5a52fea8-9570-4d07-9a6e-67e0af11e61c	\N	{}
b07a8c88-aec6-4627-a0e4-42523c59d203	tts-cache	585773ed4a35874b338be35f487f922bc49c42777a9861aded7e1dbe4569fc8d.mp3	\N	2025-06-04 23:33:01.682136+00	2025-06-04 23:33:16.726374+00	2025-06-04 23:33:01.682136+00	{"eTag": "\\"2a18eff1caefc80aea3f347f7c9ae62e\\"", "size": 12480, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-04T23:33:17.000Z", "contentLength": 12480, "httpStatusCode": 200}	3c65fe22-a1b1-4b5c-b30a-4abd9611c947	\N	{}
8e138868-718f-48d0-8213-7c1b237c9a93	tts-cache	bcad3dea28bce8f793b9fed213641589adb7b82321a915b9ca00eec18961447d.mp3	\N	2025-06-07 21:33:56.124342+00	2025-06-09 12:37:14.137275+00	2025-06-07 21:33:56.124342+00	{"eTag": "\\"e020c82002f790a9fb58c3ec4de33605\\"", "size": 15360, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:15.000Z", "contentLength": 15360, "httpStatusCode": 200}	5060d855-886c-4cca-8c10-3946df81761e	\N	{}
f36fc001-e705-4320-9d86-f1a73e32d35a	tts-cache	11d021a251abaf73117e14fed5d7edf0c67d29d4f3988a1d02fa83ae96cf6d26.mp3	\N	2025-06-07 21:33:54.189471+00	2025-06-09 12:37:09.179507+00	2025-06-07 21:33:54.189471+00	{"eTag": "\\"a781b59c029edcbc545f1989d822168c\\"", "size": 38016, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:10.000Z", "contentLength": 38016, "httpStatusCode": 200}	63619fc0-a2d1-4c53-8827-92ade99083ab	\N	{}
9c88ea58-832e-404c-ab9c-6a7e0674e842	tts-cache	2fd1ae8c2f064fc9519bf809bd1641727eb4fd8366bbaf8d0646252ef3bb2bb5.mp3	\N	2025-06-07 21:33:56.20034+00	2025-06-09 12:37:15.312219+00	2025-06-07 21:33:56.20034+00	{"eTag": "\\"561faff2e1e11226b3b01c90ecd84d3e\\"", "size": 11520, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:16.000Z", "contentLength": 11520, "httpStatusCode": 200}	f9fcb3a7-8f95-45fb-aa83-22e08e40efe5	\N	{}
80ca833b-5981-4a92-b606-422f0ccf6afa	tts-cache	c4c687aab19ea06c6fd0531a8063b391b027d25885a97838dba645fb87501569.mp3	\N	2025-06-09 13:39:07.948842+00	2025-06-09 13:39:07.948842+00	2025-06-09 13:39:07.948842+00	{"eTag": "\\"132bbb48e6dc1e9ad40fb709cc4f587e\\"", "size": 22272, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T13:39:08.000Z", "contentLength": 22272, "httpStatusCode": 200}	de223bf0-7b05-4184-b4a6-1784182c1adb	\N	{}
3e50f175-27e5-4798-832d-3adff4fc2d41	tts-cache	a03678c8ceeb351419a24b3bc1a747a3e42e7de8164e9a898ee4657c6f898a06.mp3	\N	2025-06-07 21:33:50.671656+00	2025-06-09 12:37:04.492011+00	2025-06-07 21:33:50.671656+00	{"eTag": "\\"b72fb30e359328e815fc622c7dc08014\\"", "size": 22464, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:05.000Z", "contentLength": 22464, "httpStatusCode": 200}	0053fa24-d2a9-43f4-b5db-fe494d87bbda	\N	{}
a554a1b5-d6f5-4a72-98e7-2b982dd1fcbb	tts-cache	e9c9eeef35b97adbe896946d6508e02df89767dfb9b24dd22af191339e06f6eb.mp3	\N	2025-06-07 21:33:56.398607+00	2025-06-09 12:37:17.979143+00	2025-06-07 21:33:56.398607+00	{"eTag": "\\"fc74071c0cabad01f391376df652222d\\"", "size": 13056, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:18.000Z", "contentLength": 13056, "httpStatusCode": 200}	2d799aeb-27aa-4a97-8c1f-4be308aff1dc	\N	{}
57984680-fe84-4a0f-bbf6-24ad5820756d	tts-cache	4a7ce42d2eab9be614708dc4aef4e06a2f7549f2ccbecf465df7f929bf8ab759.mp3	\N	2025-06-07 21:33:54.534587+00	2025-06-09 12:37:09.933885+00	2025-06-07 21:33:54.534587+00	{"eTag": "\\"f305175ba49baf6baae371d625ecf34d\\"", "size": 8448, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:10.000Z", "contentLength": 8448, "httpStatusCode": 200}	d4f5fc4c-3aaa-49c8-9927-0ac70fef6245	\N	{}
2d77596d-1633-480e-8c4a-28790b5be60a	tts-cache	b90f1b8d36f732e362a198377208135351e53f6766283fa9dee00b22caaaf4b2.mp3	\N	2025-06-07 21:33:54.137831+00	2025-06-09 12:37:07.395214+00	2025-06-07 21:33:54.137831+00	{"eTag": "\\"628f2e0d29efc9ab84589226dd87d542\\"", "size": 18432, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:08.000Z", "contentLength": 18432, "httpStatusCode": 200}	b00e934d-3a42-4ba1-8112-744881a12dce	\N	{}
969f78a8-105c-443e-b302-23da46b43272	tts-cache	42e65b9979c87ce2830504ef1df9ea960668ff624e00b76bc073ee34995428b8.mp3	\N	2025-06-07 21:33:54.595364+00	2025-06-09 12:37:12.418247+00	2025-06-07 21:33:54.595364+00	{"eTag": "\\"96ad4ea1bba340e4c73ee7b3858f450b\\"", "size": 12864, "mimetype": "audio/mpeg", "cacheControl": "max-age=3600", "lastModified": "2025-06-09T12:37:13.000Z", "contentLength": 12864, "httpStatusCode": 200}	7a1b7918-599b-4896-96c1-2759ebb2060f	\N	{}
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_tts_cache_tts_cache_key_seq', 70, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ckn_tts_cache ckn_tts_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ckn_tts_cache
    ADD CONSTRAINT ckn_tts_cache_pkey PRIMARY KEY (tts_cache_key);


--
-- Name: ckn_tts_cache ckn_tts_cache_tts_cache_signature_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ckn_tts_cache
    ADD CONSTRAINT ckn_tts_cache_tts_cache_signature_key UNIQUE (tts_cache_signature);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_ckn_tts_cache_last_used; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ckn_tts_cache_last_used ON public.ckn_tts_cache USING btree (tts_cache_last_used);


--
-- Name: idx_ckn_tts_cache_signature; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ckn_tts_cache_signature ON public.ckn_tts_cache USING btree (tts_cache_signature);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: ckn_tts_cache Authenticated users can view ckn_tts_cache; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can view ckn_tts_cache" ON public.ckn_tts_cache FOR SELECT TO authenticated USING ((auth.uid() IS NOT NULL));


--
-- Name: ckn_tts_cache Service role can insert ckn_tts_cache; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Service role can insert ckn_tts_cache" ON public.ckn_tts_cache FOR INSERT TO service_role WITH CHECK (true);


--
-- Name: ckn_tts_cache Service role can select ckn_tts_cache; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Service role can select ckn_tts_cache" ON public.ckn_tts_cache FOR SELECT TO service_role USING (true);


--
-- Name: ckn_tts_cache Supabase Admin can manage ckn_tts_cache; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Supabase Admin can manage ckn_tts_cache" ON public.ckn_tts_cache TO supabase_auth_admin USING (true) WITH CHECK (true);


--
-- Name: ckn_tts_cache; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.ckn_tts_cache ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text) TO anon;
GRANT ALL ON FUNCTION public.ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text) TO authenticated;
GRANT ALL ON FUNCTION public.ckn_insert_tts_cache(arg_tts_cache_signature text, arg_tts_cache_text text, arg_tts_cache_voice text, arg_tts_cache_language text) TO service_role;


--
-- Name: FUNCTION ckn_lookup_tts_cache(arg_tts_cache_signature text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature text) TO anon;
GRANT ALL ON FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature text) TO authenticated;
GRANT ALL ON FUNCTION public.ckn_lookup_tts_cache(arg_tts_cache_signature text) TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE ckn_tts_cache; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.ckn_tts_cache TO anon;
GRANT ALL ON TABLE public.ckn_tts_cache TO authenticated;
GRANT ALL ON TABLE public.ckn_tts_cache TO service_role;


--
-- Name: SEQUENCE ckn_tts_cache_tts_cache_key_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.ckn_tts_cache_tts_cache_key_seq TO anon;
GRANT ALL ON SEQUENCE public.ckn_tts_cache_tts_cache_key_seq TO authenticated;
GRANT ALL ON SEQUENCE public.ckn_tts_cache_tts_cache_key_seq TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

