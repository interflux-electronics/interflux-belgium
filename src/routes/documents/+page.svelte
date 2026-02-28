<script lang="ts">
  import type { PageProps } from './$types';
  import { Button, Search, Pills } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import { sortBy, mark } from '$lib/helpers';

  let { data }: PageProps = $props();

  interface Option {
    label: string;
    value?: string;
  }

  const categories = [
    { label: 'technical data (TD)', value: 'TD' },
    { label: 'safety data sheet (SDS)', value: 'SDS' },
    { label: 'certificate', value: 'certificates' },
    { label: 'declaration', value: 'declaration' },
    { label: 'webinar', value: 'webinar' },
    { label: 'presentation', value: 'presentation' },
    { label: 'guide', value: 'guides' },
    { label: 'REACH', value: 'REACH' }
  ];

  const languages = [
    { label: 'English', value: 'EN' },
    { label: 'German', value: 'DE' },
    { label: 'French', value: 'FR' },
    { label: 'Japanese', value: 'JP' }
  ];

  let query: string | undefined = $state(undefined);
  let category: Option | undefined = $state(undefined);
  let language: Option | undefined = $state(undefined);

  let docs = $derived(data.documents);
  let sorted = $derived(docs.sort(sortBy('name')));
  let filtered = $derived.by(() => {
    if (!query) {
      return sorted;
    }

    const regex = new RegExp(query.trim(), 'gi');

    return sorted.filter((doc) => regex.test(doc.name));
  });
  let count = $derived(filtered.length);
  let showAll = $state(false);
  let truncated = $derived(showAll ? filtered : filtered.slice(0, 10));
</script>

<section id="hero">
  <h1>Documents</h1>
</section>

<section id="search">
  <div class="liner">
    <h2>{m.search_document()}</h2>

    <div class="filters">
      <p>Query: {query}</p>
      <Search label="Keyword" {query} onKeyUp={(e) => (query = e.target.value)} />

      <Pills
        label="Category"
        options={categories}
        onSelect={(option: Option | undefined) => (category = option)}
        selected={category}
      />

      <Pills
        label="Language"
        options={languages}
        onSelect={(option: Option | undefined) => (language = option)}
        selected={language}
      />
    </div>

    <div class="results">
      <p>{count} documents</p>
      <ul>
        {#each truncated as doc}
          <li>{@html query ? mark(doc.name, query) : doc.name}</li>
        {/each}
      </ul>
      {#if count > 10}
        {#if showAll}
          <Button label={m.show_less()} onclick={() => (showAll = false)} />
        {:else}
          <Button label={m.show_all()} onclick={() => (showAll = true)} />
        {/if}
      {/if}
    </div>
  </div>
</section>

<section id="request">
  <div class="liner">
    <h2>{m.request_document()}</h2>
    <p>{m.request_document_text()}</p>
    <Button label="REACH@interflux.com" url="mailto:REACH@interflux.com" />
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #hero {
    background-color: $grey-1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px;
  }
  .liner {
    max-width: 800px;
    margin: 0 auto;
  }
  ul {
    background-color: $grey-1;
    li {
      background-color: white;
    }
  }
</style>
