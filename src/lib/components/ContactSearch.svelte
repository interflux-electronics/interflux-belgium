<script lang="ts">
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { m } from '$lib/paraglide/messages';
  import TextInput from '$lib/components/TextInput.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import Flag from '$lib/components/Flag.svelte';
  import Svg from '$lib/components/Svg.svelte';
  import { mark } from '$lib/helpers';
  import { resolve } from '$app/paths';
  import chain from '$lib/helpers/chain';
  import type { Company } from '$lib/types';

  interface Props {
    companies: Company[];
    isLoading: boolean;
  }

  let { companies = [], isLoading }: Props = $props();

  let query: string | '' = $state('');

  let sortedCompanies = $derived.by(() => {
    const withRank = chain(companies).filterBy('order').sortBy('order'); // TODO: review
    const without = chain(companies).rejectBy('order').sortBy('businessName'); // TODO: review

    return [...withRank, ...without];
  });

  let filteredCompanies = $derived.by(() => {
    let arr = sortedCompanies;

    // Split search queries in to words so that "pac mlf" would show "IF Pacific 2009MLF"
    if (query) {
      const words = query.trim().split(' ');

      // Filter the original list
      arr = arr.filter((company: Company) => {
        // All words in the search query must match
        return words.every((word) => {
          const regex = new RegExp(word, 'gi');

          if (regex.test(company.businessName)) {
            return true;
          }

          if (regex.test(company.country.nameEnglish)) {
            return true;
          }

          return company.publicMembers.slice(0, 3).some((member) => {
            return regex.test(member.person.fullName);
          });
        });
      });
    }

    return arr;
  });

  let matches = $derived(filteredCompanies.length);
</script>

