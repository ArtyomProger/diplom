--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.6

-- Started on 2020-01-11 20:54:39

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

DROP DATABASE postgres;
--
-- TOC entry 2896 (class 1262 OID 13012)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 2896
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 1 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 207 (class 1259 OID 24671)
-- Name: Categories_Efficiency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories_Efficiency" (
    "CategoryId" numeric(35,0) NOT NULL,
    "FactorId" numeric(35,0) NOT NULL,
    "Title" character varying(200) NOT NULL,
    "CategoryScore" numeric(35,0)
);


ALTER TABLE public."Categories_Efficiency" OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 24605)
-- Name: Categories_Inherent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories_Inherent" (
    "CategoryId" numeric(35,0) NOT NULL,
    "FactorId" numeric(35,0) NOT NULL,
    "Title" character varying(200) NOT NULL,
    "CategoryScore" character varying(200) NOT NULL
);


ALTER TABLE public."Categories_Inherent" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24635)
-- Name: Customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customers" (
    "CustomerId" numeric(35,0) NOT NULL,
    "Type" character varying(200) NOT NULL,
    "INN" numeric(35,0) NOT NULL
);


ALTER TABLE public."Customers" OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24595)
-- Name: EfficiencyFactors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EfficiencyFactors" (
    "Factor_Ef_Id" numeric(35,0) NOT NULL,
    "Title" character varying(200) NOT NULL,
    "FactorScore" numeric(35,0) NOT NULL,
    "FactorWeight" real NOT NULL
);


ALTER TABLE public."EfficiencyFactors" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 24610)
-- Name: InherentFactors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InherentFactors" (
    "Factor_Inh_Id" numeric(35,0) NOT NULL,
    "Title" character varying(200) NOT NULL,
    "FactorScore" character varying(100) NOT NULL,
    "FactorWeight" real NOT NULL
);


ALTER TABLE public."InherentFactors" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24650)
-- Name: LegalPersons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LegalPersons" (
    "InnLegals" numeric(35,0) NOT NULL,
    "CustomerId" numeric(35,0) NOT NULL,
    "Blacklistid" numeric(35,0) NOT NULL,
    "Short name" character varying(200) NOT NULL,
    "Full name" character varying(200) NOT NULL,
    "Address" character varying(200) NOT NULL,
    "KPP" numeric(100,0) NOT NULL,
    "BIK" numeric(100,0) NOT NULL,
    "Р/C" numeric(100,0) NOT NULL,
    "K/C" numeric(100,0) NOT NULL,
    "OKPO" numeric(100,0) NOT NULL,
    "OKATO" numeric(100,0) NOT NULL,
    "OKBED" character varying(200) NOT NULL,
    "OGRN" character varying(200) NOT NULL,
    "CEO" character varying(200) NOT NULL
);


ALTER TABLE public."LegalPersons" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24640)
-- Name: NaturalPersons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NaturalPersons" (
    "InnNaturals" numeric(35,0) NOT NULL,
    "CustomerId" numeric(35,0) NOT NULL,
    "ListId" numeric(35,0),
    "First name" character varying(200) NOT NULL,
    "Middle name" character varying(200) NOT NULL,
    "Last name" character varying(200) NOT NULL,
    "Date of birth" date NOT NULL,
    "Address" character varying(200) NOT NULL,
    "Citizenship" character varying(200) NOT NULL,
    "Passport" character varying(200) NOT NULL
);


ALTER TABLE public."NaturalPersons" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24655)
-- Name: SanctionListLegals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SanctionListLegals" (
    "Blacklistid" numeric(35,0) NOT NULL,
    "Type" character varying(200) NOT NULL,
    "Short name" character varying(200) NOT NULL,
    "Full name" character varying(200) NOT NULL,
    "Address" character varying(200) NOT NULL,
    "KPP" numeric(35,0) NOT NULL,
    "BIK" numeric(50,0) NOT NULL,
    "Р/C" numeric(50,0) NOT NULL,
    "K/C" numeric(50,0) NOT NULL,
    "OKPO" numeric(50,0) NOT NULL,
    "OKATO" numeric(50,0) NOT NULL,
    "OKBED" character varying(200) NOT NULL,
    "OGRN" numeric(50,0) NOT NULL,
    "CEO" character varying(200) NOT NULL
);


ALTER TABLE public."SanctionListLegals" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24645)
-- Name: SanctionListNatural; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SanctionListNatural" (
    "ListId" numeric(35,0) NOT NULL,
    "Type" character varying(200) NOT NULL,
    "First name" character varying(200) NOT NULL,
    "Middle name" character varying(200) NOT NULL,
    "Last name" character varying(200) NOT NULL,
    "Citizenship" character varying(200) NOT NULL,
    "Passport" character varying(200) NOT NULL,
    "Address" character varying(200) NOT NULL,
    "Date of birth" character varying(200) NOT NULL
);


