/**
 * Represents a breakpoint name for responsive layouts. Bootstrap's default
 * breakpoints are "sm", "md", "lg", "xl", "xxl", but the user can specify any
 * other breakpoint name as a string by updating Bootstrap's `$grid-breakpoints`
 * Sass map.
 *
 * @see https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints
 */
// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl" | string;

/**
 * A BreakpointMap is a list of user-specified column widths at each breakpoint.
 * Users are allowed to use `null` to indicate auto-fit columns at a specific
 * breakpoint. They can also use negative values to indicate column offsets.
 */
type BreakpointMap = Map<Breakpoint, number[] | null>;

/**
 * A resolved BreakpointMap where auto-fit columns have been replaced with the
 * best-fit column widths. This means that we may not be able to fully resolve
 * the breakpoint map until we know how many children are in the layout.
 */
type BreakpointMapResolved = Map<Breakpoint, number[]>;

/**
 * A BreakpointColumn is a resolved column width specification for a single
 * breakpoint. It includes the column widths, and before and after units for
 * each column.
 */
type BreakpointColumn = {
  width: number[];
  before: number[];
  after: number[];
};

/**
 * A BreakpointColumnSpec is a resolved column width specification for all
 * breakpoints. At each breakpoint we have, essentially, a table of column
 * widths and the number of empty columns that should appear before or after
 * each column. This spec can be used to write the appropriate classes to the
 * children in the layout.
 */
type BreakpointColumnSpec = Map<Breakpoint, BreakpointColumn>;

/**
 * A custom element that lays out its children in a grid using Bootstrap's
 * responsive grid classes, given input from the user about the desired column
 * widths. Column widths can be specified at individual breakpoints, or
 * determined automatically at runtime.
 */
export class BslibLayoutColumns extends HTMLElement {
  static tagName = "bslib-layout-columns";
  static isShinyInput = false;

  /**
   * Create a new default BreakpointMap. If no column widths are specified, we
   * auto-fit at the "sm" and "lg" breakpoints.
   */
  static defaultColWidths(): BreakpointMap {
    return new Map(Object.entries({ sm: null, lg: null }));
  }

  /**
   * The user-specified (or default) column widths, unresolved. We don't support
   * it now, but if the number of children were to change, we can re-resolve the
   * column width spec starting from this value.
   */
  colWidths!: BreakpointMap;

  /**
   * The column width specification, with auto-fit breakpoint values resolved.
   */
  colWidthsSpec: BreakpointColumnSpec | undefined;

  /**
   * The number of column units in a row.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _colUnits = 12;

  get colUnits(): number {
    return this._colUnits;
  }

  set colUnits(val: number) {
    this.style.setProperty("--bs-columns", `${val}`);
    this._colUnits = val;
  }

  /**
   * Fallback item span for breakpoints not provided by the user. For example,
   * if the user gives column widths for the "lg" breakpoint, the fallback item
   * span covers column widths below "lg", i.e. "sm" and "md". This value only
   * needs to be set when auto-fit is used for larger screen sizes and no lower
   * breakpoints are set. It also only comes into play when auto-fit adjusts the
   * default number of columns.
   */
  setFallbackItemSpan(val: number): void {
    this.style.setProperty("--_fallback-item-span", `${val}`);
  }

  connectedCallback(): void {
    // This component assumes Bootstrap's CSS grid, so we enforce the class here
    this.classList.add("grid");

    // Read and parse the column widths (the user's unresolved input)
    this.colWidths = this._readColWidths();
    // We don't observe or reflect the attribute, and it could be an arbitrarily
    // big JSON string, so remove it
    this.removeAttribute("col-widths");

    // Connected callback is called before children are added to the DOM, so we
    // need to wait for the next tick to apply the column widths.
    setTimeout(() => {
      this._applyColWidthsSpec();
      this.removeAttribute("hidden-until-init");
    });
  }

  /**
   * Reads and parses the column widths from the "col-widths" attribute.
   * @returns A map of breakpoint to column width.
   */
  private _readColWidths(): BreakpointMap {
    const attr = this.getAttribute("col-widths");
    if (!attr) {
      return BslibLayoutColumns.defaultColWidths();
    }

    let x = JSON.parse(attr);
    if (Array.isArray(x)) {
      x = { md: x };
    }

    const colWidths = new Map();
    const breaks = ["sm", "md", "lg", "xl", "xxl"];

    // Assign known bootstrap breakpoints in order
    breaks.forEach((breakName) => {
      if (x[breakName]) {
        colWidths.set(breakName, isNA(x[breakName]) ? null : x[breakName]);
        delete x[breakName];
      }
    });
    // Plus any remaining breakpoints
    Object.keys(x).forEach((breakName) => {
      colWidths.set(breakName, isNA(x[breakName]) ? null : x[breakName]);
    });

    return colWidths;
  }

