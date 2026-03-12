<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->

<script lang="ts">
  import { modal } from '$lib/state/modal.svelte';
  import { Button, Svg } from '$lib/components';
  import { m } from '$lib/paraglide/messages';

  function preventBubble(e: MouseEvent) {
    e.stopPropagation();
  }
</script>

{#if modal.visible && modal.component}
  <div id="modal">
    <div class="overlay"></div>

    <div class="content" onclick={() => modal.close()}>
      <div class="liner">
        <Button
          label={m.close()}
          size="medium"
          icon="close"
          iconPosition="right"
          theme="tertiary ghost"
          onClick={() => modal.close()}
        />

        <div class="box" onclick={preventBubble}>
          <svelte:component this={modal.component} {...modal.props} />
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  #modal {
    position: relative;
    // z-index: 1 is for #page
    // z-index: 2 is for header#mobile
    // z-index: 3 is for #modal
    z-index: 3;

    .overlay {
      position: fixed;
      background: rgba($blue-5, 0.97);
      top: 0; // using width and height instead breaks when scrolling
      bottom: 0;
      left: 0;
      right: 0;
      animation-name: fade-in;
      animation-duration: 400ms;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
      cursor: pointer;
    }

    .content {
      position: relative; // <div class="page"> becomes fixed
      top: 0;
      width: 100vw;
      min-height: 100vh;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;

      // IMPORTANT: allows the overlay to be clicked, even though adjacent in HTML
      // pointer-events: none;

      // TODO: use flex-start if content is higher than viewport
      // align-items: flex-start;

      @include widescreen {
        padding: px(7vw);
      }
      @include desktop {
        padding: 7vw;
      }
      @include tablet {
        padding: 10vw 5vw;
      }
      @include mobile {
        padding: 20vw 3vw;
      }

      .liner {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        gap: 20px;
      }

      .box {
        width: 100%;
        max-width: 400px;
        box-sizing: border-box;
        padding: 40px;
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 3px 6px rgba(black, 0.2);

        animation-name: fade-in;
        animation-duration: 400ms;
        animation-timing-function: ease-out;
        animation-fill-mode: both;

        display: flex;
        flex-direction: column;
        gap: 20px;

        pointer-events: all;
      }
    }
  }
</style>
