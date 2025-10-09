// Complexity analysis function
export const analyzeComplexity = (code: string): string => {
  const codeLower = code.toLowerCase();

  // Check for nested loops (O(n^2), O(n^3), etc.)
  const nestedLoopPattern = /for\s*\([^)]*\)\s*\{[^}]*for\s*\([^}]*\)/g;
  const tripleNestedPattern =
    /for\s*\([^)]*\)\s*\{[^}]*for\s*\([^}]*\)\s*\{[^}]*for\s*\([^}]*\)/g;

  if (tripleNestedPattern.test(code)) {
    return "O(n³)";
  }

  if (nestedLoopPattern.test(code)) {
    return "O(n²)";
  }

  // Check for binary search (O(log n))
  if (
    codeLower.includes("binary search") ||
    (codeLower.includes("mid") &&
      codeLower.includes("left") &&
      codeLower.includes("right"))
  ) {
    return "O(log n)";
  }

  // Check for single loop (O(n))
  const singleLoopPattern = /for\s*\([^)]*\)|while\s*\([^)]*\)/g;
  const loopMatches = code.match(singleLoopPattern);

  if (loopMatches && loopMatches.length === 1) {
    return "O(n)";
  }

  // Check for recursive patterns
  if (
    codeLower.includes("function") &&
    codeLower.includes("return") &&
    (codeLower.includes("recursive") ||
      codeLower.includes("fibonacci") ||
      codeLower.includes("factorial"))
  ) {
    return "O(2ⁿ)";
  }

  // Check for sorting algorithms
  if (
    codeLower.includes("sort") ||
    codeLower.includes("bubble") ||
    codeLower.includes("quick") ||
    codeLower.includes("merge") ||
    codeLower.includes("heap")
  ) {
    return "O(n log n)";
  }

  // Check for hash table operations (O(1))
  if (
    codeLower.includes("map") ||
    codeLower.includes("set") ||
    codeLower.includes("hash") ||
    codeLower.includes("object") ||
    codeLower.includes("dict")
  ) {
    return "O(1)";
  }

  // Default for simple operations
  return "O(1)";
};
