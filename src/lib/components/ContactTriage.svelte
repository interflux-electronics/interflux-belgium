<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import Pills from '$lib/components/Pills.svelte';
  import Search from '$lib/components/Search.svelte';
  import Svg from '$lib/components/Svg.svelte';
  import Button from '$lib/components/Button.svelte';
  import Flag from '$lib/components/Flag.svelte';
  import { PUBLIC_API_HOST as apiHost } from '$env/static/public';
  import type { Option } from '$lib/components/Pills.svelte';
  import type { CountryData, DocumentData, Company } from '$lib/types';

  interface Props {
    isLoading: boolean;
  }

  let { isLoading }: Props = $props();

  let intention: Option | undefined = $state(undefined);
  let intentionOptions: Option[] = $derived.by(() => {
    return [
      { id: 'order', label: m.triage_3() },
      { id: 'support', label: m.triage_4() },
      { id: 'document', label: m.triage_5() },
      { id: 'other', label: m.something_else() }
    ];
  });

  let country: Option | undefined = $state(undefined);

  let statusCompanies: 'idle' | 'fetching' | 'error' | 'done' = $state('idle');
  let companiesForCountry: Company[] = $state([]);

  function onCountrySelect(result: CountryData) {
    const option = { id: result.id, label: result.attributes['name-english'] };
    const match = countryOptions.find((c) => c.id === result.id);

    country = option;

    if (!match) {
      countryOptions = [...countryOptions, option];
    }
  }

  $effect(() => {
    if (country) {
      fetchRecommendations();
    } else {
      statusCompanies = 'idle';
    }
  });

  async function fetchRecommendations() {
    if (!country) {
      return;
    }

    statusCompanies = 'fetching';

    const url = `${apiHost}/company-markets?filter[country-id]=${country.id}`;

    try {
      const response = await fetch(url);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const data = json.data;

      console.log({ data });

      companiesForCountry = data;
      statusCompanies = 'done';
    } catch (error) {
      console.error('❌ recommendation fetch failed:', error);
      statusCompanies = 'error';
    }
  }

  // List of all previously selected countries
  // TODO: add country of logged in user
  // TODO: add country of IP
  // TODO: derived country from browser language
  let countryOptions: Option[] = $state([]);

  let neededDocument: Option | undefined = $state(undefined);
  let documentOptions: Option[] = $derived.by(() => {
    return [
      { id: 'sds', label: m.sds() },
      { id: 'other', label: m.something_else() }
    ];
  });

  let foundDoc: Option | undefined = $state(undefined);
  let yesNoOptions: Option[] = $derived.by(() => {
    return [
      { id: 'yes', label: m.yes() },
      { id: 'no', label: m.no() }
    ];
  });
</script>

