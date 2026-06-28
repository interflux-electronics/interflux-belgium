<script lang="ts">
  import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
  import { m } from '$lib/paraglide/messages';
  import TextInput from './TextInput.svelte';
  import type { CountryData, DocumentData } from '$lib/types';
  // import type { Snippet } from 'svelte';
  // import { sortBy } from '$lib/helpers';

  export type SearchResult = CountryData | DocumentData;

  interface Props {
    resource: 'country' | 'document';
    onSelect: (result: SearchResult | undefined) => void;
    minKeyStrokes?: number;
    // theme?: string;
    // children?: Snippet;
  }

  let {
    resource,
    onSelect,
    minKeyStrokes = 1
    // theme = 'primary',
    // children
  }: Props = $props();

  // the outer most HTML element
  // used for for accessing <input> within
  let search: HTMLElement;

  let input: HTMLInputElement | undefined = $state(undefined);

  let focus: boolean = $state(false);
  let hover: boolean = $state(false);
  // let status: 'idle' | 'warning' | 'error' | 'saving' | 'dirty' = $state('idle');

  let classes = $derived(
    [
      hover ? 'hover' : 'no-hover',
      focus ? 'focus' : 'no-focus'
      // status,
      // theme,
    ].join(' ')
  );

  const RESOURCES = {
    country: {
      filter: 'name-english',
      apiPath: '/v1/public/countries'
    },
    document: {
      filter: 'name',
      apiPath: '/v1/public/documents'
    }
  };

  let filter = $derived(RESOURCES[resource]?.filter);
  let apiPath = $derived(RESOURCES[resource]?.apiPath);

  let query: string | '' = $state('');
  let mostRecentQuery: string | '' = $state('');
  let isSearching: boolean = $state(false);
  let hasError: boolean = $state(false);
  let resultsForQuery: CountryData[] | DocumentData[] = $state([]);
  let resultsCount = $derived(resultsForQuery.length);
  let showResults = $derived(query.length >= minKeyStrokes);

  let keepTypingMessage = $derived.by(() => {
    if (!query) {
      return m.type_to_search();
    }

    return m.type_more({ n: query.length, max: minKeyStrokes });
  });

  let buttons = $derived.by(() => {
    if (!resultsForQuery) {
      return [];
    }

    return resultsForQuery.map((result: SearchResult, i) => {
      return {
        result,
        label: result.attributes[filter],
        classes: i === highlight ? 'highlight' : 'idle',
        shown: i >= rangeMin && i < rangeMax
      };
    });
  });

  let rangeMax = $derived(rangeMin + 6);
  let rangeMin = $derived.by(() => {
    const i = highlight;
    const min = 0;
    const max = min + 5;

    if (i === 0) {
      return 0;
    }

    if (i < min) {
      return i;
    }

    if (i > max) {
      return i - 5;
    }

    return 0;
  });

  function selectText() {
    search.querySelector('input')?.select();
  }

  // HIGHLIGHT

  // the result which is in focus via mouse hover or key strokes
  // pressing enter or clicking would select that result
  // the index of the highlighted result

  let highlight: number = $state(0);

  // FOCUS

  function onFocus() {
    focus = true;
    selectText();
    searchDatabase();
  }

  function onBlur() {
    focus = false;
    query = '';

    // TODO: reset query to start value
  }

  // HOVER

  function onMouseOver() {
    hover = true;
  }

  function onMouseOut() {
    hover = false;
  }

  function onMouseOverButton(i: number) {
    if (highlight != i) {
      highlight = i;
    }
  }

  function onMouseDown(result: SearchResult) {
    select(result);
  }

  // KEY STROKES

  function onKeyDown(event) {
    // On arrow down, highlight the next result
    if ('ArrowDown' === event.key) {
      const n = resultsCount;
      const i = highlight;
      let ii = i + 1;
      if (ii >= n) {
        ii = 0;
      }
      highlight = ii;
    }

    // On arrow up, highlight the previous result
    if ('ArrowUp' === event.key) {
      const n = resultsCount;
      const i = highlight;
      let ii = i - 1;
      if (ii < 0) {
        ii = n - 1;
      }
      highlight = ii;
    }

    if ('Enter' === event.key) {
      const i = highlight;
      const result = resultsForQuery[i];
      select(result);
    }
  }

  // Only update, search and reset highlight if the value has changed.
  // Only hit the API if the query has changed.
  // Ignore key presses such as ENTER and ARROW_DOWN
  function onKeyUp(event) {
    const queryHasChanged = event.target.value !== query;

    if (queryHasChanged) {
      highlight = 0;
      rangeMin = 0;
      searchDatabase();
    }
  }

  // SEARCHING

  async function searchDatabase() {
    // Store query as local variable for concurrency
    const q = query;

    if (q.length < minKeyStrokes) {
      console.warn(`🧊 SKIP search, not enough strokes "${q}"`);
      return;
    }

    // TODO: early exit with cached results

    console.debug(`🛰️ searching "${q}"`);

    // Store the query for later
    mostRecentQuery = q;

    // Reset
    resultsForQuery = [];
    highlight = 0;
    rangeMin = 0;
    hasError = false;

    // Show loading state
    isSearching = true;

    // Prepare API URL
    //
    // The URLs should look like this:
    // http://localhost:3000/v1/public/countries?filter[nameEnglish]=~*bel
    // http://localhost:3000/v1/public/countries?filter%5BnameEnglish%5D=~*bel
    //
    // Our Rails backend with Postgres database uses POSIX regexes:
    // https://www.postgresql.org/docs/9.6/functions-matching.html#FUNCTIONS-POSIX-TABLE
    //
    // Prefix the query with:
    //
    //       no prefix for exact match
    // ~     match regex, case sensitive
    // ~*    match regex, case insensitive
    // !~    does not match regex, case sensitive
    // !~*   does not match regex, case insensitive
    //
    const url = `${apiHost}/${apiPath}?filter[${filter}]=~*${q}`;

    // Fetch data
    const response = await fetch(url);

    if (response.status != 200) {
      hasError = true;
      console.error('❌ search failed');
      return;
    }

    const json = await response.json();
    const data = json.data;

    // Here we sort results that start with the query to the top and the rest below.
    // Both groups are sorted alphabetically before being merged into one array.
    const startsWith = (result: SearchResult, include = true) => {
      const value = result.attributes[filter]?.toLowerCase();
      const bool = value.startsWith(q.toLowerCase());

      return include ? bool : !bool;
    };

    // TODO: SORT
    const arr1 = data.filter((result: SearchResult) => startsWith(result, true));
    const arr2 = data.filter((result: SearchResult) => startsWith(result, false));
    const arr = [...arr1, ...arr2];

    // In case multiple request were sent by a user typing quickly, we are only interested in the
    // response of the most recent query.
    if (mostRecentQuery === q) {
      resultsForQuery = arr;
    } else {
      console.warn('dropping response for:', q);
    }

    // We add an intentional delay to allow the <Search> component to render the results before
    // ending the loading its loading state.
    // await window.delay(100);

    isSearching = false;
  }

  // SELECTING

  function select(result: SearchResult) {
    onSelect(result);

    // Upon select, remove focus form <input>
    search.querySelector('input')?.blur();
  }

  // HOOK

  $effect(() => {
    if (query) {
      searchDatabase();
    }
  });
