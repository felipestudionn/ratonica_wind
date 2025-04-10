import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Platform } from "./types";
import { config } from "./config";

/**
 * Merge class names with tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Generate affiliate link for a product URL
 */
export function generateAffiliateLink(url: string): string {
  if (!config.affiliate.enabled) return url;
  
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${config.affiliate.paramName}=${config.affiliate.paramValue}`;
}

/**
 * Get platform logo URL
 */
export function getPlatformLogo(platform: Platform): string {
  const platformConfig = config.platforms.find(p => p.name === platform);
  return platformConfig?.logo || "/logos/default.svg";
}

/**
 * Calculate similarity score (0-100) based on various factors
 * This is a mock implementation - in a real app, this would use ML/AI
 */
export function calculateSimilarityScore(): number {
  // In a real implementation, this would compare visual features, text descriptions, etc.
  // For now, we'll return a random score between 60-100
  return Math.floor(Math.random() * 40) + 60;
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Convert base64 image to Blob
 */
export function base64ToBlob(base64: string, mimeType: string = "image/jpeg"): Blob {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeType });
}

/**
 * Get condition label from condition value
 */
export function getConditionLabel(condition: string): string {
  const conditions: Record<string, string> = {
    new: "New",
    like_new: "Like New",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
  };
  
  return conditions[condition] || "Unknown";
}
