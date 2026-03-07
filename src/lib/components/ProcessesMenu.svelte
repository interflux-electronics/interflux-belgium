<script lang="ts">
  import { Menu, Svg } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { getProcessLinks } from '$lib/state/header.svelte';

  let links = $derived(getProcessLinks());
</script>

<Menu id="processes">
  <h2>{m['Processes we develop for']()}</h2>

  <div class="links">
    {#each links as link}
      <a href={link.url}>
        <img
          src="{PUBLIC_CDN_HOST}/images/icons/{link.icon}.svg"
          role="presentation"
          alt=""
          width="40"
          height="40"
        />
        <span>{link.label}<Svg name="arrow-right" /></span>
      </a>
    {/each}
  </div>
</Menu>

<style lang="scss">
  @use '$lib/styles/components' as *;

  :global {
    .menu#processes {
      .box {
        flex-direction: column;
        @include widescreen {
          width: 720px;
        }
        @include desktop {
          width: vw(720px);
        }
      }
      .callout {
        @include widescreen {
          left: 200px;
        }
        @include desktop {
          left: vw(200px);
        }
      }
      .links {
        a {
          width: 33.33%;
          &:first-child {
            width: 66.66%;
          }
        }
      }
    }
  }
</style>
