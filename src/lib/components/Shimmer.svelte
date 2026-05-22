<script lang="ts">
  interface Props {
    shape: 'square' | 'row';
  }

  let { shape }: Props = $props();
</script>

{#if shape === 'square'}
  <svg class="shimmer" width="400" height="400"></svg>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  @keyframes shimmer {
    0% {
      background-position: -468px 0;
      background-position: -100vw 0;
    }

    100% {
      background-position: 468px 0;
      background-position: 100vw 0;
    }
  }

  svg.shimmer {
    background: #f6f7f8;
    background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 100vw 100%;
    background-size: cover;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
    [fill] {
      fill: white;
    }
  }
</style>
