import { z } from 'zod';
import { HandleError, Supabase } from '@/supabase-client.ts';

const FILES_TABLE = 'files';
const BUCKET = 'wallox';

export const FileSchema = z.object({
  id: z.number().optional(),
  bucket: z.string().min(1, 'Bucket is required'),
  file_name: z.string().min(1, 'File name is required'),
  file_path: z.string().min(1, 'File path is required'),
  mime_type: z.string().min(1, 'MIME type is required'),
  size: z.number().refine((val) => val > 0, { message: 'Size must be greater than 0' }),
  created_at: z.string().optional(),
});

export type FileBlob = z.infer<typeof FileSchema>;

const UploadFile = async (file: File, path: string) => {
  const { error: storageError } = await Supabase.storage.from(BUCKET).upload(`${path}/${file.name}`, file, {
    cacheControl: '3600',
    upsert: true,
  });

  HandleError(storageError);

  const { data: storage } = Supabase.storage.from(BUCKET).getPublicUrl(`${path}/${file.name}`);

  console.log(storage.publicUrl);
  const blob: FileBlob = {
    file_name: file.name,
    mime_type: file.type,
    size: file.size,
    file_path: storage.publicUrl,
    bucket: BUCKET,
  };

  const { data, error } = await Supabase.from(FILES_TABLE).insert(blob).select().single();
  HandleError(error);

  return data;
};

const DownloadFile = async (fileId: number) => {
  const { data, error } = await Supabase.from(FILES_TABLE).select().eq('id', fileId).single();
  HandleError(error);

  const response = await fetch(data.file_path);
  const blob = await response.blob();

  return new File([blob], data.file_name, { type: blob.type });
};

export { UploadFile, DownloadFile };
