import * as React from "react";

export function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`w-full h-2 rounded-full bg-muted ${className}`}>
      <div
        className="h-2 rounded-full bg-chart-4 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