  /**
   * Given user-specified column widths, resolve the auto-fit breakpoints and
   * then finalize the column width spec. If any auto-fit breakpoints are
   * requested, this function needs to know the number of children in the
   * layout, so it can determine the best-fit column widths.
   *
   * @returns The resolved column width specification.
   */
  private _resolveColWidthsSpec(): BreakpointColumnSpec {
    const colValuesNA = Array.from(this.colWidths.values()).map(isNA);

    const all = (x: boolean[]) => x.every((val: boolean) => val === true);
    const any = (x: boolean[]) => x.some((val: boolean) => val === true);

    if (!any(colValuesNA)) {
      return newBreakpointColumnSpec(this.colWidths as BreakpointMapResolved);
    }

    const resolved = new Map() as BreakpointMapResolved;

    const allAutoFit = all(colValuesNA);
    const units = allAutoFit ? null : 12;
    const nChildren = this.children.length;

    for (const [breakName, colWidth] of this.colWidths) {
      if (colWidth === null) {
        const preferWider = ["sm", "md"].includes(breakName);
        const bestFit = bestFitColumnWidths(nChildren, preferWider, units);

        if (allAutoFit) {
          this.colUnits = bestFit.units;
          if (bestFit.units !== 12) {
            // If there are more units than children, the we know the best fit
            // algorithm chose `2 * nChildren` units per row. So our fallback
            // item span is nChildren units, or two items per row.
            this.setFallbackItemSpan(bestFit.units > nChildren ? nChildren : 1);
          }
        }

        resolved.set(breakName, bestFit.widths);
      } else {
        resolved.set(breakName, colWidth);
      }
    }

    return newBreakpointColumnSpec(resolved);
  }

  /**
   * Applies the column width specification to the children of the custom element.
   */
  private _applyColWidthsSpec(): void {
    if (!this.colWidthsSpec) {
      this.colWidthsSpec = this._resolveColWidthsSpec();
    }

    if (!this.colWidthsSpec) {
      throw new Error("Column widths must be specified.");
    }

    const children = this.children;
    writeGridClasses(this.colWidthsSpec, children, this.colUnits);
  }
}

/**
 * The best-fit algorithm chooses the number of column units per row and the
 * widths of each column. These values are equivalent to user input.
 */
type BestFitColumnWidths = {
  units: number;
  widths: number[];
};

/**
 * Given the number of children in the layout, choose the best-fit column widths
 * for the layout. If `preferWider` is `true`, we prefer wider columns (fewer
 * items per row, by default at the "sm" and "md" breakpoints), otherwise we
 * prefer narrower columns (more items per row on larger screens).
 *
 * If all breakpoints are auto-fit, `units` will be `null`, allowing this
 * function to choose the number of column units per row. This lets us get
 * better results for small and irregular `nItems` that aren't possible with the
 * 12-column grid. E.g. for 7 items we can use 14 units per row, with 7 column
 * units per item on small screens and 2 column units per item on large screens.
 * This choice is currently invariant to `nItems`.
 *
 * @param nItems The number of children in the layout.
 * @param preferWider Whether to prefer wider columns (for smaller breakpoints).
 * @param units The number of column units in a row.
 * @returns The best-fit column widths.
 */
function bestFitColumnWidths(
  nItems: number,
  preferWider = false,
  units: number | [null] | null = null
): BestFitColumnWidths {
  const fit = { units: units, widths: [0] } as BestFitColumnWidths;

  if (isNA(fit.units)) {
    // We're auto-fitting at all breakpoints, we can decide column units/row
    fit.units = nItems > 7 ? 12 : nItems > 3 ? nItems * 2 : nItems;

    if (nItems < 4) {
      fit.widths = [1];
      return fit;
    }

    if (nItems <= 7) {
      fit.widths = [preferWider ? nItems : 2];
      return fit;
    }
  }

  // In fixed 12-column mode, we manually pick columns widths for small nItems
  // that look better than the default auto-fit widths.
  if (fit.units === 12) {
    if (nItems <= 3) {
      fit.widths = [[12, 6, 4][nItems - 1]];
      return fit;
    }

    // nItems === 4, default auto-fit is fine (6 units wide, 3 units narrow)

    if (nItems === 5 || nItems === 7) {
      fit.widths = [preferWider ? 4 : 3];
      return fit;
    }

    if (nItems === 6) {
      fit.widths = [preferWider ? 4 : 2];
      return fit;
    }
  }

  const fctrs = preferWider ? [6, 4, 3] : [2, 3, 4];

  const unitsItems = fctrs.map((x) => x * nItems);
  const rows = unitsItems.map((val) => Math.ceil(val / 12));
  const unitsTotal = rows.map((val) => val * 12);
  const unitsEmpty = unitsTotal.map((val, idx) => val - unitsItems[idx]);

  fit.widths = [fctrs[unitsEmpty.indexOf(Math.min(...unitsEmpty))]];

  return fit;
}

