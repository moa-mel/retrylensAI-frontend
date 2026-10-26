import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export function Button({ variant = "secondary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`button ${variant === "primary" ? "button-primary" : ""} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}