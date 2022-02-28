<script lang="ts">
	// Component imports
	import SocialLinks from './SocialLinks.svelte';
	import type { StaffMember } from '$lib/types/StaffMember';

	// Props
	export let name: StaffMember['name'] = 'Example';
	export let pronouns: StaffMember['pronouns'] = 'they/them';
	export let role: StaffMember['role'] = 'professional';
	export let profilePicture: StaffMember['profilePicture'] = {
		url: 'https://via.placeholder.com/450',
		width: 460,
		height: 460
	};
	export let socialLinks: StaffMember['socialLinks'] = [];
</script>

<section class="flex space-x-3 p-3">
	<div>
		<img
			src={profilePicture.url}
			alt="{name} staff photo"
			width={profilePicture.width}
			height={profilePicture.height}
			class="w-full object-cover"
		/>
	</div>
	<div>
		<h3>
			{name}
		</h3>
		<p>{pronouns}</p>
		<p>{role}</p>
		<SocialLinks links={socialLinks} />
	</div>
</section>
