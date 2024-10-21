import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { useMemo } from 'react';

export function Avatar() {
  const svg = useMemo(() => {
    return createAvatar(thumbs, {
      seed: 'Brian',
      radius: 20,
    }).toDataUri();
  }, []);

  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <img className="h-8 w-8 object-cover cursor-pointer" src={svg} />
    </div>
  );
}
