<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = '/api/events.json?stats=true';
		const res = await fetch(url);

		if (res.ok) {
			const { stats, events } = await res.json();
			return {
				props: {
					stats,
					events
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
	export let stats;
</script>

<section id="upcoming-events" class="m-6">
	<h2 class="text-2xl">Events by year</h2>
	<ul>
		{#each stats as metadata}
			<li>
				<a href="/events/{metadata.year}"> <h3 class="text-xl">{metadata.year}</h3></a>
			</li>
		{/each}
	</ul>
</section>
