<script lang="ts">
  import { Menu, LanguageList } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
</script>

<Menu id="languages">
  <div class="links">
    <h2>{m.choose_your_language()}</h2>
    <LanguageList />
  </div>
</Menu>

<style lang="scss">
  @use '$lib/styles/components' as *;

  :global {
    .menu#languages {
      justify-content: flex-end;
      padding-right: 22px;
      box-sizing: border-box;
      .box {
        @include widescreen {
          width: 300px;
        }
        @include desktop {
          width: vw(300px);
        }
      }
      .callout {
        @include widescreen {
          right: 30px;
        }
        @include desktop {
          right: vw(30px);
        }
      }
      .links {
        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .flags {
            display: flex;
            align-items: center;
            gap: 6px;
          }
        }
      }
    }
  }
</style>
