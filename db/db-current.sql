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
-- Data for Name: ckn_nouns; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (1, 'mesa', 'mesas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (2, 'silla', 'sillas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (3, 'camarero', 'camareros', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (4, 'menú', 'menús', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (5, 'comida', 'comidas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (6, 'bebida', 'bebidas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (7, 'plato', 'platos', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (8, 'tenedor', 'tenedores', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (9, 'cuchillo', 'cuchillos', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (10, 'cuchara', 'cucharas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (11, 'servilleta', 'servilletas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (12, 'cuenta', 'cuentas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (13, 'vaso', 'vasos', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (14, 'copa', 'copas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (15, 'reserva', 'reservas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (16, 'cliente', 'clientes', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (17, 'camarera', 'camareras', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (18, 'postre', 'postres', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (19, 'entrada', 'entradas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (20, 'vino', 'vinos', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (21, 'agua', 'aguas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (22, 'cerveza', 'cervezas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (23, 'restaurante', 'restaurantes', 'M');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (24, 'propina', 'propinas', 'F');
INSERT INTO public.ckn_nouns (noun_key, noun_singular, noun_plural, noun_gender) VALUES (25, 'arroz', 'arroces', 'M');


--
-- Data for Name: ckn_tts_cache; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ckn_verbs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (1, 'querer', 'quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (2, 'tener', 'tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (3, 'pedir', 'pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (4, 'servir', 'sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (5, 'comer', 'como', 'comes', 'come', 'comemos', 'coméis', 'comen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (6, 'beber', 'bebo', 'bebes', 'bebe', 'bebemos', 'bebéis', 'beben');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (7, 'traer', 'traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (8, 'venir', 'vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (9, 'ir', 'voy', 'vas', 'va', 'vamos', 'vais', 'van');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (10, 'gustar', 'me gusta', 'te gusta', 'le gusta', 'nos gusta', 'os gusta', 'les gusta');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (11, 'necesitar', 'necesito', 'necesitas', 'necesita', 'necesitamos', 'necesitáis', 'necesitan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (12, 'esperar', 'espero', 'esperas', 'espera', 'esperamos', 'esperáis', 'esperan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (13, 'reservar', 'reservo', 'reservas', 'reserva', 'reservamos', 'reserváis', 'reservan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (14, 'abrir', 'abro', 'abres', 'abre', 'abrimos', 'abrís', 'abren');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (15, 'cerrar', 'cierro', 'cierras', 'cierra', 'cerramos', 'cerráis', 'cierran');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (16, 'recomendar', 'recomiendo', 'recomiendas', 'recomienda', 'recomendamos', 'recomendáis', 'recomiendan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (17, 'probar', 'pruebo', 'pruebas', 'prueba', 'probamos', 'probáis', 'prueban');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (18, 'pagar', 'pago', 'pagas', 'paga', 'pagamos', 'pagáis', 'pagan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (19, 'dejar', 'dejo', 'dejas', 'deja', 'dejamos', 'dejáis', 'dejan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (20, 'elegir', 'elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (22, 'atender', 'atiendo', 'atiendes', 'atiende', 'atendemos', 'atendéis', 'atienden');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (23, 'cocinar', 'cocino', 'cocinas', 'cocina', 'cocinamos', 'cocináis', 'cocinan');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (24, 'decir', 'digo', 'dices', 'dice', 'decimos', 'decís', 'dicen');
INSERT INTO public.ckn_verbs (verb_key, verb_infinitive, verb_yo, verb_tu, verb_el_ella_usted, verb_nosotros, verb_vosotros, verb_ellos_ellas_ustedes) VALUES (25, 'volver', 'vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven');


--
-- Name: ckn_nouns_noun_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_nouns_noun_key_seq', 25, true);


--
-- Name: ckn_tts_cache_tts_cache_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_tts_cache_tts_cache_key_seq', 1, false);


--
-- Name: ckn_verbs_verb_key_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ckn_verbs_verb_key_seq', 25, true);


--
-- PostgreSQL database dump complete
--

