<script>
	// Props
	export let sitename = 'Reset Presents';
	export let title = 'music for the rest of us';
	export let description =
		'A new music event project in Chicago debuting rising musical artists across genres, from hyper-pop to bass music and beyond, sourcing underground talent.';
	export let pageType = 'website';
	/**
	 * Append the site name to the start of the title
	 */
	export let prefixSiteName = false;
	/**
	 * Append the site name to the end of the title
	 */
	export let postfixSiteName = true;
	/**
	 * Feature image of the page
	 */
	export let image = {
		src: '',
		alt: ''
	};
	/**
	 * Relative path to form complete canonical URL when added to domain
	 */
	export let url = '';
	export let authorTwitter = null;

	// Page title seperator
	const seperator = '—';
	// Construct page title based on page settings
	const pageTitle = prefixSiteName
		? `${sitename} ${seperator} ${title}`
		: postfixSiteName
		? `${title} ${seperator} ${sitename}`
		: title;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="Reset, Presents, Chicago Shows, Production Company, Events, Bass Music, Hyperpop, indie pop, Rap, RnB, Indie Artists, Venue Space"
	/>
	<meta http-equiv="Content-language" content="en_US" />

	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content={pageType} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Reset Presents" />
	<meta property="og:url" content="https://resetpresents.com/{url}" />

	<link rel="me" href="https://twitter.com/reset_presents" />
	<meta name="twitter:widgets:theme" content="dark" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@reset_presents" />

	{#if image.src}
		<meta property="og:image" content={image.src} />
		<meta name="twitter:image" content={image.src} />
		<meta name="twitter:image:alt" content={image.alt} />
	{/if}

	{#if authorTwitter}
		<meta name="twitter:creator" content="@{authorTwitter}" />
	{/if}

	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<slot />
</svelte:head>
