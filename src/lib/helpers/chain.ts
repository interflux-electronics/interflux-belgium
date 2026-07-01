/**
 * chainable-array.ts
 * Ember-style chainable array utilities with nested paths.
 */

type Path<T> = string;

function getByPath<T>(obj: T, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined;
  const keys = path.split('.');
  let current: any = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = current[key];
  }
  return current;
}

function createComparator(key: string, direction: 'asc' | 'desc' = 'asc') {
  const multiplier = direction === 'desc' ? -1 : 1;

  return (a: any, b: any): number => {
    let valA = getByPath(a, key);
    let valB = getByPath(b, key);

    if (valA == null) return multiplier * (valB == null ? 0 : -1);
    if (valB == null) return multiplier * 1;

    if (typeof valA === 'boolean' && typeof valB === 'boolean') {
      return multiplier * (valA === valB ? 0 : valA ? 1 : -1);
    }

    const dateA = tryParseDate(valA);
    const dateB = tryParseDate(valB);
    if (dateA !== null && dateB !== null) {
      return multiplier * (dateA.getTime() - dateB.getTime());
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return (
        multiplier * valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' })
      );
    }

    const numA = Number(valA);
    const numB = Number(valB);
    if (!isNaN(numA) && !isNaN(numB)) {
      return multiplier * (numA - numB);
    }

    const strA = String(valA);
    const strB = String(valB);
    return multiplier * strA.localeCompare(strB);
  };
}

function tryParseDate(value: any): Date | null {
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  if (typeof value === 'number' && !isNaN(value)) {
    const d = new Date(value);
    return !isNaN(d.getTime()) ? d : null;
  }
  if (typeof value === 'string') {
    const d = new Date(value);
    return !isNaN(d.getTime()) ? d : null;
  }
  return null;
}

export interface ChainableArray<T> extends Array<T> {
  mapBy(path: Path<T>): ChainableArray<any>;
  filterBy(path: Path<T>, value?: any): ChainableArray<T>;
  rejectBy(path: Path<T>, value?: any): ChainableArray<T>;
  uniqBy(path?: Path<T>): ChainableArray<T>;
  sortBy(...args: (Path<T> | 'asc' | 'desc')[]): ChainableArray<T>;

  /**
   * Flattens nested arrays.
   * @param depth The maximum recursion depth (default: 1)
   * @example .flat()           // depth = 1
   * @example .flat(2)          // deeper flattening
   */
  flat<D extends number = 1>(depth?: D): ChainableArray<FlatArray<T, D>>;

  /**
   * Returns a plain JavaScript array (ends the chain).
   * Useful when you want to assign the final result or pass it to non-chainable code.
   */
  toArray(): T[];
}

function toChainable<T>(arr: T[]): ChainableArray<T> {
  const chainable = arr as ChainableArray<T>;

  chainable.mapBy = function (path: string) {
    return toChainable(this.map((item) => getByPath(item, path)));
  };

  chainable.filterBy = function (path: string, value?: any): ChainableArray<T> {
    if (value === undefined) {
      return toChainable(this.filter((item) => !!getByPath(item, path)));
    }
    return toChainable(this.filter((item) => getByPath(item, path) === value));
  };

  chainable.rejectBy = function (path: string, value?: any): ChainableArray<T> {
    if (value === undefined) {
      return toChainable(this.filter((item) => !getByPath(item, path)));
    }
    return toChainable(this.filter((item) => getByPath(item, path) !== value));
  };

  chainable.uniqBy = function (path?: string) {
    const seen = new Set<any>();
    return toChainable(
      this.filter((item) => {
        const val = path ? getByPath(item, path) : item;
        if (seen.has(val)) return false;
        seen.add(val);
        return true;
      })
    );
  };

  chainable.sortBy = function (...args: (string | 'asc' | 'desc')[]) {
    if (args.length === 0) return toChainable([...this]);

    const comparators: ((a: any, b: any) => number)[] = [];
    let i = 0;

    while (i < args.length) {
      const arg = args[i];
      if (typeof arg !== 'string' || arg === 'asc' || arg === 'desc') {
        i++;
        continue;
      }

      const key = arg;
      let direction: 'asc' | 'desc' = 'asc';

      if (i + 1 < args.length) {
        const next = args[i + 1];
        if (next === 'asc' || next === 'desc') {
          direction = next;
          i++;
        }
      }

      comparators.push(createComparator(key, direction));
      i++;
    }

    return toChainable(
      [...this].sort((a, b) => {
        for (const cmp of comparators) {
          const result = cmp(a, b);
          if (result !== 0) return result;
        }
        return 0;
      })
    );
  };

  chainable.flat = function (depth: number = 1): ChainableArray<any> {
    return toChainable(Array.prototype.flat.call(this, depth));
  };

  chainable.toArray = function (): T[] {
    return [...this];
  };

  return chainable;
}

export default function chain<T>(arr: readonly T[] | null | undefined): ChainableArray<T> {
  return toChainable(Array.isArray(arr) ? [...arr] : []);
}
