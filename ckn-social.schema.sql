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
DROP FUNCTION IF EXISTS public.ckn_get_status;
DROP FUNCTION IF EXISTS public.ckn_get_status_a;
DROP FUNCTION IF EXISTS public.ckn_get_status_b;
DROP FUNCTION IF EXISTS public.ckn_get_status_c;
DROP FUNCTION IF EXISTS public.ckn_update_group_member;
DROP FUNCTION IF EXISTS public.ckn_update_member;
DROP FUNCTION IF EXISTS public.ckn_get_group_message;
DROP FUNCTION IF EXISTS public.ckn_add_group_message;
DROP FUNCTION IF EXISTS public.ckn_update_group_message_timestamp;
DROP FUNCTION IF EXISTS public.ckn_update_member_cooked_email;
DROP FUNCTION IF EXISTS public.ckn_update_member_nickname;
DROP FUNCTION IF EXISTS public.ckn_update_member_nickname_staging;
DROP FUNCTION IF EXISTS public.ckn_generate_sha256;
DROP FUNCTION IF EXISTS public.ckn_insert_email_verification;
DROP FUNCTION IF EXISTS public.ckn_get_nickname;
DROP FUNCTION IF EXISTS public.ckn_update_test_user;
DROP FUNCTION IF EXISTS private.ckn_create_user;
DROP FUNCTION IF EXISTS private.ckn_create_user_apple;
DROP FUNCTION IF EXISTS private.ckn_delete_user;
DROP FUNCTION IF EXISTS private.ckn_do_create_user;
-- DROP FUNCTION IF EXISTS private.ckn_do_create_user_apple;
DROP FUNCTION IF EXISTS private.ckn_do_delete_user;
DROP FUNCTION IF EXISTS private.ckn_do_delete_user_apple;
DROP FUNCTION IF EXISTS private.ckn_delete_user_by_mobile_key;
DROP FUNCTION IF EXISTS private.ckn_insert_test_user;
DROP FUNCTION IF EXISTS private.ckn_delete_test_user;

DROP TRIGGER IF EXISTS on_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_user_updated ON auth.users;

-- DROP FUNCTION IF EXISTS public.ckn_handle_new_user;
DROP FUNCTION IF EXISTS public.ckn_handle_user_update;

DROP FUNCTION IF EXISTS public.ckn_get_all_table_sizes;
DROP FUNCTION IF EXISTS public.ckn_get_table_sizes;
DROP FUNCTION IF EXISTS public.ckn_get_db_size;
DROP FUNCTION IF EXISTS public.ckn_get_total_users;
DROP FUNCTION IF EXISTS public.ckn_get_total_registered_users;
DROP FUNCTION IF EXISTS public.ckn_get_total_nonregistered_users;
DROP FUNCTION IF EXISTS public.ckn_get_total_groups;
DROP FUNCTION IF EXISTS public.ckn_clear_group_message;

-- ************************************************************************
-- ************************************************************************

    -- DROP TABLE.

-- ************************************************************************
-- ************************************************************************

DROP TABLE IF EXISTS public.ckn_member_cooked_email;
DROP TABLE IF EXISTS public.ckn_member_nickname;
DROP TABLE IF EXISTS public.ckn_member_nickname_staging;
DROP TABLE IF EXISTS public.ckn_group_message;
DROP TABLE IF EXISTS public.ckn_group_member;
DROP TABLE IF EXISTS public.ckn_group_member_staging;
DROP TABLE IF EXISTS public.ckn_group;
DROP TABLE IF EXISTS public.ckn_member;
DROP TABLE IF EXISTS public.ckn_member_staging;
DROP TABLE IF EXISTS public.ckn_email_verification;

DROP TABLE IF EXISTS public.ckn_test_user;

-- ************************************************************************
-- ************************************************************************

    -- DROP, where these functions are dependent to some tables.

-- ************************************************************************
-- ************************************************************************

DROP FUNCTION IF EXISTS public.ckn_member_mobile_key_check;
DROP FUNCTION IF EXISTS public.ckn_member_key_check;
DROP FUNCTION IF EXISTS public.ckn_member_staging_key_check;
DROP FUNCTION IF EXISTS public.ckn_group_member_key_check;
DROP FUNCTION IF EXISTS public.ckn_group_key_check;


-- ************************************************************************
-- ************************************************************************

    -- DROP TYPES, where these types are used throughout.

-- ************************************************************************
-- ************************************************************************

DROP TYPE IF EXISTS public.group_member_status_t;
DROP TYPE IF EXISTS public.member_status_t;
DROP TYPE IF EXISTS public.group_status_t;
DROP TYPE IF EXISTS public.provider_t;
DROP TYPE IF EXISTS public.activity_t;

DROP DOMAIN IF EXISTS public.email_t;
DROP DOMAIN IF EXISTS public.password_t;
DROP DOMAIN IF EXISTS public.token_t;
DROP DOMAIN IF EXISTS public.refresh_token_t;
DROP DOMAIN IF EXISTS public.mobile_key_t;
DROP DOMAIN IF EXISTS public.name_t;
DROP DOMAIN IF EXISTS public.update_timestamp_t;
DROP DOMAIN IF EXISTS public.group_message_text_t;
DROP DOMAIN IF EXISTS public.group_message_type_t;

DROP SCHEMA IF EXISTS private;
-- DROP SCHEMA IF EXISTS tests;
-- DROP SCHEMA IF EXISTS docheckin;

DROP ROLE IF EXISTS test_role_nologin;
DROP ROLE IF EXISTS test_role;

-- ************************************************************************
-- ************************************************************************

    -- CREATE SCHEMA. 
    -- I added a 'private' schema as a way to prevent 
    -- public access to some of my functions.
    -- I added 'extensions' schema in preparation for testing.

-- ************************************************************************
-- ************************************************************************

CREATE SCHEMA private;
-- CREATE SCHEMA tests;
-- CREATE SCHEMA docheckin;


-- ************************************************************************
-- ************************************************************************

    -- CREATE ROLE. Let's try one role.

-- ************************************************************************
-- ************************************************************************

CREATE ROLE test_role_nologin NOLOGIN;
CREATE ROLE test_role;



-- ************************************************************************
-- ************************************************************************

    -- CREATE DOMAINS. These types are based on primitive types.

-- ************************************************************************
-- ************************************************************************

CREATE DOMAIN public.email_t AS VARCHAR;
CREATE DOMAIN public.password_t AS TEXT;
CREATE DOMAIN public.token_t AS TEXT;
CREATE DOMAIN public.refresh_token_t AS TEXT;
CREATE DOMAIN public.mobile_key_t AS TEXT;
CREATE DOMAIN public.name_t AS TEXT;
CREATE DOMAIN public.update_timestamp_t AS TEXT;
CREATE DOMAIN public.group_message_text_t AS TEXT;
CREATE DOMAIN public.group_message_type_t AS TEXT;



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

CREATE TYPE public.member_status_t AS ENUM (
    'active',
    'pending'
);

CREATE TYPE public.activity_t AS ENUM (
    'banking',
    'bird watching',
    'birthday',
    'charity event',
    'coffee 2',
    'coffee',
    'disney',
    'evening out',
    'finances',
    'flight',
    'gardening',
    'graduating',
    'jury duty',
    'library',
    'marketplace',
    'museum',
    'okay',
    'on a cruise',
    'out for beers',
    'painting',
    'party',
    'photography',
    'picnic',
    'playing music',
    'podcast',
    'presenting',
    'question',
    'racing',
    'reading',
    'refresh',
    'relaxing',
    'riding a bike',
    'road trip',
    'sewing',
    'shopping',
    'surf the web',
    'taking a train',
    'walking',
    'watch snow',
    'watching tv'
    'working out',
    'write letters'
);

-- CREATE TYPE public.group_message_type_t AS ENUM (
--     'do sponsor',
--     'do lunch',
--     'do tea',
--     'do coffee',
--     'call me',
--     'send text'
-- );

-- ************************************************************************
-- ************************************************************************

    -- Jury is out on this routine. I can't find a role table (there is none)
    -- CREATE FUNCXTION early: has_admin_role()

-- ************************************************************************
-- ************************************************************************

-- From https://supabase.com/docs/guides/database/postgres/row-level-security
-- CREATE FUNCXTION private.has_test_role()
-- RETURNS BOOLEAN
-- LANGUAGE plpgsql
-- SECURITY DEFINER -- *** Will run as the creator !!! ***
-- AS $$
-- BEGIN
--   RETURN EXISTS (
--     SELECT 1 FROM pg_roles
--     WHERE auth.uid() = user_id OR role = 'test_role'
--   );
-- END;
-- $$;



-- ************************************************************************
-- ************************************************************************

    -- SPECIALTY. For row-level security checks using email.

-- ************************************************************************
-- ************************************************************************

CREATE FUNCTION public.ckn_group_key_check(arg_group_key INT)
RETURNS boolean AS $$
DECLARE
    local_group_key INT;
    local_group_uuid UUID; 
BEGIN
    SELECT g.group_key, g.group_uuid INTO local_group_key, local_group_uuid 
    FROM public.ckn_group g 
    WHERE g.group_key = arg_group_key;

    RETURN local_group_key = arg_group_key AND (local_group_uuid = auth.uid() OR current_user = 'supabase_auth_admin');
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.ckn_member_mobile_key_check(arg_member_mobile_key public.mobile_key_t)
RETURNS boolean AS $$
DECLARE
    local_member_mobile_key public.mobile_key_t;
    local_member_uuid UUID;
BEGIN
    -- Select the member's mobile key and UUID based on the authenticated user ID
    SELECT m.member_mobile_key, m.member_uuid INTO local_member_mobile_key, local_member_uuid 
    FROM public.ckn_member m 
    WHERE m.member_mobile_key = arg_member_mobile_key;

    -- Ensure that both the mobile key and UUID match the authenticated user
    RETURN local_member_mobile_key = arg_member_mobile_key AND local_member_uuid = auth.uid();
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.ckn_member_key_check(arg_member_key INT)
RETURNS boolean AS $$
DECLARE
    local_member_key INT;
    local_member_uuid UUID;
BEGIN
    -- Select the member's key and UUID based on the provided member key
    SELECT m.member_key, m.member_uuid INTO local_member_key, local_member_uuid 
    FROM public.ckn_member m 
    WHERE m.member_key = arg_member_key;

    -- Allow supabase_auth_admin to bypass the auth.uid() check
    RETURN local_member_key = arg_member_key AND (local_member_uuid = auth.uid() OR current_user = 'supabase_auth_admin');
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.ckn_member_staging_key_check(arg_member_key INT)
RETURNS boolean AS $$
DECLARE
    local_member_key INT;
    local_member_uuid UUID;
BEGIN
    -- Select the member's key and UUID based on the authenticated user ID
    SELECT ms.member_key, ms.member_uuid INTO local_member_key, local_member_uuid 
    FROM public.ckn_member_staging ms
    WHERE ms.member_key = arg_member_key;

    -- Ensure that both the member key and UUID match the authenticated user
    RETURN local_member_key = arg_member_key AND local_member_uuid = auth.uid();
END;
$$ LANGUAGE plpgsql;

-- ************************************************************************
-- ************************************************************************

    -- SPECIALTY. For row-level security checks using
    -- email and group name.

-- ************************************************************************
-- ************************************************************************

CREATE FUNCTION public.ckn_group_member_key_check(
    arg_group_key INT,
    arg_member_key INT
)
RETURNS boolean AS $$
DECLARE
    exists_in_group_member boolean;
    exists_in_group_member_staging boolean;
BEGIN
    -- Check if the member exists in ckn_group_member
    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group_member gm
        WHERE gm.member_key = arg_member_key
          AND gm.group_key = arg_group_key
    ) INTO exists_in_group_member;

    -- Check if the member exists in ckn_group_member_staging
    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group_member_staging gms
        WHERE gms.member_key = arg_member_key
          AND gms.group_key = arg_group_key
    ) INTO exists_in_group_member_staging;

    -- Return true if the member exists in either table
    RETURN exists_in_group_member
        OR exists_in_group_member_staging;
