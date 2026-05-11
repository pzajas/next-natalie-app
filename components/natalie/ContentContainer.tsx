import type { ComponentPropsWithoutRef } from "react";

type ContentContainerProps = ComponentPropsWithoutRef<"div">;

export function ContentContainer({ className = "", ...props }: ContentContainerProps) {
  return <div className={`content-container ${className}`} {...props} />;
}
