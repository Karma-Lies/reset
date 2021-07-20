import { gql, GraphQLClient } from 'graphql-request';

export async function get({ params }) {
	const { year } = params;
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const query = gql`
		query EventsByYear($yearStart: DateTime!, $yearEnd: DateTime!) {
			events(where: { startTime_gt: $yearStart, startTime_lt: $yearEnd }) {
				title
				slug
				id
				startTime
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

	const variables = {
		yearStart: new Date(year + '-01-01T00:00:00+00:00'),
		yearEnd: new Date(year + '-12-31T23:59:59+00:00')
	};

	const { events } = await graphcms.request(query, variables);

	events.forEach((event) => {
		// Extract the year from the event start time
		event.year = new Date(event.startTime).getUTCFullYear();
	});

	return {
		body: events
	};
}
