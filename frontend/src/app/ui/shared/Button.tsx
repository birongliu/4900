import { cn } from '@/app/utils/functions'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={cn('bg-darkMaroon rounded-xl p-3 text-button-primary', className)}>{children}</button>
  )
}