</script>

<div class="search {classes}" bind:this={search}>
  <div class="wrapper">
    <TextInput
      type="search"
      icon="search"
      theme="large grey-border"
      {onFocus}
      {onBlur}
      {onMouseOver}
      {onMouseOut}
      {onKeyDown}
      {onKeyUp}
      bind:value={query}
      bind:inputRef={input}
    />

    {#if !hasError}
      {#if focus}
        {#if isSearching}
          <p class="message searching">{m.searching()}</p>
        {:else if showResults}
          <div class="results">
            {#each buttons as btn, i (btn.result.id)}
              {#if btn.shown}
                <button
                  type="button"
                  class={btn.classes}
                  onmouseover={() => onMouseOverButton(i)}
                  onmousedown={() => onMouseDown(btn.result)}
                  onfocus={() => onMouseOverButton(i)}
                  onblur={() => onMouseDown(btn.result)}
                >
                  {btn.label}
                </button>
              {/if}
            {/each}

            {#if hasError}
              <p class="message error">{m.search_error()}</p>
            {:else}
              <p class="message">{m.search_count({ n: resultsCount })}</p>
            {/if}
          </div>
        {:else}
          <p class="message">{keepTypingMessage}</p>
        {/if}
      {/if}
    {/if}

    <!-- 
    {#if children}
      {@render children()}
    {/if} 
    -->
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  // The <Search> is nearly identical to the <Form::Input> and thus inherits all its styles.
  // See the <Form::Input> CSS, except for these overwrites:

  .search {
    display: flex;
    position: relative;
    z-index: 1; // to make the results be on top of elements at z-index: 1
    @include widescreen {
      height: 40px;
    }
    @include desktop {
      height: vw(40px);
    }
    @include tablet {
      height: vw-tablet(40px);
    }
    @include mobile {
      height: vw-mobile(40px);
    }
    &.hover {
      .wrapper {
        border-color: var(--blue-0);
      }
    }
    &.focus {
      .wrapper {
        z-index: 0;
        border-color: var(--blue-0);
        @include widescreen {
          box-shadow: 0 2px 10px rgba(black, 0.15);
        }
        @include desktop {
          box-shadow: 0 vw(2px) vw(10px) rgba(black, 0.15);
        }
        @include tablet {
          box-shadow: 0 vw-tablet(2px) vw-tablet(10px) rgba(black, 0.15);
        }
        @include mobile {
          box-shadow: 0 vw-mobile(2px) vw-mobile(10px) rgba(black, 0.15);
        }
      }
    }
    .wrapper {
      position: absolute;
      background: white;
      border-style: solid;
      border-color: var(--grey-2);
      transition: box-shadow 300ms var(--ease-out-expo);
      overflow: hidden;
      @include widescreen {
        border-width: 1px;
        border-radius: 3px;
      }
      @include desktop {
        border-width: vw(1px);
        border-radius: vw(3px);
      }
      @include tablet {
        border-width: vw-tablet(1px);
        border-radius: vw-tablet(3px);
      }
      @include mobile {
        border-width: vw-mobile(1px);
        border-radius: vw-mobile(3px);
      }
      :global {
        input {
          border-color: transparent !important;
          box-shadow: none !important;
          border-radius: 0;
          width: 100%;
          @include widescreen {
            height: 38px; // 2px smaller because we use wrapper border instead of input border
          }
          @include desktop {
            height: vw(38px);
          }
          @include tablet {
            height: vw-tablet(38px);
          }
          @include mobile {
            height: vw-mobile(38px);
          }

          /* clears the 'X' from Internet Explorer */
          &::-ms-clear,
          &::-ms-reveal {
            display: none;
            width: 0;
            height: 0;
          }

          /* clears the 'X' from Chrome */
          &::-webkit-search-decoration,
          &::-webkit-search-cancel-button,
          &::-webkit-search-results-button,
          &::-webkit-search-results-decoration {
            display: none;
          }
        }
      }

      .icon {
        @include widescreen {
          width: 38px;
          height: 38px;
        }
        @include desktop {
          width: vw(38px);
          height: vw(38px);
        }
        @include tablet {
          width: vw-tablet(38px);
          height: vw-tablet(38px);
        }
        @include mobile {
          width: vw-mobile(38px);
          height: vw-mobile(38px);
        }
      }

      .results {
        padding-top: 1px;
        background: var(--grey-2);
        button {
          background: white;
          color: var(--grey-7);
          border: 0;
          display: block;
          width: 100%;
          text-align: left;
          outline: 0;
          @include widescreen {
            font-size: 15px;
            line-height: 36px;
            padding: 0 15px;
          }
          @include desktop {
            font-size: vw(15px);
            line-height: vw(36px);
            padding: 0 vw(15px);
          }
          @include tablet {
            font-size: vw-tablet(15px);
            line-height: vw-tablet(36px);
            padding: 0 vw-tablet(15px);
          }
          @include mobile {
            font-size: vw-mobile(15px);
            line-height: vw-mobile(36px);
            padding: 0 vw-mobile(15px);
          }
          &.highlight {
            background: var(--blue-0);
            box-shadow: var(--blue-0) 0 0 0 1px;
            color: white;
          }
          & + button {
            margin-top: 1px;
          }
        }
        p {
          background: #eee;
          color: var(--grey-7);
          @include widescreen {
            line-height: 28px;
            font-size: 15px;
            padding: 0 15px;
          }
          @include desktop {
            line-height: vw(28px);
            font-size: vw(15px);
            padding: 0 vw(15px);
          }
          @include tablet {
            line-height: vw-tablet(28px);
            font-size: vw-tablet(15px);
            padding: 0 vw-tablet(15px);
          }
          @include mobile {
            line-height: vw-mobile(28px);
            font-size: vw-mobile(15px);
            padding: 0 vw-mobile(15px);
          }
        }
        button + p {
          margin-top: 1px;
        }
      }
      p.message,
      p.searching {
        @include widescreen {
          font-size: 16px;
          line-height: 36px;
          padding: 0 15px;
        }
        @include desktop {
          font-size: vw(16px);
          line-height: vw(36px);
          padding: 0 vw(15px);
        }
        @include tablet {
          font-size: vw-tablet(16px);
          line-height: vw-tablet(36px);
          padding: 0 vw-tablet(15px);
        }
        @include mobile {
          font-size: vw-mobile(16px);
          line-height: vw-mobile(36px);
          padding: 0 vw-mobile(15px);
        }
      }
      p.message {
        background: #eee;
        color: var(--grey-7);
        a {
          color: var(--grey-7);
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        }
      }
      p.searching {
        color: white;
        background: var(--blue-0);
        background-color: var(--blue-0);
        background-image: url('#{$cdn}/images/admin/diagonals-blue.svg');
        background-size: 31px 31px;
        box-shadow: var(--blue-0) 0 0 0 1px;
        animation: translate-left-up 1400ms linear infinite;
        @keyframes translate-left-up {
          from {
            background-position: 0;
          }
          to {
            background-position: -30px -30px;
          }
        }
      }
    }
  }
</style>
