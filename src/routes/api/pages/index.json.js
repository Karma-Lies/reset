import { gql, GraphQLClient } from 'graphql-request';

export async function get() {
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});

	const query = gql`
		query Pages {
			pages {
				title
				slug
				body {
					html
				}
			}
		}
	`;

	const { pages } = await graphcms.request(query);

	return {
		body: pages
	};
}
