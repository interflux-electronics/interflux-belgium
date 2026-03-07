<script lang="ts">
  import { modal } from '$lib/state/modal.svelte';
  import { Button, Svg } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
</script>

{#if modal.visible}
  <div id="modal" class={modal.theme}>
    <div class="overlay">
      <a href={modal.backURL} aria-label={m.close()}></a>
    </div>

    <div class="content" id={modal.contentID}>
      {#if modal.isFetching}
        <p>Loading ...</p>
      {:else if modal.fetchFailed}
        <div class="box error">
          <Svg name="error" />
          <!-- TODO -->
          <!-- <RouteErrorMessage /> -->
        </div>
      {:else}
        <div class="box">
          {@render modal.content()}
        </div>
      {/if}
    </div>

    <Button
      label={m.close()}
      icon="close"
      theme="tertiary medium white-text icon-right"
      url={modal.backURL}
    />
  </div>
{/if}
