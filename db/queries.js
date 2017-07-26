const knex = require('./knex');

module.exports = {
	findUserByEmail: function(email){
		return knex('account').where('email', email).first();
	},
	createUser: function(account) {
		return knex('account').insert(account, '*').then(accounts =>{
			return accounts[0];
		});
	}
};
