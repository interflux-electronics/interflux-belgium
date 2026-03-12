<script lang="ts">
  import type { PageProps } from './$types';
  import { Button, TextInput, Pills, HeaderHero, Svg } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import { sortBy, mark } from '$lib/helpers';
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import type { Option } from '$lib/components/Pills.svelte';
  import { downcase } from '$lib/helpers';
  import { modal } from '$lib/state/modal.svelte';
  import RequestDocumentModal from '$lib/components/RequestDocumentModal.svelte';
  import type { Product, File, Language, Category } from '$lib/types';

  interface Document {
    id: string;
    name: string;
    path: string;
    variations: string;
    'document-category': any;
  }

  let { data }: PageProps = $props();

  const categories: Category[] = [
    { id: 'TD', label: 'TD', long: m.td(), icon: 'file-spreadsheet' },
    { id: 'SDS', label: 'SDS', long: m.sds(), icon: 'file-medical' },
    { id: 'REACH', label: m.reach(), icon: 'flask-potion' },
    { id: 'certificates', label: m.certificate(), icon: 'file-certificate' },
    { id: 'declarations', label: m.declaration(), icon: 'megaphone' },
    { id: 'webinars', label: downcase(m.webinar()), icon: 'video' },
    { id: 'guides', label: m.guide(), icon: 'lightbulb' },
    { id: 'presentations', label: m.presentation(), icon: 'presentation' }
  ];

  const languages: Language[] = [
    { id: 'EN', label: m.english() },
    { id: 'DE', label: m.german() },
    { id: 'FR', label: m.french() },
    { id: 'JA', label: m.japanese() }
  ];

  let query: string | '' = $state('');
  let category: Option | undefined = $state(undefined);
  let language: Option | undefined = $state(undefined);

  let files = $derived.by(() => {
    const english = languages.find((l) => l.id === 'EN');
    const sds = categories.find((c) => c.id === 'SDS');
    const reach = categories.find((c) => c.id === 'REACH');

    const list = data.documents
      .map((doc: Document) => {
        return doc.variations.split(',').map((ext: string) => {
          let language = languages.find((l) => l.id === ext.split('.')[0]);

          // For documents without language naming convention, assume English.
          if (!language) {
            language = languages.find((l) => l.id === 'EN');
          }

          return {
            label: doc.name,
            language,
            category: categories.find((c) => c.id === doc['document-category'].id),
            url: `${PUBLIC_CDN_HOST}/${doc.path}-${ext}`
          };
        });
      })
      .flat();

    data.products.forEach((p: Product) => {
      list.push({
        label: `SDS ${p.name}`,
        language: english,
        category: sds,
        onClick: (file: File) => modal.open(RequestDocumentModal, { file })
      });
    });

    list.push({
      label: m.reach_related_docs(),
      language: english,
      category: reach,
      onClick: (file: File) => modal.open(RequestDocumentModal, { file })
    });

    return list;
  });

  let sorted = $derived(files.sort(sortBy('label')));
  let filtered = $derived.by(() => {
    let arr = sorted;

    if (query) {
      const regex = new RegExp(query.trim(), 'gi');
      arr = arr.filter((file: File) => regex.test(file.label));
    }

    if (category) {
      arr = arr.filter((file: File) => file.category?.id === category?.id);
    }

    if (language) {
      arr = arr.filter((file: File) => file.language?.id === language?.id);
    }

    return arr;
  });
  let count = $derived(filtered.length);

  let count_in_words = $derived.by(() => {
    if (count < 1) {
      return m.no_matches_for({ query });
    }

    if (count === 1) {
      return m.one_document();
    }

    return m.many_documents({ count });
  });

  const TRUNC = 12;

  let showAll = $state(false);
  let docsTruncated = $derived(showAll ? filtered : filtered.slice(0, TRUNC));

  let categoryOptions: Option[] = $derived.by(() => {
    return categories.filter((cat) => {
      return filtered.find((file: File) => file.category.id === cat.id);
    });
  });

  let languageOptions: Option[] = $derived.by(() => {
    return languages.filter((lang) => {
      return filtered.find((file: File) => file.language.id === lang.id);
    });
  });
</script>

