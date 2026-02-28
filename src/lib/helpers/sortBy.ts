/**
 * Flexible sort comparator factory
 * @param {string} key - property name to sort by
 * @param {string} [direction='asc'] - 'asc' or 'desc'
 * @returns {function} comparator for Array.prototype.sort
 */

// people.sort(sortBy("name"));                // alphabetical A→Z
// people.sort(sortBy("name", "desc"));        // Z→A

// people.sort(sortBy("score"));               // low → high
// people.sort(sortBy("score", "desc"));       // high → low

// people.sort(sortBy("active"));              // false → true
// people.sort(sortBy("active", "desc"));      // true → false

// people.sort(sortBy("joined"));              // oldest → newest
// people.sort(sortBy("joined", "desc"));      // newest → oldest

export function sortBy(key: string, direction: string = 'asc') {
  const multiplier = direction === 'desc' || direction === 'descending' ? -1 : 1;

  return (a, b) => {
    // Get values (handle undefined/null gracefully)
    let valA = a?.[key];
    let valB = b?.[key];

    // Treat undefined/null as "smallest" value (end of asc sort)
    if (valA == null) return multiplier * (valB == null ? 0 : -1);
    if (valB == null) return multiplier * 1;

    // ───────────────────────────────────────────────
    // Boolean handling
    // ────────────────────────────────────────────────
    if (typeof valA === 'boolean' && typeof valB === 'boolean') {
      // false < true  (in asc order)
      return multiplier * (valA === valB ? 0 : valA ? 1 : -1);
    }

    // ───────────────────────────────────────────────
    // Date handling
    // ────────────────────────────────────────────────
    const dateA = tryParseDate(valA);
    const dateB = tryParseDate(valB);

    if (dateA !== null && dateB !== null) {
      return multiplier * (dateA.getTime() - dateB.getTime());
    }

    // ───────────────────────────────────────────────
    // String handling (locale-aware)
    // ────────────────────────────────────────────────
    if (typeof valA === 'string' && typeof valB === 'string') {
      return (
        multiplier *
        valA.localeCompare(valB, undefined, {
          numeric: true, // "file2" < "file10"
          sensitivity: 'base'
        })
      );
    }

    // ───────────────────────────────────────────────
    // Number handling (includes numeric strings)
    // ────────────────────────────────────────────────
    const numA = Number(valA);
    const numB = Number(valB);

    if (!isNaN(numA) && !isNaN(numB)) {
      return multiplier * (numA - numB);
    }

    // Fallback: convert to string and compare
    const strA = String(valA);
    const strB = String(valB);
    return multiplier * strA.localeCompare(strB);
  };
}

// Small helper to safely parse various date formats
function tryParseDate(value) {
  if (value instanceof Date && !isNaN(value)) return value;
  if (typeof value === 'number' && !isNaN(value)) {
    const d = new Date(value);
    return !isNaN(d) ? d : null;
  }
  if (typeof value === 'string') {
    const d = new Date(value);
    return !isNaN(d) ? d : null;
  }
  return null;
}
