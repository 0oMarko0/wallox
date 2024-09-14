CREATE TYPE payment_frequency_enum AS ENUM (
    'week',
    'month',
    'year'
);

CREATE TABLE IF NOT EXISTS public.categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payment_methods (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    payment_every smallint NOT NULL,
    payment_frequency payment_frequency_enum DEFAULT 'month'::payment_frequency_enum NOT NULL,
    last_payment_date date NOT NULL,
    price numeric(10,2) NOT NULL,
    paid_by text,
    note text,
    created_at timestamp with time zone DEFAULT now(),
    category_id integer,
    payment_methods_id integer
);

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT fk_payment_methods_id FOREIGN KEY (payment_methods_id) REFERENCES payment_methods(id) ON DELETE SET NULL;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;