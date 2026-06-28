<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { m } from '$lib/paraglide/messages';
  import { modal } from '$lib/state/modal.svelte';

  let { file }: Record<string, any> = $props();

  let category = $derived(file?.category.id);

  let mailto = $derived.by(() => {
    const to = 'reach@interflux.com';
    const params = new URLSearchParams({
      subject: `Request for ${file?.label || 'document'}`
    });

    return `mailto:${to}?${params.toString()}`;
  });
</script>

{#if category === 'SDS' || category === 'REACH'}
  <h2>{m.request_sds_h2()}</h2>
  <p>{m.request_sds_p()}</p>
{:else}
  <h2>{m.request_doc_h2()}</h2>
  <p>{m.request_doc_p()}</p>
{/if}

<div class="buttons">
  <Button label={m.back()} theme="medium secondary" onClick={() => modal.close()} />
  <Button label="reach@interflux.com" url={mailto} theme="medium primary orange" icon="email" />
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  h2 {
    font-size: 22px;
    font-family: var(--extra-bold);
    color: var(--grey-7);
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