ALTER TABLE public."SanctionListNatural" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 24625)
-- Name: TransactionRisk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TransactionRisk" (
    "TransactionRiskId" numeric(35,0) NOT NULL,
    "TransactionId" numeric(35,0) NOT NULL,
    "Inherent Level" character varying(200) NOT NULL,
    "Efficiency Level" numeric(35,0) NOT NULL,
    "MLRISK" character varying(200)
);


ALTER TABLE public."TransactionRisk" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 24630)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    "TransactionId" numeric(35,0) NOT NULL,
    "CustomerId" numeric(35,0) NOT NULL,
    "Type" character varying(200) NOT NULL,
    "Volume" numeric(35,0) NOT NULL,
    "InnSender" numeric(35,0) NOT NULL,
    "InnReceiver" numeric(35,0) NOT NULL,
    "Status" character varying(200) NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 2890 (class 0 OID 24671)
-- Dependencies: 207
-- Data for Name: Categories_Efficiency; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (1, 1, 'Идентификация клиента', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (2, 1, 'Определение типа действий', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (3, 2, 'Проверка действий клиента', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (4, 2, 'Рассмотрение результатов проверок', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (5, 3, 'Осуществление пересмотра', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (6, 3, 'Наличие утверждённых процедур', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (7, 4, 'Определение внешних и внутренних риск-факторов', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (8, 4, 'Оценка на локальном/глобальном уровне', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (9, 5, 'Наличие достаточных полномочий', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (10, 5, 'Наличие достаточных ресурсов', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (11, 6, 'Ведение отчётности', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (12, 6, 'Предоставление отчётности', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (13, 7, 'Соблюдение сроков хранения', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (14, 7, 'Надлежащее хранение', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (15, 8, 'Проверка клиентов на наличие в санкционных листах', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (16, 8, 'Наличие уполномоченного сотрудника', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (17, 9, 'Направление сообщений', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (18, 9, 'Блокирование подозрительных операций', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (19, 10, 'Проведение специальной подготовки', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (20, 10, 'Наличие документации об обучении', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (21, 11, 'Актуализация риск-аппетита ', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (22, 11, 'Актуальные результаты внутреннего аудита', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (23, 12, 'Использование специального ПО', NULL);
INSERT INTO public."Categories_Efficiency" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (24, 12, 'Наличие каналов информирования по вопросам ПОД/ФТ', NULL);


--
-- TOC entry 2881 (class 0 OID 24605)
-- Dependencies: 198
-- Data for Name: Categories_Inherent; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (1, 1, 'Тип клиента', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (2, 1, 'Отрасль', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (3, 1, 'Вид деятельности', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (4, 1, 'Направление работы', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (5, 1, 'Проф. принадлежность. ФЛ', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (6, 1, 'Длит-ть взаимоотношений', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (7, 2, 'Тип продуктов и услуг', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (8, 2, 'Тип транзакций', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (9, 2, 'Статус активности использования счёта', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (10, 2, 'Обороты средств по счетам', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (11, 2, 'Размер остатка денежных средств на счетах', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (12, 3, 'Местоположение контрагента', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (13, 3, 'Местонахождение клиента', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (14, 4, 'Тип открытия счёта', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (15, 4, 'Тип обслуживания счёта', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (16, 5, 'Стабильность клиентской базы', 'Умеренный');
INSERT INTO public."Categories_Inherent" ("CategoryId", "FactorId", "Title", "CategoryScore") VALUES (17, 5, 'Ожидаемый рост доходов', 'Умеренный');


--
-- TOC entry 2885 (class 0 OID 24635)
-- Dependencies: 202
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Customers" ("CustomerId", "Type", "INN") VALUES (1, 'Физическое лицо', 526317984689);
INSERT INTO public."Customers" ("CustomerId", "Type", "INN") VALUES (2, 'Юридическое лицо', 7736050003);
INSERT INTO public."Customers" ("CustomerId", "Type", "INN") VALUES (3, 'Юридическое лицо', 7707625521);


--
-- TOC entry 2880 (class 0 OID 24595)
-- Dependencies: 197
-- Data for Name: EfficiencyFactors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (1, '"Знай своего клиента"', 90, 0.200000003);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (2, 'Мониторинг и контроль', 95, 0.200000003);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (3, 'Принципы и процедуры', 70, 0.100000001);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (4, 'Иные оценки рисков', 98, 0.100000001);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (5, 'Корпортивное управление в сфере ПОД', 95, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (6, 'Управленческая информация и отчётность', 95, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (7, 'Хранение данных', 70, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (8, 'Соблюдение законодательства о ПОД', 85, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (9, 'Выявление подозрительных операций', 95, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (10, 'Обучение', 75, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (11, 'Независимое тестирование и надзор', 75, 0.0500000007);
INSERT INTO public."EfficiencyFactors" ("Factor_Ef_Id", "Title", "FactorScore", "FactorWeight") VALUES (12, 'Иные инструменты контроля', 60, 0.0500000007);


--
-- TOC entry 2882 (class 0 OID 24610)
-- Dependencies: 199
-- Data for Name: InherentFactors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."InherentFactors" ("Factor_Inh_Id", "Title", "FactorScore", "FactorWeight") VALUES (1, 'Клиенты', 'Высокий', 0.300000012);
INSERT INTO public."InherentFactors" ("Factor_Inh_Id", "Title", "FactorScore", "FactorWeight") VALUES (2, 'Продукты и услуги', 'Средний', 0.25);
INSERT INTO public."InherentFactors" ("Factor_Inh_Id", "Title", "FactorScore", "FactorWeight") VALUES (3, 'Особенности географического присутствия', 'Средний', 0.25);
INSERT INTO public."InherentFactors" ("Factor_Inh_Id", "Title", "FactorScore", "FactorWeight") VALUES (4, 'Каналы реализации продуктов и услуг', 'Низкий', 0.075000003);
INSERT INTO public."InherentFactors" ("Factor_Inh_Id", "Title", "FactorScore", "FactorWeight") VALUES (5, 'Прочие факторы', 'Низкий', 0.125);


--
-- TOC entry 2888 (class 0 OID 24650)
-- Dependencies: 205
-- Data for Name: LegalPersons; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2886 (class 0 OID 24640)
-- Dependencies: 203
-- Data for Name: NaturalPersons; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2889 (class 0 OID 24655)
-- Dependencies: 206
-- Data for Name: SanctionListLegals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2887 (class 0 OID 24645)
-- Dependencies: 204
-- Data for Name: SanctionListNatural; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2883 (class 0 OID 24625)
-- Dependencies: 200
-- Data for Name: TransactionRisk; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (1, 1, 'Высокий', 96, 'Низкий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (2, 2, 'Умеренный', 96, 'Низкий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (3, 3, 'Высокий', 80, 'Высокий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (4, 4, 'Умеренный', 80, 'Высокий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (5, 5, 'Низкий', 96, 'Низкий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (6, 6, 'Низкий', 90, 'Умеренный');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (7, 7, 'Высокий', 92, 'Умеренный');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (8, 8, 'Умеренный', 80, 'Высокий');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (9, 9, 'Низкий', 90, 'Умеренный');
INSERT INTO public."TransactionRisk" ("TransactionRiskId", "TransactionId", "Inherent Level", "Efficiency Level", "MLRISK") VALUES (10, 10, 'Высокий', 94, 'Умеренный');


--
-- TOC entry 2884 (class 0 OID 24630)
-- Dependencies: 201
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (1, 1, 'Физическое лицо', 10000, 7719857936, 526317984689, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (2, 1, 'Физическое лицо', 60000, 526317984689, 7719857936, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (3, 1, 'Физическое лицо', 400000, 526317984689, 7729838035, 'Заморожена');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (4, 2, 'Юридическое лицо', 455000, 7736050003, 526317984689, 'Заморожена');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (5, 2, 'Юридическое лицо', 340000, 7719857936, 7736050003, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (6, 3, 'Юридическое лицо', 123000, 7707625521, 7719857934, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (7, 3, 'Юридическое лицо', 200000, 526317984689, 7707625521, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (8, 3, 'Юридическое лицо', 230000, 526317984634, 7707625521, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (9, 3, 'Юридическое лицо', 230000, 7719857936, 7707625521, 'Успешно');
INSERT INTO public.transactions ("TransactionId", "CustomerId", "Type", "Volume", "InnSender", "InnReceiver", "Status") VALUES (10, 3, 'Юридическое лицо', 234000, 7707625521, 7719857933, 'Успешно');


--
-- TOC entry 2749 (class 2606 OID 41370)
-- Name: Categories_Efficiency Categories_Efficiency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories_Efficiency"
    ADD CONSTRAINT "Categories_Efficiency_pkey" PRIMARY KEY ("CategoryId");


--
-- TOC entry 2731 (class 2606 OID 41383)
-- Name: Categories_Inherent Categories_Inherent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories_Inherent"
    ADD CONSTRAINT "Categories_Inherent_pkey" PRIMARY KEY ("CategoryId");


--
-- TOC entry 2739 (class 2606 OID 41401)
-- Name: Customers Customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers"
    ADD CONSTRAINT "Customers_pkey" PRIMARY KEY ("CustomerId");


--
-- TOC entry 2729 (class 2606 OID 41428)
-- Name: EfficiencyFactors EfficiencyFactors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EfficiencyFactors"
    ADD CONSTRAINT "EfficiencyFactors_pkey" PRIMARY KEY ("Factor_Ef_Id");


--
-- TOC entry 2733 (class 2606 OID 41446)
-- Name: InherentFactors InherentFactors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InherentFactors"
    ADD CONSTRAINT "InherentFactors_pkey" PRIMARY KEY ("Factor_Inh_Id");


--
-- TOC entry 2745 (class 2606 OID 41076)
-- Name: LegalPersons LegalPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LegalPersons"
    ADD CONSTRAINT "LegalPersons_pkey" PRIMARY KEY ("InnLegals");


--
-- TOC entry 2741 (class 2606 OID 41525)
-- Name: NaturalPersons NaturalPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NaturalPersons"
    ADD CONSTRAINT "NaturalPersons_pkey" PRIMARY KEY ("InnNaturals");


--
-- TOC entry 2747 (class 2606 OID 41598)
-- Name: SanctionListLegals SanctionListLegals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanctionListLegals"
    ADD CONSTRAINT "SanctionListLegals_pkey" PRIMARY KEY ("Blacklistid");


--
-- TOC entry 2743 (class 2606 OID 41583)
-- Name: SanctionListNatural SanctionListNatural_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SanctionListNatural"
    ADD CONSTRAINT "SanctionListNatural_pkey" PRIMARY KEY ("ListId");


--
-- TOC entry 2735 (class 2606 OID 41680)
-- Name: TransactionRisk TransactionRisk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionRisk"
    ADD CONSTRAINT "TransactionRisk_pkey" PRIMARY KEY ("TransactionRiskId");


--
-- TOC entry 2737 (class 2606 OID 41705)
-- Name: transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("TransactionId");


--
-- TOC entry 2750 (class 1259 OID 41376)
-- Name: FactorId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FactorId" ON public."Categories_Efficiency" USING btree ("FactorId");


--
-- TOC entry 2757 (class 2606 OID 41599)
-- Name: LegalPersons BlacklistId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LegalPersons"
    ADD CONSTRAINT "BlacklistId" FOREIGN KEY ("Blacklistid") REFERENCES public."SanctionListLegals"("Blacklistid") NOT VALID;


--
-- TOC entry 2758 (class 2606 OID 41429)
-- Name: Categories_Efficiency Categories_Efficiency_FactorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories_Efficiency"
    ADD CONSTRAINT "Categories_Efficiency_FactorId_fkey" FOREIGN KEY ("FactorId") REFERENCES public."EfficiencyFactors"("Factor_Ef_Id") NOT VALID;


--
-- TOC entry 2756 (class 2606 OID 41514)
-- Name: LegalPersons CustomerId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LegalPersons"
    ADD CONSTRAINT "CustomerId" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"("CustomerId") NOT VALID;


--
-- TOC entry 2754 (class 2606 OID 41547)
-- Name: NaturalPersons CustomerId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NaturalPersons"
    ADD CONSTRAINT "CustomerId" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"("CustomerId") NOT VALID;


--
-- TOC entry 2751 (class 2606 OID 41447)
-- Name: Categories_Inherent FactorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories_Inherent"
    ADD CONSTRAINT "FactorId" FOREIGN KEY ("FactorId") REFERENCES public."InherentFactors"("Factor_Inh_Id") NOT VALID;


--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 2751
-- Name: CONSTRAINT "FactorId" ON "Categories_Inherent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT "FactorId" ON public."Categories_Inherent" IS 'Factor';


--
-- TOC entry 2755 (class 2606 OID 41584)
-- Name: NaturalPersons NaturalPersons_ListId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NaturalPersons"
    ADD CONSTRAINT "NaturalPersons_ListId_fkey" FOREIGN KEY ("ListId") REFERENCES public."SanctionListNatural"("ListId") NOT VALID;


--
-- TOC entry 2752 (class 2606 OID 41706)
-- Name: TransactionRisk TransactionRisk_TransactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionRisk"
    ADD CONSTRAINT "TransactionRisk_TransactionId_fkey" FOREIGN KEY ("TransactionId") REFERENCES public.transactions("TransactionId") NOT VALID;


--
-- TOC entry 2753 (class 2606 OID 41743)
-- Name: transactions transactions_CustomerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES public."Customers"("CustomerId") NOT VALID;


-- Completed on 2020-01-11 20:54:39

--
-- PostgreSQL database dump complete
--

