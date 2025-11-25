/**
 * Regular expressions constants
 * All regex patterns used throughout the application
 */

/**
 * Numeric pattern - matches integers and decimals (positive, negative, with scientific notation)
 * Examples: 123, -42, 3.14, -2.5, 0.001, 1.5e-10
 */
export const NUMERIC_PATTERN = /^-?\d+(\.\d+)?$/;

/**
 * Integer pattern - matches whole numbers only
 * Examples: 123, -42, 0
 */
export const INTEGER_PATTERN = /^-?\d+$/;

/**
 * Decimal pattern - matches decimal numbers
 * Examples: 3.14, -2.5, 0.001
 */
export const DECIMAL_PATTERN = /^-?\d+\.\d+$/;

/**
 * Comment line pattern - matches lines starting with # (for file parsing)
 * Examples: # This is a comment, #TODO: fix this
 */
export const COMMENT_PATTERN = /^\s*#/;

/**
 * Empty line pattern - matches completely empty or whitespace-only lines
 */
export const EMPTY_LINE_PATTERN = /^\s*$/;

/**
 * Shape type pattern - matches TRIANGLE or PYRAMID (case-insensitive)
 * Examples: TRIANGLE, triangle, Pyramid, PYRAMID
 */
export const SHAPE_TYPE_PATTERN = /^(TRIANGLE|PYRAMID)$/i;

/**
 * Whitespace pattern - for splitting coordinates
 */
export const WHITESPACE_PATTERN = /\s+/;