END;
$$ LANGUAGE plpgsql;



-- ************************************************************************
-- ************************************************************************

    -- SUPABASE STORAGE. RLS Policies applied to storage access

    -- I am keeping the DROP POLICY nearby because the wording
    -- must be exact, apparently. I didn't know that.

-- ************************************************************************
-- ************************************************************************

-- Enable Row Level Security for storage.objects table
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove existing policies
-- DROP POLICY IF EXISTS "Allow authenticated users to download test-switching" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow updates on test-switching" ON storage.objects;
-- DROP POLICY IF EXISTS "Block deletes on test-switching" ON storage.objects;

-- DROP POLICY IF EXISTS "select-insert-update-delete 1ddm0fn_0" ON storage.objects;
-- DROP POLICY IF EXISTS "select-insert-update-delete 1ddm0fn_1" ON storage.objects;
-- DROP POLICY IF EXISTS "select-insert-update-delete 1ddm0fn_2" ON storage.objects;
-- DROP POLICY IF EXISTS "select-insert-update-delete 1ddm0fn_3" ON storage.objects;

-- DROP POLICY IF EXISTS "select-authenticated" ON storage.objects;
-- DROP POLICY IF EXISTS "insert-authenticated" ON storage.objects;
-- DROP POLICY IF EXISTS "update-authenticated" ON storage.objects;
-- DROP POLICY IF EXISTS "delete-authenticated" ON storage.objects;

-- CREATE POLICY "select-authenticated" ON storage.objects
-- FOR SELECT TO authenticated USING (bucket_id = 'test-switching-json');

-- CREATE POLICY "insert-authenticated" ON storage.objects
-- FOR INSERT TO authenticated WITH CHECK (bucket_id = 'test-switching-json');

-- CREATE POLICY "update-authenticated" ON storage.objects
-- FOR UPDATE TO authenticated USING (bucket_id = 'test-switching-json');

-- CREATE POLICY "delete-authenticated" ON storage.objects
-- FOR DELETE TO authenticated USING (bucket_id = 'test-switching-json');

-- CREATE POLICY "select-insert-update-delete 1ddm0fn_0" ON storage.objects FOR SELECT TO public USING (((bucket_id = 'test-switching-json'::text) AND (auth.role() = 'authenticated'::text)));
-- CREATE POLICY "select-insert-update-delete 1ddm0fn_1" ON storage.objects FOR INSERT TO public WITH CHECK (((bucket_id = 'test-switching-json'::text) AND (auth.role() = 'authenticated'::text)));
-- CREATE POLICY "select-insert-update-delete 1ddm0fn_2" ON storage.objects FOR UPDATE TO public USING (((bucket_id = 'test-switching-json'::text) AND (auth.role() = 'authenticated'::text)));
-- CREATE POLICY "select-insert-update-delete 1ddm0fn_3" ON storage.objects FOR DELETE TO public USING (((bucket_id = 'test-switching-json'::text) AND (auth.role() = 'authenticated'::text)));

-- Create new policy to allow authenticated users to download the file
-- CREATE POLICY "Allow authenticated users to download test-switching" 
-- ON storage.objects 
-- FOR SELECT
-- USING (bucket_id = 'test-switching' AND auth.role() = 'authenticated');

-- Create policy to allow updates for now
-- CREATE POLICY "Allow updates on test-switching" 
-- ON storage.objects 
-- FOR UPDATE
-- USING (bucket_id = 'test-switching' AND auth.role() = 'authenticated');

-- Create policy to block any deletions from users
-- CREATE POLICY "Block deletes on test-switching"
-- ON storage.objects 
-- FOR DELETE
-- USING (false);

-- DROP POLICY IF EXISTS "Allow authenticated users to download test-switching-json" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow updates on test-switching-json" ON storage.objects;
-- DROP POLICY IF EXISTS "Block deletes on test-switching-json" ON storage.objects;

-- DROP POLICY IF EXISTS "Allow select on user-details-list.json" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow update on user-details-list.json" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow delete on user-details-list.json" ON storage.objects;

-- Create new policy to allow authenticated users to download the file
-- CREATE POLICY "Allow authenticated users to download test-switching-json" 
-- ON storage.objects 
-- FOR SELECT
-- USING (bucket_id = 'test-switching-json' AND auth.role() = 'authenticated');

-- CREATE POLICY "Allow select on user-details-list.json"
-- ON storage.objects
-- FOR SELECT
-- USING (bucket_id = 'test-switching-json' AND auth.role() = 'authenticated');

-- Create policy to allow updates for now
-- CREATE POLICY "Allow update on test-switching-json" 
-- ON storage.objects 
-- FOR UPDATE
-- USING (bucket_id = 'test-switching-json' AND auth.role() = 'authenticated');
-- CREATE POLICY "Allow update on user-details-list.json"
-- ON storage.objects
-- FOR UPDATE
-- USING (bucket_id = 'test-switching-json' AND auth.role() = 'authenticated');

-- Create policy to block any deletions from users
-- CREATE POLICY "Block delete on test-switching-json"
-- ON storage.objects 
-- FOR DELETE
-- USING (false);
-- CREATE POLICY "Allow delete on user-details-list.json"
-- ON storage.objects
-- FOR DELETE
-- USING (bucket_id = 'test-switching-json' AND auth.role() = 'authenticated');

-- ************************************************************************
-- ************************************************************************

    -- CREATE TABLE. Let's do our tables.

-- ************************************************************************
-- ************************************************************************

