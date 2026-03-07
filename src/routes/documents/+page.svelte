<script lang="ts">
  import type { PageProps } from './$types';
  import { Button, TextInput, Pills, HeaderHero } from '$lib/components';
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
    { label: 'declaration', value: 'declarations' },
    { label: 'webinar', value: 'webinars' },
    { label: 'presentation', value: 'presentations' },
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
    let arr = sorted;

    if (query) {
      const regex = new RegExp(query.trim(), 'gi');
      arr = arr.filter((doc) => regex.test(doc.name));
    }

    if (category) {
      arr = arr.filter((doc) => doc['document-category'].id == category.value);
    }

    if (language) {
      arr = arr.filter((doc) => doc.variations.includes() == category.value);
    }

    return arr;
  });
  let count = $derived(filtered.length);
  let showAll = $state(false);
  let truncated = $derived(showAll ? filtered : filtered.slice(0, 20));
</script>

<HeaderHero h1={m.documents()} theme="one" />

<section id="search">
  <div class="liner">
    <h2 class="h2">{m.search_document()}</h2>

    <div class="fields">
      <div class="filter">
        <h3 class="label">{m.category()}</h3>

        <Pills
          options={categories}
          selected={category}
          onSelect={(option: Option | undefined) => (category = option)}
        />
      </div>

      <div class="filter">
        <h3 class="label">{m.language()}</h3>

        <Pills
          options={languages}
          selected={language}
          onSelect={(option: Option | undefined) => (language = option)}
        />
      </div>
      <div class="filter">
        <h3 class="label">{m.keyword()}</h3>

        <TextInput theme="classic" onKeyUp={(e) => (query = e.currentTarget.value)} />
      </div>
    </div>

    <div class="results">
      <p class="count">
        {#if count < 1}
          no matches
        {:else if count === 1}
          1 document
        {:else}
          {count} documents
        {/if}
      </p>
      {#if count > 0}
        <ul>
          {#each truncated as doc}
            <li>{@html query ? mark(doc.name, query) : doc.name}</li>
          {/each}
        </ul>
      {/if}
      {#if count > 20}
        {#if showAll}
          <Button
            label={m.show_less()}
            onClick={() => (showAll = false)}
            theme="medium secondary grey-border"
          />
        {:else}
          <Button
            label={m.show_all()}
            onClick={() => (showAll = true)}
            theme="medium secondary grey-border"
          />
        {/if}
      {/if}
    </div>
  </div>
</section>

<section id="request">
  <div class="liner">
    <h2 class="h2">{m.request_document()}</h2>
    <p class="p">{m.request_document_text()}</p>
    <Button
      label="REACH@interflux.com"
      url="mailto:REACH@interflux.com"
      theme="primary large orange icon-floats-left"
      icon="email"
    />
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .liner {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  #search {
    padding: 100px 0;

    .liner {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .filter {
        display: flex;
        h3 {
          width: 100px;
          flex-shrink: 0;
          line-height: 35px;
        }
      }
    }

    .results {
      background-color: $grey-0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      p.count {
        line-height: 100%;
      }
      ul {
        display: flex;
        flex-direction: column;
        gap: 4px;
        li {
          background-color: white;
          padding: 12px 20px;
          border: 1px solid $grey-1;
          border-radius: 3px;
        }
      }
    }
  }

  #request {
    padding: 0 0 100px;

    .liner {
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-items: flex-start;
    }

    p {
      max-width: 500px;
    }
  }
</style>
