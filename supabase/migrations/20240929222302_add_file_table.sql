CREATE TABLE files (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bucket text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  mime_type text NOT NULL,
  size bigint NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);