/**
 * Given a resolved BreakpointMap (i.e. auto-fit breakpoints have been
 * determined), create a BreakpointColumnSpec.
 *
 * @param breaks The resolved BreakpointMap.
 * @returns The BreakpointColumnSpec.
 */
function newBreakpointColumnSpec(
  breaks: BreakpointMapResolved
): BreakpointColumnSpec {
  // throw if breaks isn't a breakpoint map
  if (!(breaks instanceof Map)) {
    throw new Error("Column widths must be specified as a Map or an object.");
  }

  const spec = new Map() as BreakpointColumnSpec;

  for (const [breakName, bk] of breaks) {
    if (bk.some((val) => val === 0)) {
      throw new Error(
        "Column values must be greater than 0 to indicate width, or negative to indicate a column offset."
      );
    }

    if (bk.length > 1 && bk.some((val) => isNaN(val))) {
      throw new Error(
        "Cannot mix widths and missing values. All column widths must be specified, or choose auto widths using a single `null` value."
      );
    }

    if (bk.every((val) => isNA(val)) || bk.every((val) => val > 0)) {
      spec.set(breakName, {
        width: bk,
        before: Array(bk.length).fill(0),
        after: Array(bk.length).fill(0),
      });
      continue;
    }

    if (!bk.some((val) => val > 0)) {
      throw new Error(
        "Column values must include at least one positive integer width."
      );
    }

    // At this point we have a mix of actual column widths and offsets. We need
    // to track them as a width, and before and after units for each column in
    // the spec. The actual widths are easy to find, they're the positive
    // values. But offsets could be repeated, e.g. [2, -1, -1, 2] => [2, -2, 2].
    const idxActual = bk
      .map((val, idx) => (val > 0 ? idx : -1))
      .filter((idx) => idx !== -1);
    const idxLastActual = Math.max(...idxActual);
    const lenActual = idxActual.length;

    const actual = idxActual.map((idx) => bk[idx]);
    const before = Array(lenActual).fill(0);
    const after = Array(lenActual).fill(0);

    // Accumulate the offsets to fit the same length as the actual widths. We
    // prefer allocating offsets to `before` units, except for the last actual
    // column in the spec, which receives the trailing offsets.
    let i = 0;
    let idxBefore = 0;
    while (i < bk.length) {
      if (bk[i] > 0) {
        idxBefore++;
      } else if (i > idxLastActual) {
        // accumulate trailing offsets
        after[after.length - 1] += Math.abs(bk[i]);
      } else {
        // accumulate leading offsets
        before[idxBefore] += Math.abs(bk[i]);
      }
      i++;
    }

    spec.set(breakName, {
      width: actual,
      before: before,
      after: after,
    });
  }

  return spec;
}

/**
 * Given a BreakpointColumnSpec, write the appropriate grid classes to the
 * collection of elements.
 * This next function implements a content-layout algorithm, motivated by
 * supporting empty columns.
 *
 * In particular, we need to know two things about
 * the content item:
 *
 * 1. How wide is the content item?
 * 2. What is its starting column position?
 *
 * The following example illustrates a few layout cases (. = empty column):
 *
 * ```
 * Breakpoints: { md = [-1, 4, 5, -4, 3, 9, -3, 2] }
 *
 * | . | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | . |
 * | . | . | . | 3 | 3 | 3 |   |   |   |   |   |
 * | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | . | . | . |
 * | 2 | 2 | . | 4 | 4 | 4 | 4 |   |   |   |   | ...
 * ```
 *
 * Because we recycle column widths to match the number of kids, we can't
 * guarantee that the pattern repeats by row. To quickly summarize:
 *
 * * Each content item has a width (`widths[idx]`) and empty space before
 *   the item: `before[idx]` + `after[idx - 1]` (the space before this item
 *   plus the space _after_ the previous item).
 * * We maintain a cursor that knows the 0-indexed column position. At each
 *   step we:
 *   * Move the cursor forward by the empty space before the item
 *   * Decide if we require a starting class (`g-start-{break}-{cursor + 1}`)
 *   * Add starting class and content width class (`g-start-{break}-{width}`)
 *     for the item
 *   * Move the cursor forward by the width of the item.
 *
 * We take into account a few edge cases:
 *
 * * We *don't need* a starting class if the item would naturally reflow to the
 *   next row.
 * * We *do need* a starting class if the item would fit into the empty space
 *   of the current row, but there isn't enough room for the item _after_
 *   accounting for blocked empty space.
 * * If adding empty space causes a new row, but adding the content item
 *   would cause _another row break_, we skip the empty row.
 *
 * @see https://getbootstrap.com/docs/5.3/layout/breakpoints/
 *
 * @param breaks The BreakpointColumnSpec.
 * @param elements The children of the custom element.
 * @param unitsRow The number of column units in a row.
 */