{#snippet docLink(file: File)}
  <div class="labels">
    <div class="left">
      <p>
        {@html query ? mark(file.label, query) : file.label}
      </p>
    </div>

    <div class="right">
      {#if file.category}
        <p>{file.category.long || file.category.label}</p>
      {/if}

      {#if file.language}
        <p>{file.language.label}</p>
      {/if}
    </div>
  </div>

  <div class="icon">
    <Svg name={file.category.icon} />
  </div>
{/snippet}

<HeaderHero h1={m.documents()} theme="one" />

<section id="search">
  <div class="liner">
    <h2 class="h2">{m.document_search_h2()}</h2>

    <div class="fields">
      <div class="filter">
        <TextInput
          theme="large grey-border"
          icon="search"
          onKeyUp={(e) => (query = e.currentTarget.value)}
        />
      </div>

      {#if categoryOptions.length > 0 || category}
        <div class="filter">
          <h3 class="label">{m.category()}</h3>

          <Pills
            options={categoryOptions}
            selected={category}
            onSelect={(option: Option | undefined) => (category = option)}
          />
        </div>
      {/if}

      {#if languageOptions.length > 0 || language}
        <div class="filter">
          <h3 class="label">{m.language()}</h3>

          <Pills
            options={languageOptions}
            selected={language}
            onSelect={(option: Option | undefined) => (language = option)}
          />
        </div>
      {/if}
    </div>

    <div class="results">
      <p class="count">{count_in_words}</p>
      {#if count > 0}
        <div class="documents">
          {#each docsTruncated as doc}
            {#if doc.url}
              <a href={doc.url} target="_blank" class="document">
                {@render docLink(doc)}
              </a>
            {/if}

            {#if doc.onClick}
              <button onclick={() => doc.onClick(doc)} class="document">
                {@render docLink(doc)}
              </button>
            {/if}
          {/each}
        </div>
      {/if}
      {#if count > TRUNC}
        <div class="expand">
          {#if showAll}
            <Button
              label={m.show_less()}
              onClick={() => (showAll = false)}
              theme="secondary"
              size="medium"
            />
          {:else}
            <Button
              label={`${m.show_all()} (${count})`}
              onClick={() => (showAll = true)}
              theme="secondary"
              size="medium"
            />
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>

<section id="request">
  <div class="liner">
    <h2 class="h2">{m.document_request_h2()}</h2>
    <p class="p">{m.document_request_p()}</p>
    <Button
      label="Request document"
      theme="primary orange"
      size="large"
      icon="email"
      onClick={() => modal.open(RequestDocumentModal)}
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
        min-height: 36px;
        &:first-child {
          margin-bottom: 20px;
        }
        h3 {
          width: 90px;
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
      .documents {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .document {
          display: flex;
          align-items: stretch;
          background: none;
          border: none;
          padding: 0;
          &:hover,
          &:focus {
            cursor: pointer;
            box-shadow: 0 3px 6px rgba(black, 0.2);
            border-radius: 3px;
            outline: 0;
            .labels {
              border-color: $green-1;
              box-shadow: 0 0 0 1px $green-1;
            }
            .icon {
              border-color: $green-1;
              box-shadow: 0 0 0 1px $green-1;
            }
          }
          .labels {
            background-color: white;
            border: 1px solid $grey-2;
            border-right: 0;
            border-radius: 3px 0 0 3px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            box-sizing: border-box;
            width: 100%;
            min-height: 50px;
            transition: box-shadow 400ms $easeOutExpo;
            .left {
              display: flex;
              gap: 12px;
              align-items: center;
              p {
                font-size: 16px;
                margin: 0;
              }
            }
            .right {
              display: flex;
              align-items: center;
              gap: 20px;
              p {
                font-size: 15px;
                color: $grey-5;
                margin: 0;
              }
            }
          }

          .icon {
            width: 50px;
            background-color: $green-1;
            border: 1px solid $green-2;
            border-radius: 0 5px 5px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
          }
        }
      }
      .expand {
        display: flex;
        justify-content: center;
      }
    }
  }

  #request {
    padding: 0 0 100px;
    h2 {
      line-height: 100%;
    }
    .liner {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
    }
    p {
      max-width: 400px;
    }
  }
</style>
