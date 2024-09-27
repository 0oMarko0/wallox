import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator.tsx';

export interface PageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Page(props: PageProps) {
  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background">
        <div className="p-4">
          <h3 className="text-lg font-medium">{props.title}</h3>
          <p className="text-sm text-muted-foreground">{props.description}</p>
        </div>
        <Separator />
      </header>

      {props.children}
    </div>
  );
}
