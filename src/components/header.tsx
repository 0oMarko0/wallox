import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { useMemo } from 'react';

export function SiteHeader() {
  const svg = useMemo(() => {
    return createAvatar(thumbs, {
      seed: 'Brian',
      radius: 20,
    }).toDataUri();
  }, []);

  console.log(svg);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-12 mx-4 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="font-bold">Wallox</div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">Marco</nav>
          <img className="h-8 w-8 object-cover cursor-pointer" src={svg} />
        </div>
      </div>
    </header>
  );
}
