-- SET client_min_messages TO WARNING;
-- SET log_statement TO 'none';

-- SET client_min_messages TO DEBUG;
-- SET log_statement TO 'all';

-- ************************************************************************
-- ************************************************************************

    -- EXTENSIONS

-- ************************************************************************
-- ************************************************************************

-- CREATE EXTENSION IF NOT EXISTS pgcrypto;



-- ************************************************************************
-- ************************************************************************

    -- DROP, where these functions depend on tables.

-- ************************************************************************
-- ************************************************************************

DROP FUNCTION IF EXISTS public.ckn_add_group;
DROP FUNCTION IF EXISTS public.ckn_add_group_member_by_mobile_key;
DROP FUNCTION IF EXISTS public.ckn_add_group_member_by_cooked_email;
-- DROP FUNCTION IF EXISTS public.ckn_add_group_member;
DROP FUNCTION IF EXISTS public.ckn_delete_group;
DROP FUNCTION IF EXISTS public.ckn_delete_group_member;
...



DROP TRIGGER IF EXISTS on_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_user_updated ON auth.users;
...


-- ************************************************************************
-- ************************************************************************

    -- DROP TABLE.

-- ************************************************************************
-- ************************************************************************

DROP TABLE IF EXISTS public.ckn_member_cooked_email;
DROP TABLE IF EXISTS public.ckn_member_nickname;
DROP TABLE IF EXISTS public.ckn_member_nickname_staging;
DROP TABLE IF EXISTS public.ckn_group_message;
...


-- ************************************************************************
-- ************************************************************************

    -- DROP, where these functions are dependent to some tables.

-- ************************************************************************
-- ************************************************************************

DROP FUNCTION IF EXISTS public.ckn_member_mobile_key_check;
DROP FUNCTION IF EXISTS public.ckn_member_key_check;
...

-- ************************************************************************
-- ************************************************************************

    -- DROP TYPES, where these types are used throughout.

-- ************************************************************************
-- ************************************************************************

DROP TYPE IF EXISTS public.group_member_status_t;
DROP TYPE IF EXISTS public.member_status_t;
DROP TYPE IF EXISTS public.group_status_t;
...

DROP DOMAIN IF EXISTS public.email_t;
DROP DOMAIN IF EXISTS public.password_t;
DROP DOMAIN IF EXISTS public.token_t;
...

DROP SCHEMA IF EXISTS private;
...

DROP ROLE IF EXISTS test_role_nologin;
DROP ROLE IF EXISTS test_role;
...

-- ************************************************************************
-- ************************************************************************

    -- CREATE SCHEMA. 
    -- I added a 'private' schema as a way to prevent 
    -- public access to some of my functions.
    -- I added 'extensions' schema in preparation for testing.

-- ************************************************************************
-- ************************************************************************

CREATE SCHEMA private;
...


-- ************************************************************************
-- ************************************************************************

    -- CREATE ROLE. Let's try one role.

-- ************************************************************************
-- ************************************************************************

CREATE ROLE test_role_nologin NOLOGIN;
CREATE ROLE test_role;
...

-- ************************************************************************
-- ************************************************************************

    -- CREATE DOMAINS. These types are based on primitive types.

-- ************************************************************************
-- ************************************************************************

CREATE DOMAIN public.email_t AS VARCHAR;
CREATE DOMAIN public.password_t AS TEXT;
CREATE DOMAIN public.token_t AS TEXT;
CREATE DOMAIN public.refresh_token_t AS TEXT;
...



-- ************************************************************************
-- ************************************************************************

    -- CREATE TYPES. These types are complex.

-- ************************************************************************
-- ************************************************************************

CREATE TYPE public.provider_t AS ENUM (
    'email',
    'apple'
);

CREATE TYPE public.group_status_t AS ENUM (
    'up',
    'down'
);

CREATE TYPE public.group_member_status_t AS ENUM (
    'owner',
    'invitee',
    'invitee-pending',
    'member'
);

...


-- ************************************************************************
-- ************************************************************************

    -- CREATE TABLE. Let's do our tables.

-- ************************************************************************
-- ************************************************************************


