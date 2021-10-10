const axios = require('axios');

const axiosClient = axios.create({
	baseURL: 'https://api.sendgrid.com/v3',
	headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` }
});
const endpoint = '/marketing/contacts';
const { validateEmail } = require('./helpers/validations.cjs');

/**
 * Newsletter signup handler
 * @param event request from client-side
 * @returns {Object} response: {statusCode, body}
 */
exports.handler = async (event) => {
	const body = JSON.parse(event.body);

	try {
		validateEmail('Email', body.email);
	} catch (error) {
		return {
			statusCode: 403,
			body: JSON.stringify({
				message: error.message
			})
		};
	}

	try {
		/**
		 * Try to sign user up for the newsletter using SendGrid marketing contacts expected request schema
		 * @see https://sendgrid.api-docs.io/v3.0/contacts/add-or-update-a-contact
		 */
		await axiosClient.put(endpoint, {
			contacts: [{ email: body.email }]
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Thanks for signing up!'
			})
		};
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.group('Response error');
			console.error(error.response.data);
			console.error(error.response.status);
			console.error(error.response.headers);
			console.groupEnd();
		}
		// Wallow in pain
		console.error(error.config);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Whoops! Funky server error :('
			})
		};
	}
};
