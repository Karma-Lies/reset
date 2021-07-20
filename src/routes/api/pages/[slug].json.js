import { gql, GraphQLClient } from 'graphql-request';

export async function get({ params }) {
	const { slug } = params;
	const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
		headers: {}
	});
	console.log(slug);
	const query = gql`
		query Page($slug: String!) {
			page(where: { slug: $slug }) {
				title
				body {
					html
				}
			}
		}
	`;
	const variables = {
		slug: slug
	};

	const { page } = await graphcms.request(query, variables);
	console.log(page);

	return {
		body: page
	};
}