CREATE TABLE public.ckn_member (
  member_key SERIAL PRIMARY KEY,
  member_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, 
  member_status public.member_status_t NOT NULL,
  member_activity public.activity_t NOT NULL,
  member_mobile_key public.mobile_key_t NOT NULL,
  member_provider public.provider_t NOT NULL,
  message_update_timestamp TIMESTAMP NOT NULL,
  member_update_timestamp public.update_timestamp_t NOT NULL,
  member_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_member ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supabase Admin can manage members" ON public.ckn_member FOR
    ALL USING (current_user = 'supabase_auth_admin')
    WITH CHECK (current_user = 'supabase_auth_admin');
CREATE POLICY "Supabase Admin can create public.ckn_member." ON public.ckn_member FOR
    INSERT WITH CHECK (current_user = 'supabase_auth_admin');
CREATE POLICY "Individuals can update their own public.ckn_member." ON public.ckn_member FOR
    UPDATE USING (auth.uid() = member_uuid)
    WITH CHECK (auth.uid() = member_uuid);
CREATE POLICY "Individuals can delete their own public.ckn_member." ON public.ckn_member FOR
    DELETE USING (auth.uid() = member_uuid);
-- CREATE POLICY "Public profiles are viewable only by authenticated users" ON public.ckn_member FOR
--     SELECT TO AUTHENTICATED USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated users or Supabase Admin can view their profile" ON public.ckn_member FOR
    SELECT TO AUTHENTICATED USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');

COMMENT ON TABLE public.ckn_member IS 'CKN: Describes details specific to a member.';

CREATE TABLE public.ckn_email_verification (
  email_verification_verification_key SERIAL PRIMARY KEY,
  member_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE, -- Universally unique constraint
  email public.email_t NOT NULL,
  token public.token_t NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  email_verification_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

...

-- ************************************************************************
-- ************************************************************************

    -- CREATE. Let's do our primary functions.

-- ************************************************************************
-- ************************************************************************

...

CREATE FUNCTION public.ckn_handle_user_update()
RETURNS TRIGGER
SECURITY INVOKER
LANGUAGE plpgsql
AS $$
DECLARE
    local_mobile_key public.mobile_key_t;
    local_group_nickname public.name_t;
    local_group_cooked_name public.name_t;
    local_provider public.provider_t;
    member_exists BOOLEAN; -- New variable to track if the member exists
BEGIN
    RAISE LOG 'Trigger public.ckn_handle_user_update is executed by user: %', current_user;
    RAISE LOG 'auth.uid(): %, member_uuid: %', auth.uid(), NEW.id;
    RAISE LOG 'provider: %', NEW.raw_app_meta_data->>'provider';

    -- Check if this is a new user with the `first_login` flag set to 'initializing'
    IF NEW.raw_user_meta_data->>'first_login' = 'initializing' THEN

        local_mobile_key := NEW.raw_user_meta_data->>'mobile_key';
        local_provider := NEW.raw_app_meta_data->>'provider';

        -- RAISE LOG 'Trigger public.ckn_handle_user_update is ENGAGED';
        -- RAISE LOG 'Trigger public.ckn_handle_user_update is executed by user: %', current_user;
        -- RAISE LOG 'Initializing first login with mobile_key = %', local_mobile_key;

        -- Check if a member with the given `local_mobile_key` already exists
        SELECT EXISTS (
            SELECT 1 
            FROM public.ckn_member 
            WHERE member_mobile_key = local_mobile_key
        ) INTO member_exists;

        -- Insert a new row only if no matching member exists
        IF NOT member_exists THEN
            -- RAISE LOG 'Inserting new member with mobile_key: %', local_mobile_key;

            INSERT INTO public.ckn_member (
                member_uuid,
                member_status,
                member_activity,
                member_mobile_key,
                member_provider,
                message_update_timestamp,
                member_update_timestamp
                )
            VALUES (
                NEW.id,
                'active', -- was 'pending',
                'okay', 
                local_mobile_key,
                local_provider,
                CURRENT_TIMESTAMP,
                'NEWTIMESTAMP'
                );

            -- RAISE LOG 'ABOVE public.ckn_update_member_nickname';
            PERFORM public.ckn_update_member_nickname('NEWNICKNAME', local_mobile_key);
            -- RAISE LOG 'BELOW public.ckn_update_member_nickname';

            -- Add the user to predefined groups
            local_group_nickname := 'Family';
            local_group_cooked_name := public.ckn_generate_sha256(local_group_nickname || '-' || local_mobile_key);
            PERFORM public.ckn_add_group(local_group_cooked_name, local_group_nickname, local_mobile_key);

            local_group_nickname := 'Friends';
            local_group_cooked_name := public.ckn_generate_sha256(local_group_nickname || '-' || local_mobile_key);
            PERFORM public.ckn_add_group(local_group_cooked_name, local_group_nickname, local_mobile_key);
        ELSE
            -- RAISE LOG 'Member with mobile_key % already exists, skipping insertion.', local_mobile_key;
        END IF;

    ELSE 
        -- RAISE LOG 'Trigger public.ckn_handle_user_update is NOT engaged';
    END IF;

    RETURN NEW;
END;
$$;

CREATE FUNCTION public.ckn_get_status_a(
    arg_mobile_key public.mobile_key_t
  )
  RETURNS TABLE(
      group_cooked_name public.name_t, 
      group_mobile_key public.mobile_key_t,
      group_nickname public.name_t,
      group_status public.group_status_t,
      group_member_status public.group_member_status_t,
      member_mobile_key public.mobile_key_t,
      member_cooked_email public.email_t,
      member_status public.member_status_t, 
      member_activity public.activity_t,
      member_provider public.provider_t,
      member_nickname public.name_t,
      message_update_timestamp TIMESTAMP,
      member_update_timestamp public.update_timestamp_t,
      member_timestamp TIMESTAMP,
      group_member_source TEXT
  )
  SECURITY INVOKER 
  LANGUAGE SQL AS $$
    SELECT 
      g.group_cooked_name,
      g.group_mobile_key, 
      g.group_nickname,
      g.group_status,
      gm.group_member_status,
      m.member_mobile_key,
      'pseudo email' as member_cooked_email,
      m.member_status, 
      m.member_activity,
      m.member_provider,
      mn.nickname,
      m.message_update_timestamp,
      m.member_update_timestamp,
      m.member_timestamp,
      gm.group_member_source
    FROM 
      public.ckn_group g
    JOIN public.ckn_group_member gm ON gm.group_key = g.group_key
    JOIN public.ckn_member m ON m.member_key = gm.member_key
    -- JOIN public.ckn_member_cooked_email mce ON mce.member_key = gm.member_key
    JOIN public.ckn_member_nickname mn ON mn.member_key = gm.member_key
    WHERE 
      g.group_cooked_name IN (
        SELECT g.group_cooked_name 
        FROM public.ckn_group g
        JOIN public.ckn_group_member gm ON g.group_key = gm.group_key
        JOIN public.ckn_member m ON m.member_key = gm.member_key
        WHERE m.member_mobile_key = arg_mobile_key)
$$;

CREATE FUNCTION public.ckn_get_status_b(
    arg_mobile_key public.mobile_key_t
  )
  RETURNS TABLE(
      group_cooked_name public.name_t, 
      group_mobile_key public.mobile_key_t,
      group_nickname public.name_t,
      group_status public.group_status_t,
      group_member_status public.group_member_status_t,
      member_mobile_key public.mobile_key_t,
      member_cooked_email public.email_t,
      member_status public.member_status_t, 
      member_activity public.activity_t,
      member_provider public.provider_t,
      member_nickname public.name_t,
      message_update_timestamp TIMESTAMP,
      member_update_timestamp public.update_timestamp_t,
      member_timestamp TIMESTAMP,
      group_member_source TEXT
  )
  SECURITY INVOKER 
  LANGUAGE SQL AS $$
    SELECT 
      g.group_cooked_name,
      g.group_mobile_key, 
      g.group_nickname,
      g.group_status,
      gms.group_member_status,
      m.member_mobile_key,
      'pseudo email' as member_cooked_email,
      m.member_status, 
      m.member_activity,
      m.member_provider,
      mns.nickname,
      m.message_update_timestamp,
      m.member_update_timestamp,
      m.member_timestamp,
      gms.group_member_source
    FROM 
      public.ckn_group g
    JOIN public.ckn_group_member_staging gms ON gms.group_key = g.group_key
    JOIN public.ckn_member_staging ms ON ms.member_key = gms.member_key
    JOIN public.ckn_member m ON ms.member_mobile_key = m.member_mobile_key
    -- JOIN public.ckn_member_cooked_email mce ON mce.member_key = gms.member_key
    JOIN public.ckn_member_nickname_staging mns ON mns.member_key = gms.member_key
    WHERE 
      g.group_cooked_name IN (
        SELECT g.group_cooked_name 
        FROM public.ckn_group g
        JOIN public.ckn_group_member_staging gms ON g.group_key = gms.group_key
        JOIN public.ckn_member_staging ms ON ms.member_key = gms.member_key
        WHERE ms.member_mobile_key = arg_mobile_key);
$$;

...

CREATE FUNCTION public.ckn_add_group(
    arg_group_cooked_name public.name_t, 
    arg_group_nickname public.name_t, 
    arg_mobile_key public.mobile_key_t
) 
RETURNS TABLE(
    group_cooked_name public.name_t, 
    group_mobile_key public.mobile_key_t, 
    group_nickname public.name_t,
    group_status public.group_status_t,
    group_member_status public.group_member_status_t,
    member_mobile_key public.mobile_key_t,
    member_cooked_email public.email_t, 
    member_status public.member_status_t, 
    member_activity public.activity_t,
    member_provider public.provider_t,
    member_nickname public.name_t,
    message_update_timestamp TIMESTAMP,
    member_update_timestamp public.update_timestamp_t,
    member_timestamp TIMESTAMP,
    group_member_source TEXT
)
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
DECLARE
    group_exists BOOLEAN;
BEGIN
    -- Check if the group already exists
    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group g
        WHERE g.group_cooked_name = arg_group_cooked_name
    ) INTO group_exists;

    -- If the group exists, return the expected table without attempting to add a new group
    IF group_exists THEN

        RAISE LOG 'ckn_add_group: Looks like arg_group_nickname = %, arg_group_cooked_name = % already exists. Exit stage right.', arg_group_nickname, arg_group_cooked_name;

        RETURN QUERY
        SELECT * FROM public.ckn_get_status(arg_mobile_key);
        RETURN;
    END IF;

    RAISE LOG 'ckn_add_group: arg_group_nickname = %, arg_group_cooked_name = % does not exist. Add the group, Captain.', arg_group_nickname, arg_group_cooked_name;

    INSERT INTO public.ckn_group (
        group_uuid, 
        group_cooked_name,
        group_nickname,
        group_mobile_key,
        group_status
    ) 
    SELECT
        m.member_uuid,
        arg_group_cooked_name,
        arg_group_nickname,
        arg_mobile_key,
        'up' 
    FROM public.ckn_member m
    WHERE m.member_mobile_key = arg_mobile_key;

    -- Call the function and return its results
    BEGIN
        -- I guess we didn't have to make this a BEGIN|END block,
        -- Nonetheless, I decided to retain the block, which was
        -- motivated by the call to RAISE (commented out) below.
        
        -- Add a marker with the function arguments
        -- RAISE LOG 'Direct Call: Calling ckn_add_group_member_by_mobile_key with values: arg_group_cooked_name = %, arg_mobile_key = %, arg_mobile_key = %', arg_group_cooked_name, arg_mobile_key, arg_mobile_key;
        
        -- Call the function and capture the results. Note, that
        -- we are using public.ckn_add_group_member_by_mobile_key
        -- because this is a special circumstance where we are
        -- adding the first-time owner of the group to the relation
        -- table. This add is now when we create the group
        -- (see above). Normally, we don't know any mobile_key.
        -- However, this time we are acting on behalf of the
        -- owner, whose mobile_key we know.
        RETURN QUERY
        SELECT * FROM public.ckn_add_group_member_by_mobile_key(
            arg_group_cooked_name,
            arg_mobile_key, -- Owner's mobile_key
            'will use known nickname',
            arg_mobile_key);
        
        -- Add a marker to confirm the function was called successfully
        -- RAISE LOG 'Successfully invoked ckn_add_group_member_by_mobile_key';
    END;
    -- RETURN QUERY
    -- SELECT * FROM public.ckn_add_group_member_by_mobile_key(
    --     arg_group_cooked_name,
    --     arg_mobile_key, -- Just happens to be the owner's mobile_key
    --     arg_mobile_key);
END;
$$;

...

-- ************************************************************************
-- ************************************************************************

    -- Lock down our functions.

-- ************************************************************************
-- ************************************************************************

-- Secure access to all functions
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Choose which roles can execute functions
GRANT EXECUTE ON FUNCTION public.ckn_add_group TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_add_group_member_by_mobile_key TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_add_group_member_by_cooked_email TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_delete_group TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_delete_group_member TO authenticated;
...

-- ************************************************************************
-- ************************************************************************

    -- Insert to our remaining tables.

-- ************************************************************************
-- ************************************************************************

