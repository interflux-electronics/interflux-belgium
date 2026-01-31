<script lang="ts">
	import { Header, Footer } from '$lib/components';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/interflux-design-system.scss';
	import '$lib/app.scss';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />

<main>
	{@render children()}
</main>

<Footer />
