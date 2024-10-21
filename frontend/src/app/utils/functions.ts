
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OnboardingResultOptions } from './interface'

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}
