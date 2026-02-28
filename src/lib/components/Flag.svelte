<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { downcase } from '$lib/helpers';
  import type Country from '$lib/schemas/Country';

  export let country: Country;
</script>

<img
  src="{PUBLIC_CDN_HOST}/images/flags/{country.id}.svg"
  alt="{country.nameNative} ({country.nameEnglish})"
  class="flag {downcase(country.id)}"
  width="32"
  height="24"
/>

<style lang="scss">
  @use '$lib/styles/components' as *;

  img.flag {
    height: auto;
    @include widescreen {
      width: 24px;
    }
    @include desktop {
      width: vw(24px);
    }
    @include tablet {
      width: vw-tablet(24px);
    }
    @include mobile {
      width: vw-mobile(24px);
    }
    &.at,
    &.bg,
    &.ca,
    &.cz,
    &.fi,
    &.fr,
    &.id,
    &.it,
    &.kr,
    &.ph,
    &.pk,
    &.pl,
    &.mx,
    &.nl,
    &.rs,
    &.ru,
    &.sg,
    &.si {
      outline: 1px solid var(--grey-1);
    }
  }
</style>
