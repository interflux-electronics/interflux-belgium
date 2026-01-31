<script lang="ts">
	export let url: string;
	export let label: string = '';
</script>

{#if url}
	<a href={url} target="_blank" rel="noopener noreferrer">
		{#if $$slots.default}
			<slot />
		{:else}
			{label}
		{/if}
	</a>
{/if}
