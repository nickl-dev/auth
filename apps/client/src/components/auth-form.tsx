import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { PasswordRequirements, isValidPassword } from "./password-requirements";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register, login, clearError } from "../store/auth-slice";

export function AuthForm() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useAppSelector((state) => state.auth);

  const isRegister = mode === "register";
  const canSubmit =
    email && password && (!isRegister || isValidPassword(password));

  function submit(e: React.SubmitEvent) {
    e.preventDefault();
    dispatch((isRegister ? register : login)({ email, password }));
  }

  function toggle() {
    setMode(isRegister ? "login" : "register");
    dispatch(clearError());
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="text-center">
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
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter className="mt-6 flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || loading}
          >
            {loading ? <Spinner /> : isRegister ? "Create account" : "Sign in"}
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
