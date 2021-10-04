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
			body: 'process.env.CONTACT_EMAIL must be defined'
		};
	}

	const body = JSON.parse(event.body);

	try {
		validateLength('body.name', body.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
	} catch (error) {
		return {
			statusCode: 403,
			body: error.message
		};
	}

	try {
		validateEmail('body.email', body.email);
	} catch (error) {
		return {
			statusCode: 403,
			body: error.message
		};
	}

	try {
		validateLength('body.details', body.details, DETAILS_MIN_LENGTH, DETAILS_MAX_LENGTH);
	} catch (error) {
		return {
			statusCode: 403,
			body: error.message
		};
	}

	const message = {
		to: process.env.VITE_CONTACT_EMAIL,
		from: 'team@resetpresents.com', // Verified sender
		subject: `${body.name} - submitted contact form`,
		text: `${body.details}\n\n- ${body.name} (${body.email})`
	};
	console.log('message', message);

	try {
		await sgMail.send(message);
		return {
			statusCode: 200,
			body: JSON.stringify({
				data: 'Message sent!'
			})
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: error
		};
	}
};
