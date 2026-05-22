<script lang="ts">
  import type { Company } from './$types';
  import Button from '$lib/components/Button.svelte';
  import Svg from '$lib/components/Svg.svelte';

  interface Props {
    company: Company;
    active: boolean;
  }

  let { company, active = false }: Props = $props();
</script>

<div id="marker-for-{company.slug}" class="icon">
  <Button
    url="/contact/map/{company.slug}"
    theme="marker {active ? 'active' : 'idle'}"
  >
    {#if company.isHeadquarter}
      <Svg name="map-marker-2" />
    {:else}
      <Svg name="map-marker-1" />
    {/if}
    <p>
      <span>{company.businessName}</span>
      <Svg name="arrow-down" />
    </p>
  </Button>
</div>

<div id="shadow-for-{company.slug}" class="shadow">
  <Svg name="map-marker-shadow" />
</div>