CREATE TABLE public.ckn_test_user (
    test_user_key SERIAL PRIMARY KEY, -- Unique identifier for each row
    test_user_email public.email_t UNIQUE NOT NULL, -- Email is unique
    test_user_password public.password_t, -- Passwords are for Email/Password Logins (non-Apple Authentication)
    test_user_provider public.provider_t, -- Passwords are for Email/Password Logins (non-Apple Authentication)
    test_user_nickname public.name_t NOT NULL, -- Nickname for the user
    test_user_refresh_token public.refresh_token_t, -- The refresh token
    test_user_mobile_key public.mobile_key_t, -- The mobile key
    test_user_meta_data JSONB DEFAULT '{}'::JSONB, -- Metadata as JSONB
    test_user_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL -- Timestamp
);
ALTER TABLE public.ckn_test_user ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_user_access" 
ON public.ckn_test_user 
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.ckn_member (
  member_key SERIAL PRIMARY KEY,
  member_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, 
  member_status public.member_status_t NOT NULL,
  member_activity public.activity_t NOT NULL,
  member_mobile_key public.mobile_key_t NOT NULL,
  member_provider public.provider_t NOT NULL,
--   member_nickname public.name_t NOT NULL,
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


ALTER TABLE public.ckn_email_verification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can insert their own verification requests" ON public.ckn_email_verification FOR
    INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Members can update their own verifications" ON public.ckn_email_verification FOR
    UPDATE USING (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Members can delete their own verifications" ON public.ckn_email_verification FOR
    DELETE USING (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Members can view their own verifications" ON public.ckn_email_verification FOR
    SELECT USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');

CREATE POLICY "Admin can view all verifications"
ON public.ckn_email_verification
FOR SELECT
USING (current_user = 'supabase_auth_admin');


COMMENT ON TABLE public.ckn_email_verification IS 'CKN: Stores email verification tokens for member email validation.';


CREATE TABLE public.ckn_member_staging (
  member_key SERIAL PRIMARY KEY,
  member_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, 
  member_status public.member_status_t NOT NULL,
  member_activity public.activity_t NOT NULL,
  member_mobile_key public.mobile_key_t NOT NULL,
  member_provider public.provider_t NOT NULL,
  member_owner_mobile_key public.mobile_key_t NOT NULL,
  message_update_timestamp TIMESTAMP NOT NULL,
  member_update_timestamp public.update_timestamp_t NOT NULL,
  member_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_member_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supabase Admin can create member staging records" ON public.ckn_member_staging FOR
    INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Supabase Admin can update member staging records" ON public.ckn_member_staging FOR
    UPDATE USING (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Supabase Admin can delete member staging records" ON public.ckn_member_staging FOR
    DELETE USING (current_user = 'supabase_auth_admin' OR auth.uid() = member_uuid);
CREATE POLICY "Supabase Admin can view all member staging records" ON public.ckn_member_staging FOR
    SELECT USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');


CREATE TABLE public.ckn_group (
  group_key SERIAL PRIMARY KEY,
  group_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  group_cooked_name public.name_t NOT NULL UNIQUE,
  group_nickname public.name_t NOT NULL,
  group_mobile_key public.mobile_key_t NOT NULL,
  group_status public.group_status_t NOT NULL,
  group_timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.ckn_group ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supabase Admin can create groups" ON public.ckn_group FOR
    INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR auth.uid() = group_uuid);
CREATE POLICY "Supabase Admin can update groups" ON public.ckn_group FOR
    UPDATE USING (current_user = 'supabase_auth_admin' OR auth.uid() = group_uuid);
CREATE POLICY "Supabase Admin can delete groups" ON public.ckn_group FOR
    DELETE USING (current_user = 'supabase_auth_admin' OR auth.uid() = group_uuid);
CREATE POLICY "Supabase Admin can view groups" ON public.ckn_group FOR
    SELECT USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');

-- ********************************************************************************
-- CREATE TABLE public.ckn_group_member
-- ********************************************************************************

CREATE TABLE public.ckn_group_member (
  group_member_key SERIAL PRIMARY KEY,
  group_key INT REFERENCES public.ckn_group(group_key) ON DELETE CASCADE NOT NULL,
  member_key INT REFERENCES public.ckn_member(member_key) ON DELETE CASCADE NOT NULL,

-- These were for debugging purposes
--   group_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
--   member_uuid UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, 

  group_member_status public.group_member_status_t,
  group_member_source TEXT NOT NULL,
  group_member_timestamp timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_group_member ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supabase Admin can create group members" ON public.ckn_group_member FOR

    -- Only the group owner can add members to this relation.
    
    INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR public.ckn_group_key_check(group_key));
CREATE POLICY "Supabase Admin can update group members" ON public.ckn_group_member FOR

    -- A Member themselves can update their own group_member_status

    UPDATE USING (current_user = 'supabase_auth_admin' OR public.ckn_group_member_key_check(group_key, member_key));
CREATE POLICY "Supabase Admin can delete group members" ON public.ckn_group_member FOR

    -- A Member themselves can remove themselves from this relation
    
    DELETE USING (current_user = 'supabase_auth_admin' OR public.ckn_group_member_key_check(group_key, member_key));
CREATE POLICY "Supabase Admin can view group members" ON public.ckn_group_member FOR
    SELECT USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');

COMMENT ON TABLE public.ckn_group_member IS 'CKN: Describes relation between a member and a group.';

-- ********************************************************************************
-- ********************************************************************************

CREATE TABLE public.ckn_member_cooked_email (
  member_cooked_email_key SERIAL PRIMARY KEY,
  member_key INT REFERENCES public.ckn_member(member_key) ON DELETE CASCADE NOT NULL,
  cooked_email public.email_t,
  member_cooked_email_timestamp timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_member_cooked_email ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supabase Admin can create cooked email records" ON public.ckn_member_cooked_email FOR
    INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
CREATE POLICY "Supabase Admin can update cooked email records" ON public.ckn_member_cooked_email FOR
    UPDATE USING (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
CREATE POLICY "Supabase Admin can delete cooked email records" ON public.ckn_member_cooked_email FOR
    DELETE USING (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
CREATE POLICY "Supabase Admin can view all cooked email records" ON public.ckn_member_cooked_email FOR
    SELECT USING (auth.uid() IS NOT NULL OR current_user = 'supabase_auth_admin');

COMMENT ON TABLE public.ckn_member_cooked_email IS 'CKN: Describes relation between a member and its cooked email.';

CREATE TABLE public.ckn_member_nickname (
  member_nickname_key SERIAL PRIMARY KEY,
  member_key INT REFERENCES public.ckn_member(member_key) ON DELETE CASCADE NOT NULL,
  nickname public.name_t,
  member_nickname_timestamp timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_member_nickname ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Supabase Admin can insert nicknames" ON public.ckn_member_nickname FOR
--     INSERT WITH CHECK (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
-- CREATE POLICY "Supabase Admin can update nicknames" ON public.ckn_member_nickname FOR
--     UPDATE USING (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
-- CREATE POLICY "Supabase Admin can delete nicknames" ON public.ckn_member_nickname FOR
--     DELETE USING (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));
-- CREATE POLICY "Supabase Admin can view all nicknames" ON public.ckn_member_nickname FOR
--     SELECT USING (current_user = 'supabase_auth_admin' OR auth.uid() IS NOT NULL);
CREATE POLICY "Supabase Admin can manage nicknames" ON public.ckn_member_nickname FOR
    ALL USING (current_user = 'supabase_auth_admin' OR auth.uid() IS NOT NULL)
    WITH CHECK (current_user = 'supabase_auth_admin' OR ckn_member_key_check(member_key));

-- CREATE POLICY "Individuals can create public.ckn_member_nickname." ON public.ckn_member_nickname FOR
--     INSERT WITH CHECK (ckn_member_key_check(member_key));
-- CREATE POLICY "Individuals can update their own public.ckn_member_nickname" ON public.ckn_member_nickname FOR
--     UPDATE USING (ckn_member_key_check(member_key));
-- CREATE POLICY "Individuals can delete their own public.ckn_member_nickname" ON public.ckn_member_nickname FOR
--     DELETE USING (ckn_member_key_check(member_key));
-- CREATE POLICY  "Individuals can view relations regarding their own nickname" ON public.ckn_member_nickname FOR
--     SELECT USING (auth.uid() IS NOT NULL);

COMMENT ON TABLE public.ckn_member_nickname IS 'CKN: Describes relation between a member and their own nickname.';

CREATE TABLE public.ckn_member_nickname_staging (
  member_nickname_key SERIAL PRIMARY KEY,
  member_key INT REFERENCES public.ckn_member(member_key) ON DELETE CASCADE NOT NULL,
  nickname public.name_t,
  member_nickname_timestamp timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_member_nickname_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can create public.ckn_member_nickname_staging." ON public.ckn_member_nickname_staging FOR
    INSERT WITH CHECK (auth.uid() IS NOT NULL);
    -- INSERT WITH CHECK (ckn_member_staging_key_check(member_key));
CREATE POLICY "Owner|Ind can update their own nickname" ON public.ckn_member_nickname_staging FOR
    UPDATE USING (ckn_member_staging_key_check(member_key));
CREATE POLICY "Owner|Ind can delete their own nickname" ON public.ckn_member_nickname_staging FOR
    DELETE USING (ckn_member_staging_key_check(member_key));
CREATE POLICY  "Owners can view relations regarding their own nickname" ON public.ckn_member_nickname_staging FOR
    SELECT USING (auth.uid() IS NOT NULL);

COMMENT ON TABLE public.ckn_member_nickname_staging IS 'CKN: Describes relation between a member and their own nickname.';

CREATE TABLE public.ckn_group_member_staging (
  group_member_key SERIAL PRIMARY KEY,
  group_key INT REFERENCES public.ckn_group(group_key) ON DELETE CASCADE NOT NULL,
  member_key INT REFERENCES public.ckn_member_staging(member_key) ON DELETE CASCADE NOT NULL,
  group_member_status public.group_member_status_t,
  group_member_source TEXT NOT NULL,
  group_member_timestamp timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_group_member_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Individuals can create group_member_staging." ON public.ckn_group_member_staging FOR
    INSERT WITH check (public.ckn_group_key_check(group_key));
CREATE POLICY "Individuals can update their own group_member_staging." ON public.ckn_group_member_staging FOR
    UPDATE USING (public.ckn_group_key_check(group_key));
CREATE POLICY "Individuals can delete their own group_member_staging." ON public.ckn_group_member_staging FOR
    DELETE USING (public.ckn_group_key_check(group_key));
CREATE POLICY  "Individuals can view all relations in their group." ON public.ckn_group_member_staging FOR
    SELECT USING (auth.uid() IS NOT NULL);

COMMENT ON TABLE public.ckn_group_member_staging IS 'CKN: Describes relation between a member and a group.';

CREATE TABLE public.ckn_group_message (
  group_message_key SERIAL PRIMARY KEY,
--   member_mobile_key public.mobile_key_t NOT NULL, -- Whoops! Not so sure about this one
--   group_cooked_name public.name_t NOT NULL,
--   group_nickname public.name_t,
--   group_mobile_key public.mobile_key_t,
--   owner_nickname public.name_t,
  member_key INT REFERENCES public.ckn_member(member_key) ON DELETE CASCADE NOT NULL,
  group_key INT REFERENCES public.ckn_group(group_key) ON DELETE CASCADE NOT NULL,
  group_message_type public.group_message_type_t NOT NULL,
  group_message_text public.group_message_text_t,
  group_message_timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.ckn_group_message ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Individuals can insert messages" ON public.ckn_group_message
    FOR INSERT WITH CHECK (public.ckn_group_member_key_check(group_key, member_key));
CREATE POLICY "Individuals can update their own messages" ON public.ckn_group_message
    FOR UPDATE USING (public.ckn_group_member_key_check(group_key, member_key));
CREATE POLICY "Individuals can delete their own messages" ON public.ckn_group_message
    FOR DELETE USING (public.ckn_group_member_key_check(group_key, member_key));
CREATE POLICY "Authenticated users can view messages" ON public.ckn_group_message
    FOR SELECT USING (public.ckn_group_member_key_check(group_key, member_key));

-- ************************************************************************
-- ************************************************************************

    -- CREATE. Let's do our table metric functions.

-- ************************************************************************
-- ************************************************************************

CREATE FUNCTION public.ckn_get_all_table_sizes()
RETURNS TABLE(
    table_schema TEXT,
    table_name TEXT,
    table_size TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tables.table_schema::TEXT,
        tables.table_name::TEXT,
        pg_size_pretty(pg_total_relation_size(quote_ident(tables.table_schema) || '.' || quote_ident(tables.table_name))) AS table_size
    FROM 
        information_schema.tables tables
    WHERE 
        tables.table_type = 'BASE TABLE'
    ORDER BY 
        pg_total_relation_size(quote_ident(tables.table_schema) || '.' || quote_ident(tables.table_name)) DESC;
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_table_sizes()
RETURNS TABLE(
    table_name TEXT,
    table_size TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tables.table_name::TEXT,
        pg_size_pretty(pg_total_relation_size(quote_ident(tables.table_name))) AS table_size
    FROM 
        information_schema.tables tables
    WHERE 
        tables.table_schema = 'public'
    ORDER BY 
        pg_total_relation_size(quote_ident(tables.table_name)) DESC;
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_db_size()
RETURNS TEXT AS $$
BEGIN
    RETURN pg_size_pretty(pg_database_size(current_database()));
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_total_users()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT member_mobile_key)
        FROM (
            SELECT member_mobile_key, member_timestamp
            FROM public.ckn_member
            UNION ALL
            SELECT member_mobile_key, member_timestamp
            FROM public.ckn_member_staging
        ) AS combined
        WHERE member_timestamp >= NOW() - INTERVAL '30 days'
    );
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_total_registered_users()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT member_mobile_key)
        FROM (
            SELECT member_mobile_key, member_timestamp
            FROM public.ckn_member
        ) AS combined
        WHERE member_timestamp >= NOW() - INTERVAL '30 days'
    );
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_total_nonregistered_users()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT member_mobile_key)
        FROM (
            SELECT member_mobile_key, member_timestamp
            FROM public.ckn_member_staging
        ) AS combined
        WHERE member_timestamp >= NOW() - INTERVAL '30 days'
    );
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_get_total_groups()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(DISTINCT group_cooked_name)
        FROM public.ckn_group
    );
END;
$$ LANGUAGE plpgsql;


-- ************************************************************************
-- ************************************************************************

    -- CREATE. Let's do our primary functions.

-- ************************************************************************
-- ************************************************************************

CREATE OR REPLACE FUNCTION public.ckn_update_test_user(
    arg_email public.email_t,
    arg_nickname public.name_t,
    arg_mobile_key public.mobile_key_t,
    arg_refresh_token public.refresh_token_t,
    arg_meta_data JSONB
)
RETURNS SETOF public.ckn_test_user AS $$
BEGIN
    -- Update the specific row identified by arg_mobile_key
    UPDATE public.ckn_test_user
    SET 
        test_user_email = arg_email,
        test_user_nickname = arg_nickname,
        test_user_refresh_token = arg_refresh_token,
        test_user_meta_data = arg_meta_data,
        test_user_timestamp = timezone('utc', now())
    WHERE test_user_mobile_key = arg_mobile_key;

    -- Return all rows from the table
    RETURN QUERY
    SELECT * FROM public.ckn_test_user;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION private.ckn_insert_test_user(
    arg_email public.email_t,
    arg_password public.password_t,
    arg_provider public.provider_t,
    arg_nickname public.name_t,
    arg_refresh_token public.refresh_token_t,
    arg_mobile_key public.mobile_key_t,
    arg_meta_data JSONB
)
RETURNS void AS $$
BEGIN
    -- Check if a row with the given mobile_key already exists
    IF EXISTS (
        SELECT 1
        FROM public.ckn_test_user
        WHERE test_user_mobile_key = arg_mobile_key
    ) THEN
        -- Exit quietly
        RETURN;
    END IF;

    -- Insert the new row
    INSERT INTO public.ckn_test_user (
        test_user_email,
        test_user_password,
        test_user_provider,
        test_user_nickname,
        test_user_refresh_token,
        test_user_mobile_key,
        test_user_meta_data,
        test_user_timestamp
    ) VALUES (
        arg_email,
        arg_password,
        arg_provider,
        arg_nickname,
        arg_refresh_token,
        arg_mobile_key,
        arg_meta_data,
        timezone('utc', now())
    );
END;
$$ LANGUAGE plpgsql;

-- Create the SQL function
CREATE FUNCTION private.ckn_delete_test_user(
    arg_mobile_key public.mobile_key_t
)
RETURNS void AS $$
BEGIN
    -- Check if a row with the given mobile_key exists
    IF NOT EXISTS (
        SELECT 1
        FROM public.ckn_test_user
        WHERE test_user_mobile_key = arg_mobile_key
    ) THEN
        -- Exit quietly
        RETURN;
    END IF;

    -- Delete the row
    DELETE FROM public.ckn_test_user
    WHERE test_user_mobile_key = arg_mobile_key;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION public.ckn_insert_email_verification(
    arg_mobile_key public.mobile_key_t,
    arg_email public.email_t,
    arg_token public.token_t,
    arg_expires_at TIMESTAMP WITH TIME ZONE
)
RETURNS VOID
SECURITY INVOKER
LANGUAGE plpgsql AS $$
DECLARE
    local_member_uuid UUID;
BEGIN
    -- Log input arguments
    -- RAISE LOG 'ckn_insert_email_verification: arg_mobile_key %, arg_email %, arg_token %, arg_expires_at %', arg_mobile_key, arg_email, arg_token, arg_expires_at;

    -- Get member_uuid for the given mobile key
    SELECT m.member_uuid INTO local_member_uuid
    FROM public.ckn_member m
    WHERE TRIM(m.member_mobile_key) = TRIM(arg_mobile_key);

    -- RAISE LOG 'Extracted uuid: %', local_member_uuid;

    IF local_member_uuid IS NULL THEN
        -- RAISE LOG 'No member found with mobile_key %', arg_mobile_key;
        RETURN;
    END IF;

    -- Delete old entries (older than 15 minutes)
    DELETE FROM public.ckn_email_verification
    WHERE local_member_uuid = member_uuid
    AND created_at < (timezone('utc', now()) - INTERVAL '15 minutes');

    -- Insert or update entry
    INSERT INTO public.ckn_email_verification (
        member_uuid, 
        email, 
        token, 
        created_at, 
        expires_at, 
        email_verification_timestamp
    )
    VALUES (
        local_member_uuid, 
        arg_email, 
        arg_token, 
        timezone('utc', now()), 
        arg_expires_at, 
        timezone('utc', now())
    )
    ON CONFLICT (member_uuid) DO UPDATE SET
        email = EXCLUDED.email,
        token = EXCLUDED.token,
        created_at = EXCLUDED.created_at,
        expires_at = EXCLUDED.expires_at,
        email_verification_timestamp = EXCLUDED.email_verification_timestamp;

    -- Log successful insertion or update
    -- RAISE LOG 'ckn_insert_email_verification: Successfully inserted or updated for member_uuid %', local_member_uuid;

EXCEPTION
    WHEN OTHERS THEN
        -- Log any unexpected errors
        -- RAISE LOG 'ckn_insert_email_verification: Error - %', SQLERRM;
        RETURN;
END;
$$;


CREATE FUNCTION public.ckn_get_nickname(
    arg_mobile_key public.mobile_key_t
) 
RETURNS public.name_t 
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
DECLARE
    local_nickname public.name_t;
BEGIN
    -- Select the nickname into a local variable
    SELECT nickname INTO local_nickname 
    FROM public.ckn_member
    WHERE member_mobile_key = arg_mobile_key;

    -- Return the result
    RETURN local_nickname;
END;
$$;

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


-- Trigger for AFTER INSERT
CREATE TRIGGER on_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.ckn_handle_user_update();

-- Trigger for AFTER UPDATE
CREATE TRIGGER on_user_updated
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.ckn_handle_user_update();



-- CREATE FUNCTION public.ckn_handle_new_user()
-- RETURNS TRIGGER
-- SECURITY DEFINER
-- LANGUAGE plpgsql AS $$
-- DECLARE
--     local_member_key INT;
--     local_mobile_key public.mobile_key_t;
--     local_group_nickname public.name_t;
--     local_group_cooked_name public.name_t;
-- BEGIN
--   local_mobile_key := new.raw_user_meta_data->>'sub';

-- --   -- RAISE LOG 'Trigger on create';
--   -- RAISE LOG 'Trigger on create for local_mobile_key = %', local_mobile_key;
--     -- RAISE LOG 'Function executed under user: %', current_user;

--   INSERT INTO public.ckn_member (
--     member_uuid,
--     member_status,
--     member_activity,
--     member_mobile_key,
--     message_update_timestamp,
--     member_update_timestamp
--     )
--   VALUES (
--     new.id,
--     'pending',
--     'okay', 
--     local_mobile_key,
--     CURRENT_TIMESTAMP,
--     'NEWMEMBER'
--     );

--   PERFORM public.ckn_update_member_nickname('NEWMEMBER', local_mobile_key);

--   local_group_nickname := 'Family';
--   local_group_cooked_name := public.ckn_generate_sha256(local_group_nickname || '-' || local_mobile_key);
--   PERFORM public.ckn_add_group(local_group_cooked_name, local_group_nickname, local_mobile_key);

--   local_group_nickname := 'Friends';
--   local_group_cooked_name := public.ckn_generate_sha256(local_group_nickname || '-' || local_mobile_key);
--   PERFORM public.ckn_add_group(local_group_cooked_name, local_group_nickname, local_mobile_key);

--   RETURN new;
-- END;
-- $$;

-- trigger the function every time a user is created
-- CREATE TRIGGER on_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.ckn_handle_new_user();

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

CREATE FUNCTION public.ckn_get_status_c(
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
      ms.member_mobile_key, 
      'pseudo email' as member_cooked_email,
      ms.member_status, 
      ms.member_activity,
      ms.member_provider,
      mns.nickname,
      ms.message_update_timestamp,
      ms.member_update_timestamp,
      ms.member_timestamp,
      gms.group_member_source
    FROM 
      public.ckn_group g
    JOIN public.ckn_group_member_staging gms ON gms.group_key = g.group_key
    JOIN public.ckn_member_staging ms ON ms.member_key = gms.member_key
    -- JOIN public.ckn_member_cooked_email mce ON mce.member_key = gms.member_key
    JOIN public.ckn_member_nickname_staging mns ON mns.member_key = gms.member_key
    WHERE 
      g.group_cooked_name IN (
        SELECT g.group_cooked_name 
        FROM public.ckn_group g
        JOIN public.ckn_group_member_staging gms ON g.group_key = gms.group_key
        JOIN public.ckn_member_staging ms ON ms.member_key = gms.member_key
        WHERE ms.member_mobile_key = arg_mobile_key)
    AND ms.member_mobile_key != arg_mobile_key;
$$;

CREATE FUNCTION public.ckn_get_status(
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
LANGUAGE plpgsql AS $$
BEGIN
    -- We start with a check for the normal situation here
    -- where there never was a staging version of a member. In
    -- this case, the member simply registered and logged in. 
    -- Thereafter, others begin to invite this member to join
    -- their socials.
    IF NOT EXISTS (
        -- If this test fails, then everything was
        -- normal from the very beginning.
        SELECT 1 FROM public.ckn_member_staging ms
        WHERE ms.member_mobile_key = arg_mobile_key )
    THEN 
        -- The test failed (NOT EXISTS), so
        -- return everything from the normal tables
        -- for the given arg_mobile_key, which can be a
        -- member or owner.
        RETURN QUERY 
        SELECT * FROM public.ckn_get_status_a(arg_mobile_key);
    ELSE
        -- Otherwise, the test succeeded (NOT NOT EXISTS),
        -- which is to say this member did not start off
        -- their registration process like normal. Instead
        -- someone invited this member before they ever
        -- registered. Consequently, this member has a
        -- staging record.
        --
        -- Also, until otherwise determined, we don't know
        -- as yet whether this member EVER registed. Now,
        -- we should flip the test and see whether this 
        -- member has registered at all or whether they are
        -- still in staging mode.
        IF NOT EXISTS (
            -- If THIS test fails (NOT EXISTS), then now we
            -- know that this member has never registered 
            -- like normal.
            SELECT 1 FROM public.ckn_member m
            WHERE m.member_mobile_key = arg_mobile_key )
        THEN 
            -- If we are here, then this member never 
            -- registered. Only the OWNER would be asking
            -- for get_status, btw. The non-registered
            -- member would not be asking this question.
            --
            -- I thinking I should return _a and _c. 
            -- Though we are talking about the owner, not
            -- the member, I am not exactly sure (YET!)
            -- about the member values, which will be
            -- drawn from public.ckn_member_staging.
            RETURN QUERY
            SELECT * FROM public.ckn_get_status_c(arg_mobile_key)
            UNION ALL
            SELECT * FROM public.ckn_get_status_a(arg_mobile_key);
        ELSE 
            -- If we are here, then this member HAS
            -- registered. Details regarding this member,
            -- as drawn from public.ckn_member, should trump
            -- details from public.ckn_member_staging
            RETURN QUERY
            SELECT * FROM public.ckn_get_status_c(arg_mobile_key)
            UNION ALL
            SELECT * FROM public.ckn_get_status_a(arg_mobile_key);
        END IF;
    END IF;
END;
$$;


CREATE FUNCTION public.ckn_update_member_cooked_email(
    arg_cooked_email public.email_t, 
    arg_mobile_key public.mobile_key_t
) 
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    local_member_key INT;
BEGIN
    -- Check for NULL inputs to prevent unnecessary operations
    IF arg_cooked_email IS NULL OR arg_mobile_key IS NULL THEN
        RAISE EXCEPTION 'Email and mobile key must be provided';
    END IF;

    -- Retrieve the member_key associated with the provided mobile key
    SELECT m.member_key 
    INTO local_member_key
    FROM public.ckn_member m 
    WHERE m.member_mobile_key = arg_mobile_key;

    -- If no local_member_key is found, raise an error
    IF local_member_key IS NULL THEN
        RAISE EXCEPTION 'No member found with the provided mobile key: %', arg_mobile_key;
    END IF;

    -- Attempt to update the row if it exists
    UPDATE public.ckn_member_cooked_email
    SET cooked_email = arg_cooked_email,
        member_cooked_email_timestamp = timezone('utc', now())
    WHERE member_key = local_member_key;

    -- If no rows were updated, insert a new row
    IF NOT FOUND THEN
        INSERT INTO public.ckn_member_cooked_email (
            member_key,
            cooked_email
        )
        VALUES (
            local_member_key,
            arg_cooked_email
        );
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Log and re-raise any unexpected errors
        RAISE NOTICE 'Error in ckn_update_member_cooked_email: %', SQLERRM;
        RAISE;
END;
$$;




CREATE FUNCTION public.ckn_update_member_nickname(
    arg_nickname public.name_t, 
    arg_mobile_key public.mobile_key_t
) 
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    -- RAISE LOG 'ABOVE UPDATE to public.ckn_member_nickname';

    -- Attempt to update the row using the correct member_key value from the provided mobile key
    UPDATE public.ckn_member_nickname
    SET nickname = arg_nickname,
        member_nickname_timestamp = timezone('utc', now())
    WHERE member_key = (SELECT m.member_key FROM public.ckn_member m WHERE m.member_mobile_key = arg_mobile_key);

    -- RAISE LOG 'BELOW UPDATE to public.ckn_member_nickname';

    -- If no rows are updated, insert a new row
    IF NOT FOUND THEN
        -- RAISE LOG 'ABOVE INSERT to public.ckn_member_nickname with arg_mobile_key = %', arg_mobile_key;

        INSERT INTO public.ckn_member_nickname (
            member_key,
            nickname
        )
        VALUES (
            (SELECT m.member_key FROM public.ckn_member m WHERE m.member_mobile_key = arg_mobile_key),
            arg_nickname
        );
        
        -- RAISE LOG 'BELOW INSERT to public.ckn_member_nickname';

    END IF;

END;
$$;


CREATE FUNCTION public.ckn_update_member_nickname_staging(
    arg_member_mobile_key public.mobile_key_t,
    arg_nickname public.name_t, 
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
LANGUAGE plpgsql
AS $$
BEGIN
    -- Attempt to update the row using the correct member_key value from the provided mobile key
    UPDATE public.ckn_member_nickname_staging
    SET nickname = arg_nickname,
        member_nickname_timestamp = timezone('utc', now())
    WHERE member_key = (
        SELECT ms.member_key
        FROM public.ckn_member_staging ms 
        WHERE ms.member_mobile_key = arg_member_mobile_key
    );

    -- If no rows are updated, insert a new row
    IF NOT FOUND THEN
        INSERT INTO public.ckn_member_nickname_staging (
            member_key,
            nickname
        )
        VALUES (
            (SELECT ms.member_key FROM public.ckn_member_staging ms WHERE ms.member_mobile_key = arg_member_mobile_key),
            arg_nickname
        );
    END IF;

    -- Return the required fields using the provided query
    RETURN QUERY SELECT * FROM public.ckn_get_status(arg_mobile_key);
END;
$$;


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


CREATE FUNCTION public.ckn_add_group_member_by_cooked_email(
    arg_group_cooked_name public.name_t, 
    arg_member_cooked_email public.email_t,
    arg_possible_nickname public.name_t, -- This nickname passes thru in case member is not registered
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
LANGUAGE plpgsql AS
$$
DECLARE
    local_member_mobile_key public.mobile_key_t;
BEGIN
    -- RAISE LOG 'InDirect Call: Calling ckn_add_group_member_by_cooked_email';

    -- Retrieve the member's mobile key from the cooked email
    SELECT m.member_mobile_key 
    INTO local_member_mobile_key
    FROM public.ckn_member m
    JOIN public.ckn_member_cooked_email mce ON m.member_key = mce.member_key
    WHERE mce.cooked_email = arg_member_cooked_email;

    -- Check if the value is NULL, and if so, generate a new mobile key
    IF local_member_mobile_key IS NULL THEN
        local_member_mobile_key := public.ckn_generate_sha256(arg_member_cooked_email);
    END IF;

    -- RAISE LOG 'InDirect Call: Calling ckn_add_group_member_by_mobile_key with values arg_group_cooked_name = %, arg_member_cooked_email = %, arg_member_mobile_key = %, arg_mobile_key = %', arg_group_cooked_name, arg_member_cooked_email, local_member_mobile_key, arg_mobile_key;

    -- Call the ckn_add_group_member_by_mobile_key function using the mobile key
    RETURN QUERY 
    SELECT * 
    FROM public.ckn_add_group_member_by_mobile_key(
        arg_group_cooked_name,
        local_member_mobile_key,
        arg_possible_nickname,
        arg_mobile_key
    );
END;
$$;


CREATE FUNCTION public.ckn_add_group_member_by_mobile_key( -- NOT by email ... that is another routine 
    arg_group_cooked_name    public.name_t, 
    arg_member_mobile_key    public.mobile_key_t, -- True, but wait. He doesn't actually know this information (only email, for example)
    arg_possible_nickname    public.name_t,
    arg_mobile_key           public.mobile_key_t
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
LANGUAGE plpgsql AS
$$
DECLARE
    local_member_key INT;
    local_owner_member_key public.mobile_key_t;
    local_owner_nickname public.name_t;
    local_relation_exists BOOLEAN;
    local_group_member_status public.group_member_status_t;
    local_row_count INT;
BEGIN
    -- RAISE LOG 'Direct Call: Calling ckn_add_group_member_by_mobile_key';

    -- Not that this test is necessary, but it is a wise choice nonetheless.
    -- After all, if there is no group to begin with, then why are we
    -- attempting to add a new member. Makes sense.
    IF NOT EXISTS (
        SELECT 1 FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name
    ) THEN
        RAISE EXCEPTION 'No entry found for group % on behalf of %, a.k.a. %', arg_group_cooked_name, arg_member_mobile_key, arg_mobile_key
        USING ERRCODE = 'U0001'; -- Unique violation
    END IF;

    -- Check if the member exists. Here, I am choosing which
    -- path to follow: (A) this member has never been registered,
    -- in which case I go down the staging path, or (B) this 
    -- member is registered, in which case I go down the normal
    -- path for members in the ecosystem.

    -- We are beginning with arg_member_mobile_key, which could
    -- be legit or pseudo. Normally, we are coming thru here at the
    -- call of ckn_add_group_member_by_cooked_email, when we only
    -- know a target cooked email (later we may have a cooked phone).

    -- All this means is that the incoming arg_member_mobile_key
    -- could be fake, which is to say it could be a cooked email
    -- for a member whose has yet to register.
    
    -- RAISE LOG 'Get ready to decide our path given arg_group_cooked_name = %, arg_member_mobile_key = %, arg_mobile_key = %', arg_group_cooked_name, arg_member_mobile_key, arg_mobile_key;

    IF NOT EXISTS (
        SELECT 1 FROM public.ckn_member m WHERE m.member_mobile_key = arg_member_mobile_key
    ) THEN
        -- RAISE LOG 'Nope, arg_member_mobile_key = % is an unknown quantiy. Never registered. It is pseudo.', arg_member_mobile_key;
        -- RAISE LOG 'Re-direct to staging area for arg_group_cooked_name = %, arg_member_mobile_key = %, arg_mobile_key = %', arg_group_cooked_name, arg_member_mobile_key, arg_mobile_key;
        
        -- Apparently, the member_mobile_key does not match anything in
        -- ckn_member, so onto ckn_member_staging. Of course, we need
        -- to decide whether this is our first rodeo for this
        -- member_mobile_key.

        -- RAISE LOG 'Now the question is whether we have seen this pseudo mobile_key in the past';

        IF NOT EXISTS (
            SELECT 1 FROM public.ckn_member_staging ms WHERE ms.member_mobile_key = arg_member_mobile_key
        ) THEN
            -- RAISE LOG 'Nope, this is a newly arrived pseudo mobile_key';

            -- We need to add this non-registered member, but we
            -- almost nothing to go by. Therefore, we pull a lot
            -- of details from the owner of the group.
            
            -- Member does not exist, insert member details into staging
            -- leveraging Owner details including Owner's UUID
            INSERT INTO public.ckn_member_staging (
                member_uuid,
                member_status,
                member_activity,
                member_mobile_key,
                member_provider,
                message_update_timestamp,
                member_update_timestamp,
                member_owner_mobile_key
            )
            SELECT
                m.member_uuid, -- Using group owner's uuid, basically a pseudo member_uuid
                'pending',
                'okay',
                arg_member_mobile_key, -- And HERE WE GO! Watch out for this pseudo mobile_key,
                'apple',
                CURRENT_TIMESTAMP,
                'NEWTIMESTAMP', -- YES, this is a legitimate Timestamp. Logic within mobile app checks for 'NEWUSER'
                arg_mobile_key -- This is okay and exact. This key indeed belongs to the caller
            FROM public.ckn_member m
            WHERE m.member_mobile_key = arg_mobile_key;

            -- RAISE LOG 'Indeed, I added this new entry to ckn_member_staging';

            -- I also need to add the new member's expected
            -- nickname, to the best of the owner's knowledge

            -- Basically, we know nothing about this new non-registered
            -- member. We need to assign a nickname, but we don't know
            -- a thing.
            PERFORM public.ckn_update_member_nickname_staging(
                arg_member_mobile_key, -- AGAIN, we are using this pseudo mobile_key
                arg_possible_nickname, -- 'PSEUDO NICKNAME',
                arg_mobile_key -- Mostly confident that this is correct
            );
        END IF;

        -- If we are here, then we working with a pseudo mobile key,
        -- arg_member_mobile_key.
        
        -- Regardless of how arg_member_mobile_key found their way into
        -- member_staging, Let's store their member_key locally.
        -- Don't forget, this is actually based on a look-up using
        -- a pseudo mobile_key (arg_member_cooked_email).
        
        SELECT ms.member_key INTO local_member_key FROM public.ckn_member_staging ms
        WHERE ms.member_mobile_key = arg_member_mobile_key;        
        
        -- Now, onto the relationship of the pseudo mobile_key to the
        -- legitimate group
        
        -- Now, the question is whether we are re-adding the same relationship.
        -- Previously, I chose to issue an error in this case. Later, I decided
        -- to handle the situation more gracefully with the client. There is
        -- no harm done by ignoring the client's repeat request. Ultimately, the
        -- client themselves will discover that they are asking to add the 
        -- same member (again) into a relation.
        --
        -- I have also re-structured this SQL to be more more inline with how
        -- I add repeated groups.
        
        BEGIN
            -- Check if the relation already exists in the staging area
            -- The driver here is the group's cooked name, arg_group_cooked_name,
            -- and this pseudo mobile_key, arg_member_mobile_key
        
            SELECT EXISTS (
                SELECT 1 FROM public.ckn_member_staging ms
                JOIN public.ckn_group_member_staging gms ON gms.member_key = ms.member_key
                JOIN public.ckn_group g ON gms.group_key = g.group_key
                WHERE ms.member_mobile_key = arg_member_mobile_key
                AND   g.group_cooked_name = arg_group_cooked_name
            ) INTO local_relation_exists;

            -- If the relation exists, return the expected table without attempting to
            -- add a new relation
        
            IF local_relation_exists THEN
                RETURN QUERY
                SELECT * FROM public.ckn_get_status(arg_mobile_key); -- right for the owner. Right?
                RETURN;
            END IF;

            -- Nope, this is a new relation to be added for the
            -- pseudo mobile_key
            
            -- Now, insert MEMBER to-be-staged into relationship
            -- with group. Again, even this relationship is in a
            -- staging area.

            INSERT INTO public.ckn_group_member_staging (
                group_key, 
                member_key, 
                group_member_status,
                group_member_source
            ) 
            SELECT  
                g.group_key, 
                local_member_key, -- Yes, this is correct. See setting above.
                'invitee-pending',
                'staging'
            FROM public.ckn_group g
            WHERE g.group_cooked_name = arg_group_cooked_name;

        EXCEPTION
            WHEN OTHERS THEN
                -- Log the original error for diagnostic purposes
                -- RAISE LOG 'Error during operation: %', SQLERRM;
        END;

        -- At this point, the pseudo mobile_key is all set up.
        -- They are now in the member_staging table and they have
        -- a relationship in the group_member_staging table
        
        -- Let's grab the nickname for the owner while we can. We find the
        -- nickname in the mainstream table public.ckn_member_nickname
        -- I could invoke get_nickname, if I felt like it. I will wait on that.

        -- This is a touch early to grab the nickname, but then I am choosing
        -- to use this value later in an error message farther below.
        
        SELECT mn.nickname INTO local_owner_nickname FROM public.ckn_member_nickname mn
        JOIN public.ckn_member m ON mn.member_key = m.member_key
        WHERE m.member_mobile_key = arg_mobile_key;

        -- Now, that the pseudo mobile_key is present in the staging
        -- tables, especially in the relations table, we need to deal
        -- with the owner of the group in question.
        
        -- Under the circumstances, we need to insert the owner
        -- into the member_staging table provided the owner is not already
        -- present in this table.
        
        -- From here on, we are dealing with the group owner.
        
        IF NOT EXISTS (
            -- Yes, arg_mobile_key is correct because we are talking about
            -- the group owner, which equates to arg_mobile_key
            SELECT 1 FROM public.ckn_member_staging ms WHERE ms.member_mobile_key = arg_mobile_key
        ) THEN
            BEGIN
                -- Whoops, we do need to add that group owner into the
                -- staging tables, including their nickname staging tables.
                
                INSERT INTO public.ckn_member_staging (
                    member_uuid,
                    member_status,
                    member_activity,
                    member_mobile_key,
                    member_provider,
                    message_update_timestamp,
                    member_update_timestamp,
                    member_owner_mobile_key
                )
                SELECT
                    m.member_uuid,
                    m.member_status,
                    m.member_activity,
                    arg_mobile_key,
                    'apple',
                    m.message_update_timestamp,
                    'NEWTIMESTAMP', -- I believe this is correct. Remember, this is a flag for the mobile app.
                    arg_mobile_key -- Yes, this is also correct. We are talking about the group owner.
                FROM public.ckn_member m
                WHERE m.member_mobile_key = arg_mobile_key;

                -- Clearly, if the owner is not already in the 
                -- table public.ckn_member_staging, then it follows
                -- that their nickname is also not in the staging
                -- table for nicknames, public.ckn_member_nickname_staging.

                -- RAISE LOG 'Above PERFORM public.ckn_update_member_nickname_staging';
                
                PERFORM public.ckn_update_member_nickname_staging(
                    arg_mobile_key, -- Happenstance, yet again
                    local_owner_nickname,
                    arg_mobile_key
                );
                -- RAISE LOG 'Below PERFORM public.ckn_update_member_nickname_staging';

            EXCEPTION WHEN OTHERS THEN
                RAISE EXCEPTION 'Failed to insert into public.ckn_member_staging: %', SQLERRM
                USING ERRCODE = 'U0005'; -- Unique violation
            END;
        END IF;

        -- Regardless of whether we just add the owner to the member_staging
        -- table or not, let's grab their corresponding member_key in that
        -- table now.
        SELECT ms.member_key INTO local_member_key FROM public.ckn_member_staging ms
        WHERE ms.member_mobile_key = arg_mobile_key;

        -- RAISE LOG 'ABOVE Testing whether ... arg_mobile_key has a connection';

        -- Now, insert the owner into the group_member_staging table
        -- if the owner does not already have a relation with this group
        
        IF NOT EXISTS (

            -- This test answers the question, is there a person in 
            -- public.ckn_member_staging where that persons email is a match
            -- for arg_mobile_key AND (most important) that person has a 
            -- relationship in ckn_group_member_staging that binds
            -- this person to a group who name equals arg_group_cooked_name?
            
            SELECT 1 FROM public.ckn_member_staging ms
            JOIN public.ckn_group_member_staging gms ON gms.member_key = ms.member_key
            JOIN public.ckn_group g ON gms.group_key = g.group_key
            WHERE ms.member_mobile_key = arg_mobile_key
            AND   g.group_cooked_name = arg_group_cooked_name

        ) THEN
            BEGIN
                -- RAISE LOG 'Nope, no relation for the owner % to the group %', local_owner_nickname, arg_group_cooked_name;

                -- Insert into group_member_staging
                INSERT INTO public.ckn_group_member_staging (
                    group_key, 
                    member_key, 
                    group_member_status,
                    group_member_source
                ) 
                SELECT  
                    g.group_key, 
                    local_member_key, 
                    'owner',
                    'staging'
                FROM public.ckn_group g
                WHERE g.group_cooked_name = arg_group_cooked_name;
            END;
        END IF;

        -- RAISE LOG 'We are at the end. The pseudo member and real owner are now in place in staging. ';

    ELSE

        -- If we are here, then the incoming arg_member_mobile_key is legit.
        -- That is, the mobile_key points to an actual registered member
        
        BEGIN
            -- Check if the relation already exists, locking in with
            
            SELECT EXISTS (
                SELECT 1 
                FROM public.ckn_group_member gm
                JOIN public.ckn_group g ON g.group_key = gm.group_key
                JOIN public.ckn_member m ON m.member_key = gm.member_key
                WHERE g.group_cooked_name = arg_group_cooked_name 
                AND m.member_mobile_key = arg_member_mobile_key
            ) INTO local_relation_exists;

            -- If the relation exists, return the expected table without attempting to
            -- add a new relation
            
            IF local_relation_exists THEN
                -- We have been here before. Exit stage right.

                RETURN QUERY
                SELECT * FROM public.ckn_get_status(arg_mobile_key);
                RETURN;
            END IF;

            -- Looks like this legit member is new to this relationship.
            -- Before we add this member to the relationship table, we
            -- we need to decide the member's role: owner or invitee.
            
            IF arg_member_mobile_key = arg_mobile_key THEN
                local_group_member_status := 'owner';
            ELSE
                local_group_member_status := 'invitee';
            END IF;

            BEGIN
                -- RAISE LOG 'We need to add this new relationship';
                -- RAISE LOG 'Right into the thick of it: arg_group_cooked_name = %, arg_mobile_key = %', arg_group_cooked_name, arg_mobile_key;

                INSERT INTO public.ckn_group_member (
                    group_key, 
                    member_key,

                    -- group_uuid, -- For debugging purposes
                    -- member_uuid, -- For debugging purposes

                    group_member_status,
                    group_member_source
                ) 
                SELECT  
                    g.group_key, 
                    m.member_key,

                    -- g.group_uuid, -- For debugging purposes
                    -- m.member_uuid, -- For debugging purposes

                    local_group_member_status,
                    'normal'
                FROM public.ckn_group g
                JOIN public.ckn_member m ON m.member_mobile_key = arg_member_mobile_key
                WHERE g.group_cooked_name = arg_group_cooked_name;
                
                -- GET DIAGNOSTICS local_row_count := ROW_COUNT;
                -- RAISE LOG 'Number of rows inserted: %', local_row_count;

                -- RAISE LOG 'Done with the best of it';

                -- If the insert is successful, return the status
                -- RETURN QUERY SELECT * FROM public.ckn_get_status(arg_mobile_key);
            EXCEPTION WHEN OTHERS THEN
                -- Print out the error details to help with debugging
                RAISE NOTICE 'Error occurred during INSERT: %', SQLERRM;
            END;
        END;

    END IF;

    -- Depending on whether a member was staged or added directly, fetch status
    RETURN QUERY
    SELECT * FROM public.ckn_get_status(arg_mobile_key);
END;
$$;

CREATE FUNCTION public.ckn_delete_group_member (
    arg_group_cooked_name public.name_t, 
    arg_member_mobile_key public.mobile_key_t,
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
-- Tricky: variable_conflict: https://www.postgresql.org/docs/current/plpgsql-implementation.html
#variable_conflict use_column
BEGIN
    DELETE FROM public.ckn_group_member 
    WHERE group_key = ( SELECT g.group_key FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name )
    AND   member_key = ( SELECT m.member_key FROM public.ckn_member m WHERE m.member_mobile_key = arg_member_mobile_key );

    DELETE FROM public.ckn_group_member_staging
    WHERE group_key = ( SELECT g.group_key FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name )
    AND   member_key = ( SELECT ms.member_key FROM public.ckn_member_staging ms WHERE ms.member_mobile_key = arg_member_mobile_key );

    RETURN QUERY
    SELECT * FROM public.ckn_get_status(arg_mobile_key);    
END;
$$;


CREATE FUNCTION public.ckn_delete_group(
    arg_group_cooked_name public.name_t, 
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
-- Tricky: variable_conflict: https://www.postgresql.org/docs/current/plpgsql-implementation.html
#variable_conflict use_column
DECLARE
    group_exists BOOLEAN;
BEGIN
    -- Check if the group exists
    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group g
        WHERE g.group_cooked_name = arg_group_cooked_name
    ) INTO group_exists;

    -- If the group exists, return the expected table without attempting to add a new group
    IF NOT group_exists THEN

        RAISE LOG 'ckn_delete_group: Looks like this arg_group_cooked_name = % does not exist. Exit stage right.', arg_group_cooked_name;

        RETURN QUERY
        SELECT * FROM public.ckn_get_status(arg_mobile_key);
        RETURN;
    END IF;

    RAISE LOG 'ckn_delete_group: arg_group_cooked_name = % does exist. Delete the group, Captain.', arg_group_cooked_name;

    DELETE FROM public.ckn_group_member 
    WHERE group_key = ( SELECT g.group_key FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name );

    DELETE FROM public.ckn_group g
    WHERE g.group_cooked_name = arg_group_cooked_name;

    RETURN QUERY
    SELECT * FROM public.ckn_get_status(arg_mobile_key);    
END;
$$;

CREATE OR REPLACE FUNCTION public.ckn_update_group_member(
    arg_group_cooked_name public.name_t, 
    arg_member_mobile_key public.mobile_key_t,
    arg_group_member_status public.group_member_status_t,
    arg_update_timestamp public.update_timestamp_t,
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
-- Tricky: variable_conflict: https://www.postgresql.org/docs/current/plpgsql-implementation.html
#variable_conflict use_column
BEGIN
    -- RAISE LOG 'ckn_update_group_member for group_cooked_name = %, member_mobile_key = %, group_member_status = %', arg_group_cooked_name, arg_member_mobile_key, arg_group_member_status;
    
    IF EXISTS (
        SELECT 1 FROM public.ckn_member m, public.ckn_group g, public.ckn_group_member gm
        WHERE g.group_cooked_name = arg_group_cooked_name 
        AND   g.group_key = gm.group_key
        AND   m.member_key = gm.member_key
        AND   m.member_mobile_key = arg_member_mobile_key
    ) THEN

        -- RAISE LOG 'ckn_update_group_member WILL UPDATE status for member_mobile_key = % to group_member_status = %', arg_member_mobile_key, arg_group_member_status;

        UPDATE public.ckn_group_member
        SET group_member_status = arg_group_member_status
        WHERE group_key = ( SELECT g.group_key FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name )
        AND   member_key = ( SELECT m.member_key FROM public.ckn_member m WHERE m.member_mobile_key = arg_member_mobile_key );

        -- Update member_update_timestamp if this is the member taking action
        UPDATE public.ckn_member
        SET member_update_timestamp = arg_update_timestamp,
            member_timestamp = CURRENT_TIMESTAMP
        WHERE member_mobile_key = arg_member_mobile_key;

    ELSE

        UPDATE public.ckn_group_member_staging
        SET group_member_status = arg_group_member_status
        WHERE group_key = ( SELECT g.group_key FROM public.ckn_group g WHERE g.group_cooked_name = arg_group_cooked_name )
        AND   member_key = ( SELECT ms.member_key FROM public.ckn_member_staging ms WHERE ms.member_mobile_key = arg_member_mobile_key );

    END IF;

    RETURN QUERY
    SELECT * FROM public.ckn_get_status(arg_mobile_key);    
END;
$$;

CREATE FUNCTION public.ckn_update_member(
    arg_member_status public.member_status_t,
    arg_member_activity public.activity_t,
    arg_update_timestamp public.update_timestamp_t, 
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
#variable_conflict use_column
BEGIN
    -- Check if the member exists in ckn_member and update if found
    IF EXISTS (
        SELECT 1 FROM public.ckn_member m
        WHERE m.member_mobile_key = arg_mobile_key
    ) THEN
        UPDATE public.ckn_member
        SET member_status = arg_member_status,
            member_activity = arg_member_activity,
            member_update_timestamp = arg_update_timestamp,
            member_timestamp = CURRENT_TIMESTAMP
        WHERE member_mobile_key = arg_mobile_key;
    END IF;

    -- Check if the member exists in ckn_member_staging and update if found
    IF EXISTS (
        SELECT 1 FROM public.ckn_member_staging ms
        WHERE ms.member_mobile_key = arg_mobile_key
    ) THEN
        UPDATE public.ckn_member_staging
        SET member_status = arg_member_status,
            member_activity = arg_member_activity,
            member_update_timestamp = arg_update_timestamp,
            member_timestamp = CURRENT_TIMESTAMP
        WHERE member_mobile_key = arg_mobile_key;
    END IF;
    
    -- Return the updated status from ckn_get_status
    RETURN QUERY
    SELECT * FROM public.ckn_get_status(arg_mobile_key);
END;
$$;


CREATE FUNCTION public.ckn_update_group_message_timestamp(
    arg_mobile_key public.mobile_key_t
)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
DECLARE
    new_timestamp TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Update the timestamp for the member with the provided email
    UPDATE public.ckn_member
    SET message_update_timestamp = CURRENT_TIMESTAMP
    WHERE member_mobile_key = arg_mobile_key
    RETURNING message_update_timestamp INTO new_timestamp;

    -- Return the new timestamp
    RETURN new_timestamp;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.ckn_add_group_message(
    arg_member_mobile_key public.mobile_key_t,
    arg_group_cooked_name public.name_t,
    arg_group_message_type public.group_message_type_t,
    arg_group_message_text public.group_message_text_t
) 
RETURNS void
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
DECLARE
    member_exists boolean;
    group_exists boolean;
    message_exists boolean;
    -- local_owner_name public.name_t;
BEGIN
    -- RAISE LOG 'ckn_add_group_message for group_cooked_name = %, member_mobile_key = %, arg_group_message_type = %', arg_group_cooked_name, arg_member_mobile_key, arg_group_message_type;

    -- Check if the member exists. Recognize that we are talking about
    -- registered (paying) members. Non-registered members cannot
    -- receive messages

    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_member
        WHERE member_mobile_key = arg_member_mobile_key
    ) INTO member_exists;

    IF NOT member_exists THEN
        RAISE EXCEPTION 'Member with member_mobile_key % does not exist', arg_member_mobile_key;
    END IF;

    -- Check if the group exists. This follows, too. We might
    -- as well check that the group in question exists.

    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group
        WHERE group_cooked_name = arg_group_cooked_name
    ) INTO group_exists;

    IF NOT group_exists THEN
        RAISE EXCEPTION 'Group with name % does not exist', arg_group_cooked_name;
    END IF;

    -- Check if the message already exists
    SELECT EXISTS (
        SELECT 1
        FROM public.ckn_group_message gm                            -- Here, we are looking for the one unique message
        JOIN public.ckn_member m ON gm.member_key = m.member_key    -- We are talking about the FROM WHOM
        JOIN public.ckn_group g ON gm.group_key = g.group_key       -- It would be lined up for this group
        WHERE m.member_mobile_key = arg_member_mobile_key           -- line up FROM WHOM
          AND g.group_cooked_name = arg_group_cooked_name           -- line up the group
          AND gm.group_message_type = arg_group_message_type        -- line up the uniqueness of the message type
          AND gm.group_message_text = arg_group_message_text        -- line up the uniqueness of the message text (more of a future thing)
    ) INTO message_exists;

    IF message_exists THEN
        -- You can see here that arg_member_mobile_key is the FROM WHOM
        RAISE NOTICE 'Message from member % to group % already exists', arg_member_mobile_key, arg_group_cooked_name;
        RETURN;
    END IF;

    -- local_owner_name := 'FAKE NAME'; -- Remind me later about what this is all about

    -- Insert the message
    INSERT INTO public.ckn_group_message (
        -- member_mobile_key, -- Strong tie to the FROM WHOM. Not even member_key
        -- group_cooked_name,
        -- group_nickname,
        -- group_mobile_key, -- Strong tie to the Owner of the group
        -- owner_nickname, -- Apparently, this is fake
        member_key, -- Given this value, WHY WHY WHY member_mobile_key (for convenience?)
        group_key, -- Given this value, WHY WHY WHY any of the other group_stuff (for convenience ?)
        group_message_type,
        group_message_text
    ) 
    SELECT
        -- arg_member_mobile_key, -- This must be FROM WHOM, not to whom.
        -- arg_group_cooked_name,
        -- g.group_nickname,
        -- g.group_mobile_key,
        -- nm.nickname, -- Aha, the owner's nickname ... for convenience's sake in the App
        m.member_key,
        g.group_key,
        arg_group_message_type,
        arg_group_message_text
    FROM public.ckn_group g
    JOIN public.ckn_member m ON m.member_mobile_key = arg_member_mobile_key
    JOIN public.ckn_member om ON om.member_mobile_key = g.group_mobile_key
    -- JOIN public.ckn_member_nickname nm ON nm.member_key = om.member_key
    WHERE g.group_cooked_name = arg_group_cooked_name;

    RETURN;
END;
$$;


CREATE FUNCTION public.ckn_get_group_message(
    arg_mobile_key public.mobile_key_t -- Obviously, the caller's strong tie
)
RETURNS TABLE (
    group_message_key INT, -- Is this important???
    member_mobile_key public.mobile_key_t,              -- Nope, not from gm table
    -- member_cooked_email public.email_t,
    group_cooked_name public.name_t,                    -- Nope, not from gm table
    group_nickname public.name_t,                       -- Nope, not from gm table
    group_mobile_key public.mobile_key_t,               -- Nope, not from gm table
    member_nickname public.name_t,                      -- For convenience's sake in App
    owner_nickname public.name_t,
    group_message_type public.group_message_type_t,
    group_message_text public.group_message_text_t,
    group_message_timestamp TIMESTAMP WITH TIME ZONE,
    message_update_timestamp TIMESTAMP WITH TIME ZONE,
    new_messages_posted BOOLEAN
) AS $$
DECLARE
    last_update TIMESTAMP WITH TIME ZONE;
    local_owner_name public.name_t;
BEGIN
    -- Extract the current message_update_timestamp before updating
    SELECT m.message_update_timestamp INTO last_update
    FROM public.ckn_member m
    WHERE m.member_mobile_key = arg_mobile_key;

    -- Cleanup stale messages before returning results
    DELETE FROM public.ckn_group_message gmsg
    WHERE gmsg.group_message_timestamp < NOW() - INTERVAL '24 hours';

    -- Update the timestamp using the new function
    -- PERFORM public.ckn_update_group_message_timestamp(arg_mobile_key);

    local_owner_name := 'FAKE NAME';

    RETURN QUERY
    SELECT 
        gmsg.group_message_key,
        m.member_mobile_key,
        g.group_cooked_name,
        g.group_nickname,
        g.group_mobile_key,
        nm.nickname AS member_nickname,
        onm.nickname AS owner_nickname,
        gmsg.group_message_type,
        gmsg.group_message_text,
        gmsg.group_message_timestamp,
        last_update AS message_update_timestamp,
        gmsg.group_message_timestamp > last_update AS new_messages_posted
    FROM public.ckn_group_message gmsg
    JOIN public.ckn_member m ON gmsg.member_key = m.member_key
    JOIN public.ckn_group g ON gmsg.group_key = g.group_key
    JOIN public.ckn_member om ON g.group_mobile_key = om.member_mobile_key -- locking in on the owner
    JOIN public.ckn_member_nickname onm ON onm.member_key = om.member_key -- locking in on the owner
    JOIN public.ckn_member_nickname nm ON nm.member_key = m.member_key -- locking in on the member doing the asking
    WHERE 
        g.group_key IN (    -- All group keys associated with the FROM WHOM
            SELECT g_inner.group_key 
            FROM public.ckn_group g_inner
            JOIN public.ckn_group_member gm ON g_inner.group_key = gm.group_key
            JOIN public.ckn_member m_inner ON gm.member_key = m_inner.member_key
            WHERE m_inner.member_mobile_key = arg_mobile_key
        );
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION public.ckn_clear_group_message(
    arg_mobile_key public.mobile_key_t
)
RETURNS void AS $$
BEGIN
    DELETE FROM public.ckn_group_message
    WHERE member_key = (
        SELECT member_key
        FROM public.ckn_member
        WHERE member_mobile_key = arg_mobile_key
    );
END;
$$ LANGUAGE plpgsql;


-- ************************************************************************
-- ************************************************************************

    -- TEST ONLY. Do not expose these functions.

-- ************************************************************************
-- ************************************************************************

CREATE FUNCTION private.ckn_create_user(
  arg_mobile_key text,
  arg_password public.password_t
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  local_user_id uuid;
  local_encrypted_pw text;
  local_user_meta_data jsonb;
BEGIN
  -- Generate UUID for new user
  local_user_id := gen_random_uuid();

  -- Encrypt password
  local_encrypted_pw := crypt(arg_password, gen_salt('bf'));

  -- Build user meta data. Sub is the mobile key
  -- when Apple Authentication is used. So that
  -- handle_new_user works for both this fake
  -- user creation and the actual Apple Authentication
  -- I need to set sub == mobile_key
  local_user_meta_data := jsonb_build_object(
    'sub', arg_mobile_key,
    'first_login', 'initializing',
    'mobile_key', arg_mobile_key
  );

  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, 
    created_at, updated_at, confirmation_token, email_change, email_change_token_new, 
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', local_user_id, 'authenticated', 'authenticated', 
    arg_mobile_key, local_encrypted_pw, now(), now(), now(), '{"provider":"email","providers":["email"]}', 
    local_user_meta_data, now(), now(), '', '', '', ''
  );

  -- Insert into auth.identities
  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    local_user_id, local_user_id, local_user_id, 
    format('{"sub":"%s","email":"%s"}', local_user_id::text, arg_mobile_key)::jsonb, 
    'email', now(), now(), now()
  );

  -- Return the user ID
  RETURN local_user_id;
END;
$$;

CREATE FUNCTION private.ckn_create_user_apple(
  arg_mobile_key text,
  arg_email public.email_t,
  arg_password public.password_t
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  local_user_id uuid;
  local_encrypted_pw text;
  local_user_meta_data jsonb;
  local_custom_claims jsonb;
BEGIN
  -- Generate UUID for new user
  local_user_id := gen_random_uuid();

  -- Encrypt password
  local_encrypted_pw := crypt(arg_password, gen_salt('bf'));

  -- Build user meta data. Sub is the mobile key
  -- when Apple Authentication is used. So that
  -- handle_new_user works for both this fake
  -- user creation and the actual Apple Authentication
  -- I need to set sub == mobile_key
  local_custom_claims := jsonb_build_object(
        'auth_time', '1000000000'
  );
  local_user_meta_data := jsonb_build_object(
    'iss','https://appleid.apple.com',
    'sub', arg_mobile_key,
    'email', arg_email,
    'provider_id', arg_mobile_key,
    'custom_claims',local_custom_claims,
    'email_verified', true,
    'phone_verified', false,
    'mobile_key', arg_mobile_key,
    'first_login', 'initializing'
  );

  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data, 
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new, 
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    local_user_id,
    'authenticated',
    'authenticated',
    arg_email,
    NULL,
    now(),
    NULL,
    now(),
    '{"provider":"apple","providers":["apple"]}',
    local_user_meta_data,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- Insert into auth.identities
  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    local_user_id, local_user_id, arg_mobile_key, 
    format('{"iss":"%s","sub":"%s","email":"%s","provider_id":"%s","custom_claims":{"auth_time":%s},"email_verified":%s,"phone_verified":%s}', 'https://appleid.apple.com', arg_mobile_key::text, arg_email, arg_mobile_key, '1000000000', 'true', 'false')::jsonb, 
    'apple', now(), now(), now()
  );

  -- Return the user ID
  RETURN local_user_id;
END;
$$;


CREATE FUNCTION private.ckn_delete_user(
  arg_email text
)
 RETURNS BOOLEAN
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM auth.identities WHERE user_id = (
      SELECT id FROM auth.users WHERE email = arg_email
    );

    DELETE FROM auth.users WHERE email = arg_email;

    RETURN FOUND;
END;
$function$;

CREATE FUNCTION private.ckn_delete_user_by_mobile_key(
  arg_mobile_key public.mobile_key_t
)
 RETURNS BOOLEAN
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM auth.identities WHERE user_id = (
      SELECT id FROM auth.users WHERE raw_user_meta_data->>'mobile_key' = arg_mobile_key
    );

    DELETE FROM auth.users WHERE raw_user_meta_data->>'mobile_key' = arg_mobile_key;

    RETURN FOUND;
END;
$function$;


-- Add functions or types if needed
-- Example function to generate SHA-256 hash
-- CREATE FUNCTION public.ckn_generate_sha256(text) RETURNS TEXT AS $$
-- BEGIN
--   RETURN encode(digest($1, 'sha256'), 'hex');
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE FUNCTION public.ckn_generate_sha256(input_text TEXT) RETURNS TEXT AS $$
-- BEGIN
--   RETURN encode(digest(input_text, 'sha256'), 'hex');
-- END;
-- $$ LANGUAGE plpgsql;

CREATE FUNCTION public.ckn_generate_sha256(input_text TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN encode(extensions.digest((input_text::text)::bytea, 'sha256'::text), 'hex');
END;
$$ LANGUAGE plpgsql;

-- select  encode(extensions.digest(('HEY'::text)::bytea, 'sha1'), 'hex');;
-- see https://github.com/orgs/supabase/discussions/1096

CREATE FUNCTION private.ckn_do_delete_user(
    arg_email public.email_t
) 
RETURNS VOID 
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
DECLARE
    local_mobile_key public.mobile_key_t;
BEGIN
    local_mobile_key := public.ckn_generate_sha256(arg_email);

    PERFORM private.ckn_delete_user_by_mobile_key(local_mobile_key);
    PERFORM private.ckn_delete_user(arg_email);
END;
$$;

CREATE FUNCTION private.ckn_do_delete_user_apple(
    arg_mobile_key public.mobile_key_t,
    arg_email public.email_t
) 
RETURNS VOID 
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
BEGIN
    PERFORM private.ckn_delete_user_by_mobile_key(arg_mobile_key);
    PERFORM private.ckn_delete_user(arg_email);
END;
$$;


CREATE FUNCTION private.ckn_do_create_user(
    arg_email public.email_t,
    arg_password public.password_t,
    arg_nickname public.name_t 
) 
RETURNS VOID 
SECURITY INVOKER 
LANGUAGE plpgsql AS $$
DECLARE
    local_cooked_email public.email_t;
    local_mobile_key public.mobile_key_t;
BEGIN
    -- Compute the cooked email and mobile key
    local_cooked_email := public.ckn_generate_sha256(arg_email);
    local_mobile_key := public.ckn_generate_sha256(arg_email);

    -- Check if a row with the mobile key already exists
    IF EXISTS (
        SELECT 1 
        FROM public.ckn_member 
        WHERE member_mobile_key = local_mobile_key
    ) THEN
        -- Exit quietly
        RETURN;
    END IF;

    -- Perform the user creation and updates
    PERFORM private.ckn_create_user(local_mobile_key, arg_password);
    PERFORM public.ckn_update_member_cooked_email(local_cooked_email, local_mobile_key);
    PERFORM public.ckn_update_member_nickname(arg_nickname, local_mobile_key);
END;
$$;


-- CREATE FUNCTION private.ckn_do_create_user_apple(
--     arg_mobile_key public.mobile_key_t,
--     arg_email public.email_t,
--     arg_password public.password_t,
--     arg_nickname public.name_t 
-- ) 
-- RETURNS VOID 
-- SECURITY INVOKER 
-- LANGUAGE plpgsql AS $$
-- DECLARE
--     local_cooked_email public.email_t;
-- BEGIN
--     local_cooked_email := public.ckn_generate_sha256(arg_email);

--     PERFORM private.ckn_create_user_apple(arg_mobile_key, arg_email, arg_password);

--     PERFORM public.ckn_update_member_cooked_email(local_cooked_email, arg_mobile_key);
--     PERFORM public.ckn_update_member_nickname(arg_nickname, arg_mobile_key);
-- END;
-- $$;


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
GRANT EXECUTE ON FUNCTION public.ckn_get_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_status_a TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_status_b TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_status_c TO authenticated;
-- GRANT EXECUTE ON FUNCTION public.ckn_handle_new_user TO authenticated;
-- GRANT EXECUTE ON FUNCTION public.ckn_handle_new_user TO authenticator;
GRANT EXECUTE ON FUNCTION public.ckn_handle_user_update TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_group_member TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_member TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_group_message TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_add_group_message TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_group_message_timestamp TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_member_cooked_email TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_member_nickname TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_update_member_nickname_staging TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_insert_email_verification TO authenticated;

-- ******************************************************************************
-- ******************************************************************************

-- There are quite a few GRANTS that we need for supabase_auth_admin
-- These grants are inline with how the app interacts with Supabase
-- in order to login thru Apple Authentication. Normal logins with
-- email/password did not require this apparatus. In short, I changed
-- up how / when / what the triggers fire on updates (versus inserts)
-- to auth.users.

GRANT EXECUTE ON FUNCTION public.ckn_update_member_nickname TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.ckn_add_group TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.ckn_member_key_check TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.ckn_generate_sha256 TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION private.ckn_insert_test_user TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION private.ckn_delete_test_user TO supabase_auth_admin;

GRANT USAGE, SELECT ON SEQUENCE public.ckn_member_member_key_seq TO supabase_auth_admin;
GRANT USAGE, SELECT ON SEQUENCE public.ckn_member_nickname_member_nickname_key_seq TO supabase_auth_admin;
GRANT USAGE, SELECT ON SEQUENCE public.ckn_group_group_key_seq TO supabase_auth_admin;
GRANT USAGE, SELECT ON SEQUENCE public.ckn_group_member_group_member_key_seq TO supabase_auth_admin;
GRANT USAGE, SELECT ON SEQUENCE public.ckn_member_staging_member_key_seq TO supabase_auth_admin;
GRANT USAGE, SELECT ON SEQUENCE public.ckn_member_cooked_email_member_cooked_email_key_seq TO supabase_auth_admin;

GRANT USAGE ON SCHEMA extensions TO supabase_auth_admin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA extensions TO supabase_auth_admin;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO supabase_auth_admin;

GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_member TO supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_member_nickname TO supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_group TO supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_group_member TO supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_member_staging TO supabase_auth_admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.ckn_member_cooked_email TO supabase_auth_admin;

-- ******************************************************************************
-- ******************************************************************************


GRANT EXECUTE ON FUNCTION public.ckn_get_nickname TO authenticated;

GRANT EXECUTE ON FUNCTION public.ckn_group_member_key_check TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_member_mobile_key_check TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_member_key_check TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_member_staging_key_check TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_group_key_check TO authenticated;

GRANT EXECUTE ON FUNCTION public.ckn_get_all_table_sizes TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_table_sizes TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_db_size TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_total_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_total_registered_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_total_nonregistered_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_get_total_groups TO authenticated;
GRANT EXECUTE ON FUNCTION public.ckn_clear_group_message TO authenticated;

GRANT EXECUTE ON FUNCTION private.ckn_create_user TO test_role_nologin;
GRANT EXECUTE ON FUNCTION private.ckn_create_user_apple TO test_role_nologin;
GRANT EXECUTE ON FUNCTION private.ckn_delete_user TO test_role_nologin;
GRANT EXECUTE ON FUNCTION public.ckn_generate_sha256 TO test_role_nologin;
GRANT EXECUTE ON FUNCTION private.ckn_do_create_user TO test_role_nologin;
-- GRANT EXECUTE ON FUNCTION private.ckn_do_create_user_apple TO test_role_nologin;
GRANT EXECUTE ON FUNCTION private.ckn_do_delete_user TO test_role_nologin;
GRANT EXECUTE ON FUNCTION private.ckn_do_delete_user_apple TO test_role_nologin;

-- ************************************************************************
-- ************************************************************************

    -- Insert to our remaining tables.

-- ************************************************************************
-- ************************************************************************

-- select * from private.ckn_do_delete_user('test+admin@ckn.social');
-- select * from private.ckn_do_delete_user('test+bob@ckn.social');

-- select * from private.ckn_do_delete_user('test+pat2@ckn.social');

-- select * from private.ckn_do_delete_user('apple+pat@ckn.social');
-- select * from private.ckn_do_delete_user('apple+steve@ckn.social');
-- select * from private.ckn_do_delete_user('apple+katie@ckn.social');
-- select * from private.ckn_do_delete_user('apple+sara@ckn.social');

select * from private.ckn_do_delete_user_apple('001166.3c6d479d100848d18ac19f8721454447.1924', 'apple+pat@ckn.social');
select * from private.ckn_do_delete_user_apple('001482.c76d8f85521642d08388e00e9f5ff98c.1941', 'apple+steve@ckn.social');
select * from private.ckn_do_delete_user_apple('002033.cbc404105d1848e9aee4d79a36a76365.1944', 'apple+katie@ckn.social');
select * from private.ckn_do_delete_user_apple('000466.c45ad6ca95c141159dc4f6bf725ef0bd.2125', 'apple+sara@ckn.social');

-- select * from private.ckn_do_delete_user('test+pat@ckn.social');
-- select * from private.ckn_do_delete_user('test+steve@ckn.social');
-- select * from private.ckn_do_delete_user('test+sara@ckn.social');
-- select * from private.ckn_do_delete_user('test+katie@ckn.social');

-- select * from private.ckn_do_delete_user('test+jim@ckn.social');
-- select * from private.ckn_do_delete_user('test+susan@ckn.social');
-- select * from private.ckn_do_delete_user('test+james@ckn.social');
-- select * from private.ckn_do_delete_user('test+jennifer@ckn.social');

-- select * from private.ckn_do_delete_user('test+malcolm@ckn.social');
-- select * from private.ckn_do_delete_user('test+cheryl@ckn.social');
-- select * from private.ckn_do_delete_user('test+kristen@ckn.social');
-- select * from private.ckn_do_delete_user('test+derek@ckn.social');
-- select * from private.ckn_do_delete_user('test+stuart@ckn.social');
-- select * from private.ckn_do_delete_user('test+owen@ckn.social');

-- select * from private.ckn_do_delete_user('video+davis@ckn.social');
-- select * from private.ckn_do_delete_user('video+mohammad@ckn.social');
-- select * from private.ckn_do_delete_user('video+andrew@ckn.social');
-- select * from private.ckn_do_delete_user('video+lisa@ckn.social');

-- select * from private.ckn_do_create_user('test+pat@ckn.social', 'patpatX', 'PatR');
-- select * from private.ckn_do_create_user('test+steve@ckn.social', 'stevesteve', 'SteveR');
-- select * from private.ckn_do_create_user('test+katie@ckn.social', 'katiekatie', 'KatieR');
-- select * from private.ckn_do_create_user('test+sara@ckn.social', 'sarasara', 'SaraR');

-- select * from private.ckn_do_create_user('test+pat@ckn.social', 'ckHjWgfC-4rr9Hbk', 'PatR');
-- select * from private.ckn_do_create_user('test+steve@ckn.social', 'gHk2yiPvqeFA@mh_', 'SteveR');
-- select * from private.ckn_do_create_user('test+sara@ckn.social', '3-mg@t!AUoVhW!_p', 'SaraR');
-- select * from private.ckn_do_create_user('test+katie@ckn.social', 'J4Aan-WdG9xtLqQs', 'KatieR');

-- select * from private.ckn_do_create_user_apple('001166.3c6d479d100848d18ac19f8721454447.1924', 'apple+pat@ckn.social', 'sarasara', 'Apple+PatR');
-- select * from private.ckn_do_create_user_apple('001482.c76d8f85521642d08388e00e9f5ff98c.1941', 'apple+steve@ckn.social', 'sarasara', 'Apple+SteveR');
-- select * from private.ckn_do_create_user_apple('002033.cbc404105d1848e9aee4d79a36a76365.1944', 'apple+katie@ckn.social', 'sarasara', 'Apple+KatieR');
-- select * from private.ckn_do_create_user_apple('000466.c45ad6ca95c141159dc4f6bf725ef0bd.2125', 'apple+sara@ckn.social', 'sarasara', 'Apple+SaraR');

-- select * from private.ckn_do_create_user('video+davis@ckn.social', 'davisdavis', 'DavisT');
-- select * from private.ckn_do_create_user('video+mohammad@ckn.social', 'mohammadmohammad', 'Mohammad');
-- select * from private.ckn_do_create_user('video+andrew@ckn.social', 'andrewandrew', 'AndrewM');
-- select * from private.ckn_do_create_user('video+lisa@ckn.social', 'lisalisa', 'lisaW');

-- select * from private.ckn_do_create_user('test+jim@ckn.social', 'jimjim', 'JimR');
-- select * from private.ckn_do_create_user('test+susan@ckn.social', 'susansusan', 'SusanM');
-- select * from private.ckn_do_create_user('test+james@ckn.social', 'jamesjames', 'JamesR');
-- select * from private.ckn_do_create_user('test+jennifer@ckn.social', 'jenniferjennifer', 'JenniferR');

-- select * from private.ckn_do_create_user('test+malcolm@ckn.social', 'malcolmmalcolm', 'MalcolmR');
-- select * from private.ckn_do_create_user('test+cheryl@ckn.social', 'cherylcheryl', 'CherylR');
-- select * from private.ckn_do_create_user('test+kristen@ckn.social', 'kristenkristen', 'KristenK');
-- select * from private.ckn_do_create_user('test+derek@ckn.social', 'derekderek', 'DerekK');
-- select * from private.ckn_do_create_user('test+stuart@ckn.social', 'stuartstuart', 'StuartR');
-- select * from private.ckn_do_create_user('test+owen@ckn.social', 'owenowen', 'OwenR');

-- SELECT private.ckn_insert_test_user('apple+pat@ckn.social', 'xxx', 'apple', 'PatR', '', '001166.3c6d479d100848d18ac19f8721454447.1924');
-- SELECT private.ckn_insert_test_user('apple+steve@ckn.social', 'xxx', 'apple', 'SteveR', '', '001482.c76d8f85521642d08388e00e9f5ff98c.1941');
-- SELECT private.ckn_insert_test_user('apple+sara@ckn.social', 'xxx', 'apple', 'SaraR', '', '000466.c45ad6ca95c141159dc4f6bf725ef0bd.2125');
-- SELECT private.ckn_insert_test_user('apple+katie@ckn.social', 'xxx', 'apple', 'KatieR', '', '002033.cbc404105d1848e9aee4d79a36a76365.1944');

-- SELECT private.ckn_insert_test_user('test+malcolm@ckn.social', 'malcolmmalcolm', 'email', 'MalcolmR', '', 'f479ced63a3b832861017e9374cd905c29def22af73056dc0d03a42b3c3c435a');
-- SELECT private.ckn_insert_test_user('test+cheryl@ckn.social', 'cherylcheryl', 'email', 'CherylR', '', 'c28b699230658a38bad1a6eeabf22fa9b6a858f4a80bd995fb83f3667ccfba92');