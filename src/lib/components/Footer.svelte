<script lang="ts">
	import { PUBLIC_CDN_HOST } from '$env/static/public';
	import { m } from '$lib/paraglide/messages';
	import { markdown } from '$lib/helpers';
	import { Languages, Link, Svg } from '$lib/components';

	let currentYear = $derived(new Date().getFullYear());
</script>

<footer>
	<div id="logo">
		<img
			id="electronics"
			src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-logo-1-transparent.svg"
			width="3960"
			height="1000"
			alt="Interflux Electronics"
		/>

		<div id="group">
			<p>
				{markdown(m.member_of_interflux_group(), { noParagraphs: true })}
			</p>

			<img
				src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-symbol-1-blue-0.svg"
				width="20"
				height="20"
				alt="Interflux Group"
			/>
		</div>
	</div>

	<div id="image">
		<img
			src="{PUBLIC_CDN_HOST}/images/public/interflux-building/interflux-building@800x1067.webp"
			alt={m.office_building()}
		/>
	</div>

	<div id="languages">
		<section>
			<h3>{m.continue_in_your_language()}</h3>
			<Languages />
		</section>
	</div>

	<div id="links">
		<section id="explore">
			<h3>{m.explore_more()}</h3>

			<Link url="https://lmpa-q.com">
				<span>{m.LMPA_Q_solder_alloy()}<Svg name="arrow-right" /></span>
			</Link>

			<Link url="https://www.jetfluxer.com">
				<span>{m.ICSF_jet_fluxer()}<Svg name="arrow-right" /></span>
			</Link>
		</section>

		<section id="partners">
			<h3>{m.partners()}</h3>

			<Link url="https://interflux.group">
				<span>Interflux Group<Svg name="arrow-right" /></span>
			</Link>

			<Link url="https://www.interflux.dk">
				<span>Interflux Scandinavia<Svg name="arrow-right" /></span>
			</Link>

			<Link url="https://www.interflux.pl">
				<span>Interflux Poland<Svg name="arrow-right" /></span>
			</Link>
		</section>

		<section id="social">
			<h3>{m.follow_Interflux()}</h3>

			<div class="horizontal">
				<Link url="https://www.linkedin.com/company/interflux-electronics/">
					<Svg name="linkedin" />
				</Link>

				<Link url="https://twitter.com/interflux_elec">
					<Svg name="x" />
				</Link>

				<Link url="https://www.youtube.com/@interfluxelectronicsnv1744">
					<Svg name="youtube" />
				</Link>
			</div>
		</section>

		<div class="spacer"></div>

		<section id="legal">
			<p>&copy; 1980 - {currentYear} <nobr>&reg; Interflux Electronics NV</nobr></p>
		</section>
	</div>
</footer>
