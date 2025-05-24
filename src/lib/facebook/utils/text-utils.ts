/**
 * Utility functions for text processing
 */

/**
 * Extract email addresses from text
 */
export function extractEmailFromText(text: string): string | undefined {
    if (!text) return undefined;
    
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const matches = text.match(emailRegex);
    
    return matches && matches.length > 0 ? matches[0] : undefined;
}