import { InfoIcon } from "lucide-react";

export function InfoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-6 text-sm text-muted-foreground">
      <InfoIcon className="size-4 shrink-0" />
      {children}
    </div>
  );
}
