<script lang="ts">
  interface Props {
    label?: string;
    query?: string;
    onKeyUp: (event: KeyboardEvent) => void;
  }

  let { label, query, onKeyUp }: Props = $props();
</script>

<div class="pills">
  {#if label}
    <p>{label}</p>
  {/if}

  <input type="search" value={query} onkeyup={(e) => onKeyUp(e)} />
</div>
