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
-- Data for Name: ckn_tts_cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (1, 'a80897215bfeca30c04e7796c593f66024daf5a1d18107671fd6f759cfa8ddd8', 'hola!', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-10 20:48:09.98827+00', '2025-06-10 20:48:09.98827+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (5, 'a03678c8ceeb351419a24b3bc1a747a3e42e7de8164e9a898ee4657c6f898a06', 'tienen una mesa disponible para esta noche?', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-10 20:48:11.397325+00', '2025-06-10 20:48:11.397325+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (9, 'ba2353695bedfac7ca1427be8187ea9faff827d0ecf94076455d050c37966cc9', 'sí, tenemos mesas disponibles.', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-10 20:48:12.359059+00', '2025-06-10 20:48:12.359059+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (13, '00f3dfdbbcca5eb06db65a7ff41bc8272f49a3e4a0e031b6f79b93ecf8f71701', 'qué plato me recomiendas?', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-10 20:55:32.344828+00', '2025-06-10 20:55:32.344828+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (17, '0170cf2389dd0d6236278e65b57517b1c7272a352f9442a4a45abb02960bcb52', 'te recomiendo el ceviche peruano, es muy rico.', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-10 20:55:33.550291+00', '2025-06-10 20:55:33.550291+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (21, '9104e1bb53f17d03fe9a801b153fc6c3263633c4ea70417d582d68a26cf03ecf', 'perfecto, entonces quiero eso por favor.', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-10 20:55:34.570309+00', '2025-06-10 20:55:34.570309+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (25, '6017b4c6562855aa38421850e3587bfe63d14d8e2f853b2df9789fbc313f3232', 'cómo estás?', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-10 21:00:33.916035+00', '2025-06-10 21:00:33.916035+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (29, '6b42e5f6ba9d147391aaf12fd6716b39ca5f89fe263711d733fb60caa069fcc3', 'bien, gracias.', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-10 21:00:35.122779+00', '2025-06-10 21:00:35.122779+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (33, '67ca0e5857eeb2f8bc956f0f3fa674ca0014be9d847c0a272d354c5f6e97b4e4', 'en cuántas personas es la reservación?', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-10 21:00:36.241446+00', '2025-06-10 21:00:36.241446+00');


--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_tts_cache_tts_cache_key_seq', 36, true);


--
-- PostgreSQL database dump complete
--

