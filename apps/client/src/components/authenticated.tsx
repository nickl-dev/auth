import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Authenticated() {
  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          You have authenticated
        </h2>
        <p className="text-sm text-muted-foreground">
          You're signed in and good to go.
        </p>
      </CardContent>
    </Card>
  );
}
