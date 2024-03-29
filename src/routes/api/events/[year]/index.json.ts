import type { Page } from '@sveltejs/kit';
import { gql, GraphQLClient } from 'graphql-request';

export async function get(page: Page) {
	const { year } = page.params;

	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const order = page.url.searchParams.get('order') ?? 'ASC';

	const orderBy = `startTime_${order}`;

	// Get events by year
	const query = gql`
		query EventsByYear($yearStart: DateTime!, $yearEnd: DateTime!, $orderBy: EventOrderByInput) {
			events(where: { startTime_gt: $yearStart, startTime_lt: $yearEnd }, orderBy: $orderBy) {
				title
				slug
				id
				startTime
				isSoldOut
				flyer {
					id
					url
				}
				address
				description {
					html
				}
			}
		}
	`;
	// GraphQL query vars
	const variables = {
		yearStart: new Date(year + '-01-01T00:00:00+00:00'),
		yearEnd: new Date(year + '-12-31T23:59:59+00:00'),
		orderBy
	};

	const { events } = await graphcms.request(query, variables);

	events.forEach((event) => {
		// Extract the year from the event start time
		event.year = Number(
			new Date(event.startTime).toLocaleString('en-US', {
				year: 'numeric',
				timeZone: 'America/Chicago'
			})
		);
	});

	return {
		body: events
	};
}
