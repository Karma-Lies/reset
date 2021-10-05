const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { validateEmail, validateLength } = require('./helpers/validations.cjs');

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const DETAILS_MIN_LENGTH = 10;
const DETAILS_MAX_LENGTH = 1e3;

exports.handler = async (event) => {
	console.log(event);
	if (!process.env.VITE_CONTACT_EMAIL) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Contact email is not defined'
			})
		};
	}

	const body = JSON.parse(event.body);

	try {
		validateLength('Name', body.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
	} catch (error) {
		return {
			statusCode: 403,
			body: JSON.stringify({
				message: error.message
			})
		};
	}

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
		validateLength('Details', body.details, DETAILS_MIN_LENGTH, DETAILS_MAX_LENGTH);
	} catch (error) {
		return {
			statusCode: 403,
			body: JSON.stringify({
				message: error.message
			})
		};
	}

	// Email schema forming
	const message = {
		to: process.env.VITE_CONTACT_EMAIL,
		from: 'team@resetpresents.com', // Verified sender
		subject: `${body.name} - submitted contact form`,
		text: `${body.details}\n\n- ${body.name} (${body.email})`
	};

	try {
		// Try to send the email
		await sgMail.send(message);
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'We received your message, thanks for reaching out!'
			})
		};
	} catch (error) {
		// Wallow in pain
		console.error(error);

		if (error.response) {
			console.error(error.response.body);
		}

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Whoops! Funky server error :('
			})
		};
	}
};