<section id="triage">
  <div class="liner">
    <h2 class="h2">{m.triage_1()}</h2>

    <div class="step">
      <h3 class="h3">{m.triage_2()}</h3>
      {#if isLoading}
        <p class="p">{m.loading()}</p>
      {:else}
        <Pills
          options={intentionOptions}
          selected={intention}
          onSelect={(option: Option | undefined) => (intention = option)}
          layout="vertical"
        />
      {/if}
    </div>

    {#if intention?.id === 'order'}
      <div class="step">
        <h3 class="h3">{m.triage_order_1()}</h3>

        {#if !country}
          <Search resource="country" onSelect={onCountrySelect} />
        {/if}

        {#if country}
          <Pills
            options={countryOptions}
            selected={country}
            onSelect={(option: Option | undefined) => (country = option)}
            layout="vertical"
          />
        {/if}
      </div>

      {#if country}
        <div class="step">
          {#if statusCompanies === 'error'}
            <p>{m.search_error()}</p>
          {:else if statusCompanies === 'fetching'}
            <p>{m.loading()}</p>
          {:else if statusCompanies === 'done'}
            <h3 class="h3">
              {companiesForCountry.length === 1 ? m.triage_order_3() : m.triage_order_2()}
            </h3>

            <ol class="companies">
              {#each companiesForCountry as company (company.id)}
                <li>
                  <Flag country={company.country} />
                  <p>
                    <Button url="/contact/map/{company.slug}" label={company.businessName} />
                  </p>
                  {#if company.isRecommended}
                    <p class="recommended">
                      <Svg name="thumbs-up" />
                      <span>
                        {m.recommended()}
                      </span>
                    </p>
                  {/if}
                </li>
              {/each}
            </ol>
          {/if}
        </div>
      {/if}
    {/if}

    {#if intention?.id === 'support'}
      <div class="step">
        <h3 class="h3">{m.triage_support_1()}</h3>
        <p>
          <a href="mailto:support@interflux.com">support@interflux.com</a>
        </p>
        <p>
          {m.triage_support_2()}
        </p>
        <ul class="bullets">
          <li>{m.triage_support_3()}</li>
          <li>{m.triage_support_4()}</li>
          <li>{m.triage_support_5()}</li>
          <li>{m.triage_support_6()}</li>
        </ul>
      </div>
    {/if}

    {#if intention?.id === 'document'}
      <div class="step">
        <h3 class="h3">{m.triage_doc_1()}</h3>

        <Pills
          options={documentOptions}
          selected={neededDocument}
          onSelect={(option: Option | undefined) => (neededDocument = option)}
          layout="vertical"
        />
      </div>

      {#if neededDocument?.id === 'sds'}
        <div class="step">
          <h3 class="h3">{m.triage_doc_2()}</h3>
          <p>
            <a href="mailto:reach@interflux.com">reach@interflux.com</a>
          </p>
        </div>
      {/if}

      {#if neededDocument?.id === 'other'}
        <div class="step">
          <h3 class="h3">{m.triage_doc_3()}</h3>

          <!-- <TextInput
          theme="large grey-border"
          icon="search"
          onKeyUp={(e) => (query = e.currentTarget.value)}
        /> -->

          <!-- <Search
          @value={document}
          @onSelect={onDocumentSelect}
          @searchModel='document'
          @searchLabel='name'
          @searchFilter='name'
          @minKeyStrokes='1'
        /> -->

          <!-- {#if this.document}
          <div class='links'>
            {{#each this.document.files as |file|}
              <p class='p'>
                <Svg::File />
                <Link @url={{file.url} @label={{file.language} />
              </p>
            {{/each}
          </div>
        {/if} -->

          <Pills
            options={yesNoOptions}
            selected={foundDoc}
            onSelect={(option: Option | undefined) => (foundDoc = option)}
            layout="horizontal"
          />
        </div>
      {/if}

      {#if foundDoc?.id === 'yes'}
        <div class="step">
          <h3 class="h3">{m.triage_doc_4()}</h3>
        </div>
      {/if}

      {#if foundDoc?.id === 'no'}
        <div class="step">
          <h3 class="h3">{m.triage_doc_5()}</h3>
          <p>
            <a href="mailto:ask@interflux.com">ask@interflux.com</a>
          </p>
        </div>
      {/if}
    {/if}

    {#if intention?.id === 'other'}
      <div class="step">
        <h3 class="h3">{m.triage_other_1()}</h3>
        <p class="p">
          <a href="mailto:ask@interflux.com">ask@interflux.com</a>
        </p>
        <p class="p">
          {m.triage_other_2()}
        </p>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #triage {
    @include dashed-line-on-top;

    .liner {
      display: flex;
      flex-direction: column;
      @include widescreen {
        max-width: 900px;
        padding: 100px 30px;
      }
      @include desktop {
        max-width: vw(900px);
        padding: vw(100px) vw(30px);
      }
      @include tablet {
        padding: 14vw 5vw;
      }
      @include mobile {
        padding: 28vw 8vw;
      }
    }
    h2 {
      @include widescreen {
        margin-bottom: 32px;
        line-height: 100%;
      }
      @include desktop {
        margin-bottom: vw(32px);
        line-height: 100%;
      }
      @include tablet {
        margin-bottom: vw-tablet(32px);
        line-height: 100%;
      }
      @include mobile {
        margin-bottom: vw-mobile(32px);
      }
    }
    h3 + .search,
    h3 + ol,
    h3 + :global(.pills) {
      @include widescreen {
        margin-top: 20px;
      }
      @include desktop {
        margin-top: vw(20px);
      }
      @include tablet {
        margin-top: vw-tablet(20px);
      }
      @include mobile {
        margin-top: vw-mobile(20px);
      }
    }
    p + ul.bullets {
      @include widescreen {
        margin-top: 18px;
        margin-left: 18px;
      }
      @include desktop {
        margin-top: vw(18px);
        margin-left: vw(18px);
      }
      @include tablet {
        margin-top: vw-tablet(18px);
        margin-left: vw-tablet(18px);
      }
      @include mobile {
        margin-top: vw-mobile(18px);
        margin-left: vw-mobile(18px);
      }
    }
    p + p,
    h3 + p,
    .search + .pills {
      @include widescreen {
        margin-top: 18px;
      }
      @include desktop {
        margin-top: vw(18px);
      }
      @include tablet {
        margin-top: vw-tablet(18px);
      }
      @include mobile {
        margin-top: vw-mobile(18px);
      }
    }
    .step + .step {
      @include dashed-line-on-top;
      @include widescreen {
        margin-top: 40px;
        padding-top: 40px;
      }
      @include desktop {
        margin-top: vw(40px);
        padding-top: vw(40px);
      }
      @include tablet {
        margin-top: vw-tablet(40px);
        padding-top: vw-tablet(40px);
      }
      @include mobile {
        margin-top: vw-mobile(40px);
        padding-top: vw-mobile(40px);
      }
    }
    ul.bullets {
      list-style: disc;
      li {
        line-height: 180%;
        @include widescreen {
          padding-left: 6px;
        }
        @include desktop {
          padding-left: vw(6px);
        }
        @include tablet {
          padding-left: vw-tablet(6px);
        }
        @include mobile {
          padding-left: vw-mobile(6px);
        }
      }
    }
    ol.companies {
      li {
        display: flex;
        align-items: center;
        @include widescreen {
          height: 40px;
          gap: 16px;
        }
        @include desktop {
          height: vw(40px);
          gap: vw(16px);
        }
        @include tablet {
          height: vw-tablet(40px);
          gap: vw-tablet(16px);
        }
        @include mobile {
          height: vw-mobile(40px);
          gap: vw-mobile(16px);
        }
        p.recommended {
          background: var(--orange-3);
          color: white;
          display: flex;
          margin: 0;
          line-height: 165%;
          padding: 0 10px;
          gap: 8px;
          @include widescreen {
            padding: 0 10px;
            gap: 8px;
          }
          @include desktop {
            padding: 0 vw(10px);
            gap: vw(8px);
          }
          @include tablet {
            padding: 0 vw-tablet(10px);
            gap: vw-tablet(8px);
          }
          @include mobile {
            padding: 0 vw-mobile(10px);
            gap: vw-mobile(8px);
          }
          svg {
            height: auto;
            @include widescreen {
              width: 15px;
            }
            @include desktop {
              width: vw(15px);
            }
            @include tablet {
              width: vw-tablet(15px);
            }
            @include mobile {
              width: vw-mobile(15px);
            }
            [fill] {
              fill: white;
            }
          }
        }
      }
    }
    .links {
      display: flex;
      flex-direction: column;
      border: 1px dashed var(--grey-1);
      @include widescreen {
        padding: 20px 24px;
        margin: 30px 0;
      }
      @include desktop {
        padding: vw(20px) vw(24px);
        margin: vw(30px) 0;
      }
      @include tablet {
        padding: vw-tablet(20px) vw-tablet(24px);
        margin: vw-tablet(30px) 0;
      }
      @include mobile {
        padding: vw-mobile(20px) vw-mobile(24px);
        margin: vw-mobile(30px) 0;
      }
      p {
        display: flex;
        align-items: center;
        @include widescreen {
          gap: 8px;
        }
        @include desktop {
          gap: vw(8px);
        }
        @include tablet {
          gap: vw-mobile(8px);
        }
        @include mobile {
          gap: vw-tablet(8px);
        }
      }
      p + p {
        margin-top: 6px;
        @include widescreen {
          margin-top: 6px;
        }
        @include desktop {
          margin-top: vw(6px);
        }
        @include tablet {
          margin-top: vw-mobile(6px);
        }
        @include mobile {
          margin-top: vw-tablet(6px);
        }
      }
      svg {
        height: auto;
        @include widescreen {
          width: 18px;
        }
        @include desktop {
          width: vw(18px);
        }
        @include tablet {
          width: vw-mobile(18px);
        }
        @include mobile {
          width: vw-tablet(18px);
        }
        [fill] {
          fill: var(--grey-7);
        }
      }
    }
    .search {
      .wrapper {
        @include widescreen {
          width: 300px;
        }
        @include desktop {
          width: vw(300px);
        }
        @include tablet {
          width: vw-tablet(300px);
        }
        @include mobile {
          width: 100%;
        }
      }
    }
  }
</style>
