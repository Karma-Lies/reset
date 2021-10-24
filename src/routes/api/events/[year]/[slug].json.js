import { gql, GraphQLClient } from 'graphql-request';

export async function get({ params }) {
	const { slug } = params;
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const query = gql`
		query Event($slug: String!) {
			event(where: { slug: $slug }) {
				title
				slug
				id
				startTime
				flyer {
					id
					url
				}
				address
				ticketPurchaseUrl
				isSoldOut
				accentColor {
					hex
					rgba {
						r
						g
						b
					}
				}
				artists {
					name
					slug
					spotifyArtistId
					socialLinks {
						id
						type
						href
					}
				}
				description {
					html
					text
				}
				recap {
					videoURL
				}
			}
		}
	`;

	const variables = {
		slug: slug
	};

	let { event } = await graphcms.request(query, variables);

	// Regex with positive lookbehind to only match if ticket URL is eventbrite; if so, matches eventID
	let eventID = event.ticketPurchaseUrl?.match(/(?<=eventbrite.*)\d{12}/s) ?? null;

	// Would be nice to toss in a logical AND assignment here but SvelteKit/Vite don't seem to enjoy that
	if (eventID) eventID = eventID[0];

	event = {
		...event,
		eventbriteID: eventID,
		artists: event.artists.map((artist) => {
			if (artist.spotifyArtistId) {
				const updatedLinks = [
					...artist.socialLinks,
					artist.spotifyArtistId
						? {
								id: artist.spotifyArtistId,
								type: 'Spotify',
								href: 'https://open.spotify.com/artist/' + artist.spotifyArtistId
						  }
						: null
				];
				return {
					...artist,
					socialLinks: updatedLinks
				};
			}
			return artist;
		})
	};

	return {
		body: event
	};
}