function writeGridClasses(
  breaks: BreakpointColumnSpec,
  elements: HTMLCollectionOf<Element>,
  unitsRow = 12
): void {
  // breaks are column breakpoints
  const nKids = elements.length;

  function addClassToEl(idx: number, newClass: string) {
    elements[idx].classList.add(newClass);
  }

  for (const [breakName, bk] of breaks) {
    if (bk.width.length > nKids) {
      const msg = `Truncating number of widths at '${breakName}' breakpoint to match number of elements.`;
      console.warn(msg, { widths: bk.width.length, elements: nKids });
    }

    // Find widths, before, after for each element, recycled from the spec
    const widths = recycleToLength(bk.width, nKids);
    const before = recycleToLength(bk.before, nKids);
    const after = recycleToLength(bk.after, nKids);

    let cursor = 0;
    const updateCursor = (incr: number, isEmpty = false) => {
      cursor = Math.abs(cursor);
      let newCursor = cursor + incr;
      if (newCursor == unitsRow) {
        // we've reached the final column, allow for a natural break
        newCursor = 0;
      }
      if (newCursor > unitsRow) {
        // this row is full, empty columns are allowed to break to the next row
        // which we signal with cursor < 0
        newCursor = isEmpty ? -1 * (newCursor % unitsRow) : incr;
      }
      // console.log(`cursor: ${cursor} -> ${newCursor} (+${incr}${isEmpty ? " (empty)" : ""})`);
      cursor = newCursor;
    };

    for (let idx = 0; idx < nKids; idx++) {
      let addStartClass = false;
      const unitsMoveAhead = before[idx] + (idx > 0 ? after[idx - 1] : 0);
      const unitsThisItem = Math.min(widths[idx], unitsRow);

      let unitsRowRemaining = unitsRow - cursor;

      if (unitsMoveAhead > 0) {
        updateCursor(unitsMoveAhead, true);
        if (cursor < 0) {
          cursor = Math.abs(cursor);
          // adding empty cols caused a row wrap, so we need a start class if
          // 1. we're not at the beginning of the row
          // 2. But: if the current item is wider than the remaining space after
          //    accounting for empty columns, reset cursor to start of the row
          //    rather than causing an empty row.
          if (widths[idx] > unitsRow - cursor) {
            cursor = 0;
          }
          unitsRowRemaining = 0;
        }
        addStartClass = unitsRowRemaining >= widths[idx] || cursor > 0;
      }

      if (cursor > 0 && cursor + widths[idx] > unitsRow) {
        // adding the current item would overflow the row, needs start class
        addStartClass = true;
        cursor = 0;
      }

      if (addStartClass) {
        addClassToEl(idx, `g-start-${breakName}-${cursor + 1}`);
      }

      addClassToEl(idx, `g-col-${breakName}-${unitsThisItem}`);
      updateCursor(unitsThisItem, false);
    }
  }
}

/**
 * Given an array and a length, return a new array of the specified length
 * containing the elements of the original array, recycled as necessary.
 *
 * @param arr The original array.
 * @param len The desired length of the new array.
 * @returns The new array.
 */
function recycleToLength<T>(arr: T[], len: number): T[] {
  const newArr = Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    newArr[i] = arr[i % arr.length];
  }
  return newArr;
}

/**
 * Check if a value is "missing". This exists to smooth over JSON-serialization
 * of `NULL` values in R, especially in cases where we don't want to auto-unbox
 * scalar values.
 *
 * @param x The value to check.
 * @returns `true` if the value is `null` or `[null]`, `false` otherwise.
 */
function isNA(x: any) {
  if (x === null) return true;
  if (Array.isArray(x) && x.length === 1 && x[0] === null) return true;
  return false;
}
