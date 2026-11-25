import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function AuthSkeleton() {
  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="gap-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
      <CardFooter className="mt-6 flex-col gap-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-4 w-44" />
      </CardFooter>
    </Card>
  );
}
