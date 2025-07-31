import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const iconMap = {
  check: Check,
}

function Icon({
  className,
  name,
  ...props
}: React.ComponentProps<"svg"> &
  React.ComponentProps<"div"> & {
    name: keyof typeof iconMap | string
  }) {
  const Icon = name in iconMap && iconMap[name as keyof typeof iconMap]
  return Icon ? (
    <Icon className={cn(className)} {...props} />
  ) : (
    <div
      className={cn(
        "flex size-4 items-center justify-center text-base leading-none",
        className
      )}
      {...props}
    >
      {name}
    </div>
  )
}

export { Icon }
