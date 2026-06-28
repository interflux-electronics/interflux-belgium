<script lang="ts">
  import type { Event } from '$lib/types';
  import Button from '$lib/components/Button.svelte';
  import Link from '$lib/components/Link.svelte';
  import Svg from '$lib/components/Svg.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Flag from '$lib/components/Flag.svelte';
  import { m } from '$lib/paraglide/messages';
  import { markdown, sortBy } from '$lib/helpers';

  interface Props {
    events?: Event[];
    isLoading: boolean;
  }

  let { events, isLoading }: Props = $props();

  let view = $derived.by(() => {
    if (isLoading) {
      return 'loading';
    }

    if (events && events.length > 0) {
      return 'has-events';
    }

    return 'no-events';
  });

  function collapseSiblings(event: MouseEvent) {
    const clickedSummary = event.currentTarget;
    const openDetails = document.querySelectorAll('details[open]');
    openDetails.forEach((details) => {
      const summary = details.querySelector('summary');
      if (summary !== clickedSummary) {
        details.removeAttribute('open');
      }
    });
  }

  let filteredEvents = $derived(events ? events.filter((e) => !e.hasEnded) : []);
  let sortedEvents = $derived(filteredEvents.sort(sortBy('startDate')));
</script>

<section id="events">
  <div class="liner">
    <h2 class="ds h3">{m.meet_interflux()}</h2>

    {#if view === 'loading'}
      <p>{m.loading()}</p>
    {/if}

    {#if view === 'no-events'}
      <p>{m.no_upcoming_events()}</p>
    {/if}

    {#if view === 'has-events'}
      <div class="list">
        {#each sortedEvents as event (event.id)}
          <details>
            <summary onclick={collapseSiblings}>
              <h3>
                <Tag label={event.name} theme="blue" />
              </h3>

              <p class="ds p">
                <span>
                  {event.datesCombined}, in
                  {event.city},
                  {event.country.nameEnglish}
                </span>
                <Flag country={event.country} />
              </p>

              <Svg name="chevron-down" />
            </summary>

            <div class="description">
              {@html markdown(event.description)}

              {#if event.website}
                <p>
                  <Link url={event.website}>
                    <span>{event.websiteShort}</span>
                  </Link>
                </p>
              {/if}
            </div>

            {#if event.hasRegistrationForm}
              <Button url="/event/{event.id}" label="Reserve a seat" theme="primary medium green" />
            {/if}
          </details>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #events {
    background-color: var(--grey-0);
    border-top: 1px solid var(--grey-1);
    .liner {
      @include widescreen {
        padding: 80px 50px;
      }
      @include desktop {
        padding: vw(80px) vw(50px);
      }
      @include tablet {
        padding: 15vw 5vw;
      }
      @include mobile {
        padding: 32vw 4vw;
      }
    }
    .h3 {
      text-align: left;
      @include widescreen {
        margin-bottom: 40px;
      }
      @include desktop {
        margin-bottom: vw(40px);
      }
      @include tablet {
        margin-bottom: 5vw;
      }
      @include mobile {
        margin-bottom: 14vw;
        text-align: center;
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      @include widescreen {
        gap: 2px;
        margin-left: -8px;
      }
      @include desktop {
        gap: vw(2px);
        margin-left: vw(-8px);
      }
      @include tablet {
        gap: vw-tablet(2px);
        margin-left: vw-tablet(-8px);
      }
      @include mobile {
        gap: 10vw;
      }
      details {
        transition: all 400ms var(--ease-out-expo);
        border-radius: 3px;
        @include mobile {
          width: 100%;
        }
        &[open] {
          background: white;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
          @include widescreen {
            margin: 20px 0;
          }
          @include desktop {
            margin: vw(20px) 0;
          }
          @include tablet {
            margin: vw-tablet(20px) 0;
          }
          @include mobile {
            margin: vw-mobile(20px) 0;
          }
          summary {
            :global {
              svg {
                transform: rotate(-180deg);
              }
            }
          }
        }
        &:hover,
        &:focus {
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
          background-color: white;
          summary {
            :global {
              svg {
                [fill] {
                  fill: var(--blue-0);
                }
              }
            }
          }
        }
        summary {
          display: flex;
          align-items: center;
          cursor: pointer;
          @include widescreen {
            gap: 20px;
            padding: 10px;
            padding-right: 20px;
          }
          @include desktop {
            gap: vw(20px);
            padding: vw(10px);
            padding-right: vw(20px);
          }
          @include tablet {
            gap: vw-tablet(20px);
            padding: vw-tablet(10px);
            padding-right: vw-tablet(20px);
          }
          @include mobile {
            flex-direction: column;
            gap: 2vw;
            padding: 2vw;
          }
          &::-webkit-details-marker {
            display: none;
          }
          h3 {
            user-select: none;
            @include widescreen {
              padding: 0 8px; // to match <Tag> expansion
            }
            @include desktop {
              padding: 0 vw(8px); // to match <Tag> expansion
            }
            @include tablet {
              padding: 0 vw-tablet(8px); // to match <Tag> expansion
            }
            @include mobile {
              padding: 0 vw-mobile(8px); // to match <Tag> expansion
            }
          }
          p {
            margin: 0;
            user-select: none;
            @include mobile {
              text-align: center;
            }
          }
          :global {
            img.flag {
              height: auto;
              display: inline-block;
              @include widescreen {
                width: 20px;
                transform: translateY(2px);
                margin-left: 7px;
              }
              @include desktop {
                width: vw(20px);
                transform: translateY(2px);
                margin-left: vw(7px);
              }
              @include tablet {
                width: vw-tablet(20px);
                transform: translateY(#{vw-tablet(2px)});
                margin-left: vw-tablet(7px);
              }
              @include mobile {
                width: vw-mobile(20px);
                transform: translateY(#{vw-mobile(2px)});
                margin-left: vw-mobile(7px);
              }
            }
            svg {
              transform: rotate(0deg);
              transition: all 400ms var(--ease-out-expo);
              height: auto;
              @include widescreen {
                width: 12px;
              }
              @include desktop {
                width: vw(12px);
              }
              @include tablet {
                width: vw-tablet(12px);
              }
              @include mobile {
                width: vw-mobile(12px);
              }
              [fill] {
                transition: fill 400ms var(--ease-out-expo);
                fill: var(--grey-3);
              }
            }
          }
        }
        .description {
          border-top: 1px dashed #eee;
          @include widescreen {
            padding: 20px 24px;
          }
          @include desktop {
            padding: vw(20px) vw(24px);
          }
          @include tablet {
            padding: vw-tablet(20px) vw-tablet(24px);
          }
          @include mobile {
            padding: vw-mobile(20px) vw-mobile(24px);
          }
          p {
            @include widescreen {
              max-width: 560px;
            }
            @include desktop {
              max-width: vw(560px);
            }
            @include tablet {
              max-width: vw-tablet(560px);
            }
            @include mobile {
              max-width: vw-mobile(560px);
            }
          }
        }
        :global {
          .button {
            margin: 0 0 20px 20px;
          }
        }
      }
    }
  }
</style>
