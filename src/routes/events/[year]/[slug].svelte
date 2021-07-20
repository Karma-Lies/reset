<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/api/events/${page.params.year}/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					event: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let event;
</script>

<svelte:head>
	<title>{event.title}</title>
</svelte:head>

<h1>{event.title}</h1>
<p>{event.startTime}</p>
<p>{event.address}</p>
{@html event.description.html}
