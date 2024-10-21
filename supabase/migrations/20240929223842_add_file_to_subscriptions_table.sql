ALTER TABLE public.subscriptions
ADD COLUMN file_id INTEGER;

ALTER TABLE public.subscriptions
ADD CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE SET NULL;