import { gql, GraphQLClient } from 'graphql-request';

export async function get(page) {
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const order = page.query.get('order') ?? 'ASC';

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
		const year = new Date(event.startTime).getUTCFullYear();
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

	return page.query.get('stats') === 'true'
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
