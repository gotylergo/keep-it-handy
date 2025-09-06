import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useEffect } from "react";

type LoginPageProps = {
  onLogin: (response: any) => void;
};


export default function LoginPage({ onLogin }: LoginPageProps) {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: onLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv")!,
        { theme: "outline", size: "large", type: 'standard', text: 'signin_with' }
      );
    }
  }, [onLogin]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Lightbulb className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-headline">Keep It Handy</CardTitle>
          <CardDescription>Your notes, just a click away.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 items-center">
            <p className="text-center text-sm text-muted-foreground">
              Sign in to access your Google Keep notes.
            </p>
            <div id="signInDiv"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
