import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { api, type User } from "../lib/api";
import { PasswordRequirements, isValidPassword } from "./password-requirements";

export function AuthForm({ onSuccess }: { onSuccess: (user: User) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";
  const canSubmit =
    email && password && (!isRegister || isValidPassword(password));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await (isRegister ? api.register : api.login)(
        email,
        password
      );
      onSuccess(user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function toggle() {
    setMode(isRegister ? "login" : "register");
    setError("");
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isRegister ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Enter your details to get started."
            : "Sign in to continue."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegister && <PasswordRequirements password={password} />}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="mt-6 flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || loading}
          >
            {loading
              ? "Please wait…"
              : isRegister
                ? "Create account"
                : "Sign in"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggle}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {isRegister ? "Sign in" : "Register"}
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
