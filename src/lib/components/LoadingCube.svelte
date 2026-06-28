<script lang="ts">
  import { Svg } from '$lib/components';
  import { delay } from '$lib/helpers';

  interface Props {
    message?: string;
    fixed?: boolean;
  }

  let { message = 'Loading ...', fixed = false }: Props = $props();

  let side = $state('front');

  $effect(() => {
    const sides = ['bottom', 'top', 'right', 'left', 'back'];

    // Fisher-Yates shuffle
    // Avoid .sort(() => 0.5 - Math.random()))
    for (let i = sides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sides[i], sides[j]] = [sides[j], sides[i]];
    }

    // Add front side to end of the deck because its always the first one to briefly show.
    const deck = [...sides, 'front'];

    let index = 0;

    const loop = async () => {
      while (true) {
        await delay(1); // very short delay before change
        side = deck[index]; // update the face

        // Here we keep increasing +1 until 6 is reached.
        // The modulus will be: 1, 2, 3, 4, 5, 0, 1, 2, 3, ...
        index = (index + 1) % deck.length;

        await delay(1400);
      }
    };

    loop();
  });
</script>

<div class="loading-cube {fixed ? 'fixed' : 'inline'}">
  <div class="scene">
    <div class="cube show-{side}">
      <div class="face front">
        <Svg name="interflux" />
      </div>
      <div class="face back">
        <Svg name="wave-soldering" />
      </div>
      <div class="face right">
        <Svg name="leaves" />
      </div>
      <div class="face left">
        <Svg name="strong" />
      </div>
      <div class="face top">
        <Svg name="chemistry" />
      </div>
      <div class="face bottom">
        <Svg name="circuit1" />
      </div>
    </div>
  </div>

  <p>{message}</p>
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .loading-cube {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.fixed {
      background: white;
      position: fixed;
      z-index: 3;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    &.inline {
      margin: 100px 0;
    }
    :global(svg) {
      height: 100%;
      width: 100%;
    }
    .scene {
      width: 200px;
      height: 200px;
      perspective: 600px;
      transform: scale(0.35);
      @include mobile {
        transform: scale(0.3);
      }
    }
    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(-100px);
      transition: transform 1200ms;
      &.show-front {
        transform: translateZ(-100px) rotateY(0deg);
      }
      &.show-right {
        transform: translateZ(-100px) rotateY(-90deg);
      }
      &.show-back {
        transform: translateZ(-100px) rotateY(-180deg);
      }
      &.show-left {
        transform: translateZ(-100px) rotateY(90deg);
      }
      &.show-top {
        transform: translateZ(-100px) rotateY(0deg) rotateX(-90deg);
      }
      &.show-bottom {
        transform: translateZ(-100px) rotateY(0deg) rotateX(90deg);
      }
      .face {
        position: absolute;
        width: 200px;
        height: 200px;
        &.front {
          transform: rotateY(0deg) translateZ(100px);
          background: rgba(red, 0.7);
        }
        &.right {
          transform: rotateY(90deg) translateZ(100px);
          background: rgba(lime, 0.7);
        }
        &.back {
          transform: rotateY(180deg) translateZ(100px);
          background: rgba(blue, 0.7);
        }
        &.left {
          transform: rotateY(-90deg) translateZ(100px);
          background: rgba(orange, 0.7);
        }
        &.top {
          transform: rotateX(90deg) translateZ(100px);
          background: rgba(purple, 0.7);
        }
        &.bottom {
          transform: rotateX(-90deg) translateZ(100px);
          background: rgba(darkgreen, 0.7);
        }
      }
    }
    p {
      line-height: 100%;
      color: var(--grey-7);
      @include widescreen {
        font-size: 16px;
      }
      @include desktop {
        font-size: vw(16px);
      }
      @include tablet {
        font-size: vw-tablet(16px);
      }
      @include mobile {
        font-size: vw-mobile(16px);
      }
    }
  }
</style>
