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
				description {
					html
				}
			}
		}
	`;

	const variables = {
		slug: slug
	};

	const { event } = await graphcms.request(query, variables);

	return {
		body: event
	};
}
