// app/components/ui/badge.tsx

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent",
        success: "bg-green-500 text-white border-transparent",
        danger: "bg-red-500 text-white border-transparent",
        secondary: "bg-gray-200 text-gray-800 border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
