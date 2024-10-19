import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Link } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { Avatar } from '@/components/header.tsx';
import { ReactNode } from 'react';

export interface NavigationItem {
  node: ReactNode;
  tooltip: string;
  page: string;
  search?: {
    [key: string]: string | number | boolean;
  };
}

export interface NavigationProps {
  items: NavigationItem[];
}

export function Navigation(props: NavigationProps) {
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link to="/">
          <Avatar />
        </Link>
        <TooltipProvider>
          {props.items.map((item) => (
            <Tooltip key={item.page}>
              <TooltipTrigger asChild>
                <Link
                  to={item.page}
                  search={item.search}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  {item.node}
                  <span className="sr-only">{item.tooltip}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.tooltip}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/logout"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  );
}
