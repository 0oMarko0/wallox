INSERT INTO categories (name)
VALUES
    ('Entertainment'),
    ('Software & Tools'),
    ('Finance'),
    ('Health & Fitness'),
    ('Productivity'),
    ('Professional'),
    ('Miscellaneous');

INSERT INTO payment_methods (name)
VALUES
    ('Visa'),
    ('Mastercard'),
    ('PayPal'),
    ('Bank Transfer'),
    ('Cash');

-- Insert data into the subscriptions table without id and created_at
INSERT INTO subscriptions (name, payment_every, payment_frequency, last_payment_date, price, paid_by, note, category_id, payment_methods_id)
VALUES
    ('Netflix', 1, 'month', '2024-09-01', 15.99, 'John Doe', 'Streaming service',
    (SELECT id FROM categories WHERE name = 'Entertainment'),
    (SELECT id FROM payment_methods WHERE name = 'Visa')),

    ('Spotify', 1, 'month', '2024-09-05', 9.99, 'Jane Smith', 'Music streaming service',
    (SELECT id FROM categories WHERE name = 'Entertainment'),
    (SELECT id FROM payment_methods WHERE name = 'PayPal')),

    ('Google Drive', 1, 'month', '2024-09-10', 1.99, 'John Doe', 'Cloud storage',
    (SELECT id FROM categories WHERE name = 'Software & Tools'),
    (SELECT id FROM payment_methods WHERE name = 'Bank Transfer')),

    ('The New York Times', 12, 'month', '2024-01-01', 100.00, 'Emily Davis', 'Annual subscription to news',
    (SELECT id FROM categories WHERE name = 'Productivity'),
    (SELECT id FROM payment_methods WHERE name = 'Mastercard')),

    ('Peloton', 1, 'month', '2024-09-01', 39.99, 'John Doe', 'Fitness subscription',
    (SELECT id FROM categories WHERE name = 'Health & Fitness'),
    (SELECT id FROM payment_methods WHERE name = 'Visa')),

    ('Amazon Prime', 12, 'month', '2024-02-15', 139.00, 'Jane Smith', 'Annual membership',
    (SELECT id FROM categories WHERE name = 'Entertainment'),
    (SELECT id FROM payment_methods WHERE name = 'Bank Transfer')),

    ('Adobe Creative Cloud', 1, 'month', '2024-09-07', 52.99, 'Emily Davis', 'Design software suite',
    (SELECT id FROM categories WHERE name = 'Software & Tools'),
    (SELECT id FROM payment_methods WHERE name = 'PayPal')),

    ('Hulu', 1, 'month', '2024-09-10', 12.99, 'John Doe', 'Streaming service',
    (SELECT id FROM categories WHERE name = 'Entertainment'),
    (SELECT id FROM payment_methods WHERE name = 'Bank Transfer')),

    ('MasterClass', 12, 'month', '2024-05-20', 180.00, 'Jane Smith', 'Online learning platform',
    (SELECT id FROM categories WHERE name = 'Productivity'),
    (SELECT id FROM payment_methods WHERE name = 'Visa')),

    ('Strava Premium', 12, 'month', '2024-08-15', 59.99, 'Emily Davis', 'Fitness tracking app',
    (SELECT id FROM categories WHERE name = 'Health & Fitness'),
    (SELECT id FROM payment_methods WHERE name = 'Visa'));
