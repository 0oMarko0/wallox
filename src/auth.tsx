import { useState } from 'react';
import { Supabase } from '@/supabase-client.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { LoadingSpinner } from '@/components/ui/loading-spinnner.tsx';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await Supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert('Check you email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Wallox</CardTitle>
          <CardDescription>Enter your email below to received a magic link 🧙‍♂️</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="gandalf@LOTR.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={loading} onClick={handleLogin}>
            {loading ? <LoadingSpinner /> : 'Send link'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
