import { Button } from "./ui/button";
import type { User } from "../lib/api";

export function Navbar({
  user,
  onLogout
}: {
  user: User | null;
  onLogout: () => void;
}) {
  return (
    <header className="border-b bg-background/60 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <span className="font-semibold tracking-tight">auth</span>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span>
              Hi, <span className="font-medium">{user.email}</span>
            </span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
