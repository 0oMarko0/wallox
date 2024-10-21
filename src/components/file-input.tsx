import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { X } from 'lucide-react';

export const FileInput: FC<{
  onChange: (file: File | undefined) => void;
  value: File | undefined;
}> = ({ onChange, value }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(undefined);
    }
  }, [value]);

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between">
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Choose File
          </label>
        </Button>
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0] || undefined;
            onChange(file);
          }}
        />
        {value && (
          <Button variant="destructive" onClick={() => onChange(undefined)} className="flex items-center space-x-2">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {value && <p className="text-sm text-muted-foreground">Selected file: {value.name}</p>}
      {preview && value?.type.startsWith('image/') && (
        <div className="flex justify-center">
          <img src={preview} alt="Preview" className="max-w-xs max-h-xs" />
        </div>
      )}
    </div>
  );
};
