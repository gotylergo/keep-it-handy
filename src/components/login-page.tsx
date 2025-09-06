import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

type LoginPageProps = {
  onLogin: () => void;
};


export default function LoginPage({ onLogin }: LoginPageProps) {
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
              Sign in with Google to access your notes.
            </p>
            <Button onClick={onLogin} size="lg">Sign in with Google</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
