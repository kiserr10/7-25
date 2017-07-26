// Update with your config settings.

const dotenv = require('dotenv').config();


module.exports = {
	development: {
		client: 'postgresql',
		connection: 'postgres://localhost/pets-warmup'
	},
	production: {
		client: 'postgresql',
		connection: process.env.DATABASE_URL + '?ssl=true'
	}
};
