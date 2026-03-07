<script lang="ts">
  import type { PageProps } from './$types';
  import { HeaderHero } from '$lib/components';
  import { m } from '$lib/paraglide/messages';

  let { data }: PageProps = $props();

  // console.log(data.companies.data);
</script>

<HeaderHero h1={m.contact()} theme="two" />

<section>
  <div class="liner">
    <ul>
      {#each data.companies.data as company}
        <li>{company.attributes['business-name']}</li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .liner {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
