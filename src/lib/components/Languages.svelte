<script lang="ts">
	import { page } from '$app/state';
	import { Flag, Svg } from '$lib/components';

	let GB = { id: 'GB', nameNative: 'UK', nameEnglish: 'UK' };
	let US = { id: 'US', nameNative: 'USA', nameEnglish: 'USA' };
	let CA = { id: 'CA', nameNative: 'Canada', nameEnglish: 'Canada' };
	let AU = { id: 'AU', nameNative: 'Australia', nameEnglish: 'Australia' };
	let NZ = { id: 'NZ', nameNative: 'New Zealand', nameEnglish: 'New Zealand' };
	let SG = { id: 'SG', nameNative: 'Singapore', nameEnglish: 'Singapore' };

	// let CN = { id: 'CN', nameNative: '中国', nameEnglish: 'China' };
	// let TW = { id: 'TW', nameNative: '臺灣', nameEnglish: 'Taiwan' };
	// let HK = { id: 'HK', nameNative: '香港', nameEnglish: 'Hong Kong' };
	// let MO = { id: 'MO', nameNative: '澳門', nameEnglish: 'Macau' };

	let ES = { id: 'ES', nameNative: 'España', nameEnglish: 'Spain' };
	let MX = { id: 'MX', nameNative: 'México', nameEnglish: 'Mexico' };
	let AR = { id: 'AR', nameNative: 'Argentina', nameEnglish: 'Argentina' };
	let CL = { id: 'CL', nameNative: 'Chile', nameEnglish: 'Chile' };
	let CO = { id: 'CO', nameNative: 'Colombia', nameEnglish: 'Colombia' };
	let PE = { id: 'PE', nameNative: 'Perú', nameEnglish: 'Peru' };

	let DE = { id: 'DE', nameNative: 'Deutschland', nameEnglish: 'Germany' };
	let AT = { id: 'AT', nameNative: 'Österreich', nameEnglish: 'Austria' };
	let CH = { id: 'CH', nameNative: 'Schweiz', nameEnglish: 'Switzerland' };

	let FR = { id: 'FR', nameNative: 'France', nameEnglish: 'France' };
	let BE1 = { id: 'BE', nameNative: 'Belgique', nameEnglish: 'Belgium' };

	// let BE2 = { id: 'BE', nameNative: 'België' };
	// let NL = { id: 'NL', nameNative: 'Nederland' };
</script>

<a href="https://interflux.com{page.url.pathname}">
	<span>English<Svg name="arrow-right" /></span>
	<div class="flags">
		<Flag country={GB} />
		<Flag country={US} />
		<Flag country={CA} />
		<Flag country={AU} />
		<Flag country={NZ} />
		<Flag country={SG} />
	</div>
</a>

<!-- 
<a href='https://interflux.com.cn{page.url.pathname}'>
  <span>中文<Svg name='arrow-right' /></span>
  <div class='flags'>
    <Flag country={CN} />
    <Flag country={TW} />
    <Flag country={HK} />
    <Flag country={MO} />
  </div>
</a> 
-->

<a href="https://interflux.es{page.url.pathname}">
	<span>Español<Svg name="arrow-right" /></span>
	<div class="flags">
		<Flag country={ES} />
		<Flag country={MX} />
		<Flag country={AR} />
		<Flag country={CL} />
		<Flag country={CO} />
		<Flag country={PE} />
	</div>
</a>

<a href="https://interflux.de{page.url.pathname}">
	<span>Deutsch<Svg name="arrow-right" /></span>
	<div class="flags">
		<Flag country={DE} />
		<Flag country={AT} />
		<Flag country={CH} />
	</div>
</a>

<a href="https://interflux.fr{page.url.pathname}">
	<span>français<Svg name="arrow-right" /></span>
	<div class="flags">
		<Flag country={FR} />
		<Flag country={BE1} />
	</div>
</a>

<!-- 
<a href='https://interflux.be{page.url.pathname}'>
  <span>Nederlands<Svg name='arrow-right' /></span>
  <div class='flags'>
    <Flag country={NL} />
    <Flag country={BE2} />
  </div>
</a> 
-->
