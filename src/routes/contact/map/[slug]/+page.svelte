<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import Flag from '$lib/components/Flag.svelte';
  import Svg from '$lib/components/Svg.svelte';
  import { m } from '$lib/paraglide/messages';
  import { markdown } from '$lib/helpers';
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { onMount, onDestroy } from 'svelte';

  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let company = $derived(data.company);

  let doneAnimating = $state(true);

  function hideCompany() {}

  onMount(() => {
    // Zoom in

    return () => {
      // Optional: inline cleanup (also runs on destroy)
    };
  });

  onDestroy(() => {
    // Zoom out
  });
</script>

{#if company}
  {@const c = company}
  <aside class={doneAnimating ? 'show' : 'hide'}>
    <h2>{c.businessName}</h2>

    {#if c.description}
      <div class="description">
        <!-- TODO DB translation on c.description -->
        {@html markdown(c.description)}
      </div>
    {/if}

    <p class="address">
      {#if c.legalName}
        <span>{c.legalName}</span>
      {/if}
      {#if c.address}
        <span>{c.address}</span>
      {/if}
      {#if c.country.nameEnglish}
        <span
          >{c.country.nameEnglish}
          <Flag country={c.country} /></span
        >
      {/if}
    </p>

    {#if c.website}
      <p class="website">
        <Button url={c.websiteForRobots} label={c.websiteForHumans} />
      </p>
    {/if}

    {#if c.emailGeneral || c.emailSupport || c.emailOrders || c.emailAccounting}
      <p class="email">
        {#if c.emailGeneral}
          <span>
            <Button url="mailto:{c.emailGeneral}" label={c.emailGeneral} />
          </span>
        {/if}

        {#if c.emailSupport}
          <span>
            <Button url="mailto:{c.emailSupport}" label={c.emailSupport} />
          </span>
        {/if}

        {#if c.emailOrders}
          <span>
            <Button url="mailto:{c.emailOrders}" label={c.emailOrders} />
          </span>
        {/if}

        {#if c.emailAccounting}
          <span>
            <Button url="mailto:{c.emailAccounting}" label={c.emailAccounting} />
          </span>
        {/if}
      </p>
    {/if}

    {#if c.phone}
      <p class="phone">
        <Button url="tel:{c.phoneForRobots}" label={c.phoneForHumans} />
      </p>
    {/if}

    {#if c.fax}
      <p class="fax">
        <Button url="tel:{c.faxForRobots}" label={c.faxForHumans} />
      </p>
    {/if}

    <ul class="members">
      {#each c.members as member (member.id)}
        {@const person = member.person}
        <li>
          <div class="avatar">
            {#if person.avatarPath}
              <ResponsiveImage
                path={person.avatarPath}
                variations={person.avatarVariations}
                alt={person.fullName}
              />
            {:else}
              <img
                src="{cdnHost}/images/public/no-avatar.svg"
                aria-hidden="true"
                width="27"
                height="27"
              />
            {/if}
          </div>

          <div class="details">
            <h3>{person.fullName}</h3>
            {#if member.title}
              <p>{member.title}</p>
            {/if}
            {#if member.verifiedEmail}
              <p class="p">
                <Button url="mailto:{member.verifiedEmail}" label={member.verifiedEmail} />
              </p>
            {/if}
            {#if member.verifiedPhone}
              <p class="p">
                <Button url="tel:{member.phoneForRobots}" label={member.verifiedPhone} />
              </p>
            {/if}
            {#if member.verifiedLandline}
              <p class="p">
                <Button url="tel:{member.landlineForRobots}" label={member.verifiedLandline} />
              </p>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </aside>

  <div id="arrow" class={doneAnimating ? 'show' : 'hide'}>
    <Svg name="arrow-right" />
  </div>

  <Button onClick={hideCompany} theme="overlay" />
{/if}