<section id="search">
  <div class="liner">
    <h2 class="h2">{m.contact_network_1()}</h2>

    {#if isLoading}
      <p>{m.loading()}</p>
    {:else}
      <p>{m.contact_network_2()}</p>

      <TextInput
        theme="large grey-border"
        icon="search"
        onKeyUp={(e) => (query = e.currentTarget.value)}
      />

      <ul class="companies">
        {#each filteredCompanies as company (company.id)}
          {@const country = company.country}

          <li>
            <a href={resolve(`/contact/map/${company.slug}`)}>
              <div class="company">
                <h3 class="h3">
                  {@html mark(company.businessName, query)}
                </h3>
              </div>

              <div class="country">
                <Flag {country} />
                <!-- TODO: translate -->
                <p>
                  {@html mark(country.nameEnglish, query)}
                </p>
              </div>

              <div class="members">
                <ul>
                  {#each company.publicMembers.slice(0, 3) as member (member.id)}
                    {@const person = member.person}

                    <li>
                      <div class="avatar">
                        {#if person.avatarPath}
                          <ResponsiveImage
                            path={person.avatarPath}
                            variations={person.avatarVariations}
                            alt={person.avatarAlt}
                          />
                        {:else}
                          <img
                            src="{cdnHost}/images/public/no-avatar.svg"
                            aria-hidden="true"
                            width="27"
                            height="27"
                            alt={person.fullName}
                          />
                        {/if}
                      </div>

                      <p>{@html mark(person.fullName, query)}</p>
                    </li>
                  {/each}
                </ul>
              </div>

              <div class="arrow">
                <Svg name="arrow-right" />
              </div>
            </a>
          </li>
        {/each}
      </ul>

      {#if matches === 0}
        <p>{m.no_matches_for({ query })}</p>
      {/if}
    {/if}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #search {
    background-color: var(--grey-0);

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
        margin-bottom: 30px;
        line-height: 100%;
      }
      @include desktop {
        margin-bottom: vw(30px);
        line-height: 100%;
      }
      @include tablet {
        margin-bottom: 3vw;
        line-height: 100%;
      }
      @include mobile {
        margin-bottom: 3vw;
      }
    }

    :global {
      .text-input {
        align-self: flex-start;
        @include widescreen {
          margin: 12px 0 30px;
        }
        @include desktop {
          margin: vw(12px) 0 (30px);
        }
        @include tablet {
          margin: 3vw 0;
        }
        @include mobile {
          margin: 4vw 0 8vw;
        }
      }
    }

    h3 {
      font-family: var(--bold);
      color: white;
      background-color: var(--blue-3);
      line-height: 135%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include widescreen {
        font-size: 16px;
        padding: 0 4px;
      }
      @include desktop {
        font-size: vw(16px);
        padding: 0 vw(4px);
      }
      @include tablet {
        font-size: vw-tablet(16px);
        padding: 0 vw-tablet(4px);
      }
      @include mobile {
        font-size: vw-mobile(16px);
        padding: 0 vw-mobile(4px);
      }
    }

    :global {
      mark {
        background: yellow;
      }
    }

    .companies {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      @include widescreen {
        gap: 5px;
      }
      @include desktop {
        gap: vw(5px);
      }
      @include tablet {
        gap: vw-tablet(5px);
      }
      @include mobile {
        gap: 2vw;
        width: 96vw;
        margin-left: -6vw;
      }
      a {
        background: white;
        border-radius: 3px;
        border: 1px solid var(--grey-1);
        display: flex;
        align-items: center;
        transition: box-shadow 200ms ease;
        white-space: normal; // override <Button> default
        text-align: left; // override <Button> default
        position: relative;
        color: var(--grey-7);
        @include widescreen {
          padding: 14px;
          gap: 10px;
        }
        @include desktop {
          padding: vw(14px);
          gap: vw(10px);
        }
        @include tablet {
          padding: 1.5vw 2.5vw;
          gap: vw-tablet(10px);
        }
        @include mobile {
          flex-direction: column;
          align-items: flex-start;
          padding: 6vw;
          gap: vw-mobile(10px);
        }
        &:hover,
        &:focus {
          border-color: var(--blue-0);
          box-shadow: 0 2px 4px rgba(black, 0.15);
          :global {
            [fill] {
              fill: var(--blue-0);
            }
          }
        }
      }
    }

    .company {
      flex: 1;
      display: flex;
    }

    .country {
      flex: 0.6;
      display: flex;
      align-items: center;
      @include widescreen {
        gap: 10px;
      }
      @include desktop {
        gap: vw(10px);
      }
      @include tablet {
        gap: vw-tablet(10px);
      }
      @include mobile {
        gap: vw-mobile(10px);
      }
      :global {
        img {
          height: auto;
          @include mobile {
            width: 6.75vw; // to make the flag as wide as the avatars
          }
        }
      }
    }

    .members {
      flex: 0.7;
      ul {
        display: flex;
        flex-direction: column;
        @include widescreen {
          gap: 10px;
        }
        @include desktop {
          gap: vw(10px);
        }
        @include tablet {
          gap: vw-tablet(10px);
        }
        @include mobile {
          gap: vw-mobile(10px);
        }
      }
      li {
        display: flex;
        align-items: center;
        @include widescreen {
          gap: 10px;
        }
        @include desktop {
          gap: vw(10px);
        }
        @include tablet {
          gap: vw-tablet(10px);
        }
        @include mobile {
          gap: vw-mobile(10px);
        }
      }
      :global {
        img {
          border-radius: 50%;
          @include widescreen {
            width: 27px;
            height: 27px;
          }
          @include desktop {
            width: vw(27px);
            height: vw(27px);
          }
          @include tablet {
            width: vw-tablet(27px);
            height: vw-tablet(27px);
          }
          @include mobile {
            width: vw-mobile(27px);
            height: vw-mobile(27px);
          }
        }
      }
    }

    .arrow {
      @include mobile {
        position: absolute;
        top: 0;
        right: 4vw;
        height: 100%;
        display: flex;
        align-items: center;
      }
      :global {
        svg {
          width: auto;
          @include widescreen {
            height: 10px;
          }
          @include desktop {
            height: vw(10px);
          }
          @include tablet {
            height: vw-tablet(10px);
          }
          @include mobile {
            height: vw-mobile(10px);
          }
          [fill] {
            fill: var(--grey-5);
          }
        }
      }
    }
  }
</style>
