import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function generateRuleId(state: string, category: string, subcategory: string): string {
  const categoryCode = category.toUpperCase().replace(/\s+/g, '').substring(0, 6);
  const subcategoryCode = subcategory.toUpperCase().replace(/\s+/g, '').substring(0, 3);
  const timestamp = Date.now().toString().slice(-3);
  return `${state}-${categoryCode}-${subcategoryCode}-${timestamp}`;
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'HIGH': return 'text-green-600 bg-green-100';
    case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
    case 'LOW': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High': return 'text-red-600 bg-red-100';
    case 'Medium': return 'text-yellow-600 bg-yellow-100';
    case 'Low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}