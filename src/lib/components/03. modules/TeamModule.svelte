<script lang="ts">
	import StaffCard from '$lib/components/02. molecules/StaffCard.svelte';
	import type { StaffMember } from '$lib/types/StaffMember';

	export let team: StaffMember[] = [];
</script>

<div class="flex flex-wrap">
	{#each team as member, _ (member.id)}
		<StaffCard {...member} />
	{/each}
</div>
