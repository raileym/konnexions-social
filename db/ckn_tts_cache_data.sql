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

INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (69, 'b23bf3afd09d43e05343d23b2424af1302268d1994d3a35c57e99ae2d4c13990', 'pasan', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-09 13:40:10.127727+00', '2025-06-09 13:40:10.127727+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (63, 'c4c687aab19ea06c6fd0531a8063b391b027d25885a97838dba645fb87501569', 'tiene su identificación y boleto listos?', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-09 13:39:08.405229+00', '2025-06-09 13:39:08.405229+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (65, '4a9952e355e6085e3898490e0306fb01d1db9ee50997efae07960cf4a1b8b331', 'sí, aquí tiene mi pasaporte y la confirmación de vuelo.', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-09 13:39:14.021028+00', '2025-06-09 13:39:14.021028+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (67, 'e1931aa37771ea3c7495def507ebd43ce418c6ae7ecf714be17136fbff39531b', 'perfecto, por favor coloque su equipaje de mano en el escáner.', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-09 13:39:21.127311+00', '2025-06-09 13:39:21.127311+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (59, 'eaba7f65436463eb5f756ce51b3c0f429957249caf18b5dfbbb27ab3f2aaec8b', 'en qué puedo ayudarte?', 'es-US-Wavenet-B', 'es-US', 4, '2025-06-09 13:39:47.108731+00', '2025-06-09 13:32:21.950499+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (61, 'a8dabcdb56513335d8835c2ed1d21e07bba0d8ca31cdbf264d670cd1030af280', 'hola, soy el gerente del hotel.', 'es-US-Wavenet-B', 'es-US', 4, '2025-06-09 13:39:47.665896+00', '2025-06-09 13:32:23.797419+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (43, '2fd1ae8c2f064fc9519bf809bd1641727eb4fd8366bbaf8d0646252ef3bb2bb5', 'sí, por favor.', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-09 12:37:15.187905+00', '2025-06-09 12:37:15.187905+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (1, 'a80897215bfeca30c04e7796c593f66024daf5a1d18107671fd6f759cfa8ddd8', 'hola!', 'es-US-Wavenet-B', 'es-US', 19, '2025-06-09 13:48:31.809481+00', '2025-06-09 12:37:03.099332+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (47, 'a0342209fbe1cf847dd4b6040408d35eaedc392f6d223842e97aa5cdf4357270', 'muchas gracias.', 'es-US-Wavenet-B', 'es-US', 2, '2025-06-09 12:37:16.359041+00', '2025-06-09 12:37:16.359041+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (5, 'a03678c8ceeb351419a24b3bc1a747a3e42e7de8164e9a898ee4657c6f898a06', 'tienen una mesa disponible para esta noche?', 'es-US-Wavenet-B', 'es-US', 17, '2025-06-09 13:48:32.855697+00', '2025-06-09 12:37:04.653168+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (7, 'ba2353695bedfac7ca1427be8187ea9faff827d0ecf94076455d050c37966cc9', 'sí, tenemos mesas disponibles.', 'es-US-Wavenet-A', 'es-US', 16, '2025-06-09 13:48:34.453215+00', '2025-06-09 12:37:05.65119+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (51, '55f269e63385926ccd6af5f314abcbe2fca27c97ef22c0adcbbf4246ab6793b6', 'de nada!', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-09 12:37:17.228844+00', '2025-06-09 12:37:17.228844+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (55, 'e9c9eeef35b97adbe896946d6508e02df89767dfb9b24dd22af191339e06f6eb', 'que disfruten su cena.', 'es-US-Wavenet-A', 'es-US', 2, '2025-06-09 12:37:18.012148+00', '2025-06-09 12:37:18.012148+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (11, '19815ba52a356d7d68cffa14046a56b12c090b52e8c16347c91570425b073ef5', 'para cuántas personas sería la reserva?', 'es-US-Wavenet-A', 'es-US', 4, '2025-06-09 12:39:29.905986+00', '2025-06-09 12:37:06.518685+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (15, 'b90f1b8d36f732e362a198377208135351e53f6766283fa9dee00b22caaaf4b2', 'para dos personas, por favor.', 'es-US-Wavenet-B', 'es-US', 4, '2025-06-09 12:39:30.218882+00', '2025-06-09 12:37:07.448905+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (19, 'bd18e2ab19e3ae37fe626815bd880ad06029c5790decb9882d553c614f55baec', 'perfecto, por aquí.', 'es-US-Wavenet-A', 'es-US', 4, '2025-06-09 12:39:30.533567+00', '2025-06-09 12:37:08.264006+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (23, '11d021a251abaf73117e14fed5d7edf0c67d29d4f3988a1d02fa83ae96cf6d26', 'prefieren una mesa cerca de la ventana o en el centro del restaurante?', 'es-US-Wavenet-A', 'es-US', 4, '2025-06-09 12:39:30.859007+00', '2025-06-09 12:37:09.236835+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (27, '4a7ce42d2eab9be614708dc4aef4e06a2f7549f2ccbecf465df7f929bf8ab759', 'gracias!', 'es-US-Wavenet-B', 'es-US', 4, '2025-06-09 12:39:31.233054+00', '2025-06-09 12:37:09.999526+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (31, '8221e1eed9f5f19595e0403bdedf6242cee8287b50ab5c26ef12000ec87fd038', 'por supuesto, síganme.', 'es-US-Wavenet-A', 'es-US', 4, '2025-06-09 12:39:31.559827+00', '2025-06-09 12:37:10.852547+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (35, '42e65b9979c87ce2830504ef1df9ea960668ff624e00b76bc073ee34995428b8', 'aquí tienen su mesa.', 'es-US-Wavenet-A', 'es-US', 4, '2025-06-09 12:39:31.841484+00', '2025-06-09 12:37:12.606297+00');
INSERT INTO public.ckn_tts_cache (tts_cache_key, tts_cache_signature, tts_cache_text, tts_cache_voice, tts_cache_language, tts_cache_usage_count, tts_cache_last_used, tts_cache_created) VALUES (39, 'bcad3dea28bce8f793b9fed213641589adb7b82321a915b9ca00eec18961447d', 'les gustaría ver el menú?', 'es-US-Wavenet-A', 'es-US', 3, '2025-06-09 12:39:31.907299+00', '2025-06-09 12:37:14.172436+00');


--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_tts_cache_tts_cache_key_seq', 70, true);


--
-- PostgreSQL database dump complete
--

