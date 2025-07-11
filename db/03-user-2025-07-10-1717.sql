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
-- Data for Name: ckn_email_code; Type: TABLE DATA; Schema: private; Owner: postgres
--

INSERT INTO private.ckn_email_code (email_code_key, email_code_cooked_email, email_code_code, email_code_created_at, email_code_expires_at, email_code_verified) VALUES ('7c734e8a-c93b-4521-a83a-8fc9638aae54', 'c6fa088f187aa9f401d7d57f3b1bf5fd58bad6356ec2cc0c787765f365a8f237', '470054', '2025-07-10 21:07:34.196141+00', '2025-07-10 21:22:24.776+00', true);


--
-- PostgreSQL database dump complete
--

