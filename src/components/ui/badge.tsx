import * as React from "react";

type Variant = "default" | "destructive" | "secondary" | "outline";

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const styles: Record<Variant, string> = {
    default: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    secondary: "bg-muted text-foreground",
    outline: "border border-border text-foreground",
  };
  return <span className={`${base} ${styles[variant]} ${className}`}>{children}</span>;
}
