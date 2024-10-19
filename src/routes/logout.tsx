import { createFileRoute, redirect } from '@tanstack/react-router';
import { Supabase } from '@/supabase-client.ts';

const logoutFn = async () => {
  const { error } = await Supabase.auth.signOut();
  console.log('logout');

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  throw redirect({
    href: '/',
  });
};

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn().then(),
});
