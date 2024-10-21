import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SquarePlus } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export interface PageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function Page(props: PageProps) {
  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background">
        <div className="flex flex-row items-center justify-between p-4">
          <div>
            <h3 className="text-lg font-medium">{props.title}</h3>
            <p className="text-sm text-muted-foreground">{props.description}</p>
          </div>
          <div>
            <Link to="/subscriptions/new">
              <Button className="w-[40px] h-[40px] p-0">
                <SquarePlus className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <Separator />
      </header>

      {props.children}
    </div>
  );
}
