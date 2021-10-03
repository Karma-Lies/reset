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

	event = {
		...event,
		artists: event.artists.map((artist) => {
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
		})
	};

	return {
		body: event
	};
}
