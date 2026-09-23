import katex from 'katex'
import * as mathjs from 'mathjs'

function renderKaTeX(formula, displayMode) {
    try {
        // Normalize decimal commas between digits (e.g. 9,81 -> 9{,}81) so KaTeX does not insert a wide punctuation gap
        const normalized = formula.trim().replace(/(\d),(\d)/g, '$1{,}$2')
        return katex.renderToString(normalized, {
            throwOnError: false,
            displayMode,
            macros: {
                "\\R": "\\mathbb{R}",
                "\\N": "\\mathbb{N}",
                "\\Z": "\\mathbb{Z}",
                "\\Q": "\\mathbb{Q}",
                "\\limt": "\\lim_{#1 \\to #2}"
            }
        })
    } catch {
        return formula
    }
}

/**
 * Parses a string to evaluate KaTeX math blocks:
 * - Display math: $$ ... $$ or \[ ... \]
 * - Inline math: \( ... \) or $ ... $
 */
export function processMathText(text) {
    if (!text || typeof text !== 'string') return text;

    // Fast-path: if string doesn't contain math delimiters, return directly
    if (!text.includes('\\(') && !text.includes('\\[') && !text.includes('$$') && !text.includes('$')) {
        return text;
    }

    let result = text;

    // 1. Process display math: $$ ... $$ or \[ ... \]
    result = result.replace(/\$\$(.+?)\$\$/gs, (_, formula) => renderKaTeX(formula, true));
    result = result.replace(/\\\[(.+?)\\\]/gs, (_, formula) => renderKaTeX(formula, true));

    // 2. Process standard LaTeX inline math: \( ... \)
    result = result.replace(/\\\((.+?)\\\)/gs, (_, formula) => renderKaTeX(formula, false));

    // 3. Process $ ... $ inline math (avoiding currency-like patterns e.g. $10)
    result = result.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (match, prefix, formula) => {
        // Skip if formula looks like a plain number
        if (/^\d+(\.\d+)?$/.test(formula.trim())) return match;
        return prefix + renderKaTeX(formula, false);
    });

    return result;
}

export function evaluateExpression(expr, scope = {}) {
    try {
        return mathjs.evaluate(expr, scope)
    } catch(e) {
        console.warn('Math.js evaluation error:', e)
        return null;
    }
}

export const math = mathjs;