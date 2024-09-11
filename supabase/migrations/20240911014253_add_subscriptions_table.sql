CREATE TABLE subscriptions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    frequency_payment TEXT NOT NULL,
    next_payment_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
