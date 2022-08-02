import type { Page } from '@sveltejs/kit';
import { gql, GraphQLClient } from 'graphql-request';

export async function get(page: Page) {
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const order = page.url.searchParams.get('order') ?? 'ASC';

	const orderBy = { orderBy: `startTime_${order}` };

	const query = gql`
		query EventsIndex($orderBy: EventOrderByInput) {
			events(orderBy: $orderBy) {
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
			}
		}
	`;

	let { events } = await graphcms.request(query, orderBy);

	// Array of years for each event
	const years = events.map((event, i) => {
		// Extract the year from the event start time
		const year = Number(
			new Date(event.startTime).toLocaleString('en-US', {
				year: 'numeric',
				timeZone: 'America/Chicago'
			})
		);
		events[i].year = year;
		return year;
	});

	const uniqueYears = [...new Set(years)];

	const stats = uniqueYears.map((year) => {
		return {
			year: year,
			eventCount: years.filter((thisYear) => thisYear === year).length
		};
	});

	return page.url.searchParams.get('stats') === 'true'
		? {
				body: {
					stats,
					events
				}
		  }
		: {
				body: {
					events
				}
		  };
}
