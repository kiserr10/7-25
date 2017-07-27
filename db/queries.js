const knex = require('./knex');

module.exports = {
	findUserByEmail: function(email){
		return knex('account').where('email', email).first();
	},
	createUser: function(account) {
		return knex('account').insert(account, '*').then(accounts =>{
			return accounts[0];
		});
	},

	pet: {

		getAll(){
			return knex('pet');
		},
		getOne(id){
			return knex('');
		},
		getPetById(id){
			return knex('pet').where('id', id).first();
		},
		addPet(pet){
			return knex('pet').insert(pet, '*').then(pets =>{
				return pets[0];
			});
		},
		delete(id){
			return knex('pet').where('id', id).del();
		},
		editPet(id, pet){
			return knex('pet').where('id', id).update(pet, '*');
		}
	}
};
