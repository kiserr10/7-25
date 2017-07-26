const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const queries = require('../db/queries');

function validUser(account){
	const validEmail = typeof account.email == 'string' && account.email.trim() != '';
	const validPassword = typeof account.password == 'string' && account.password.trim() != '';
	return validEmail && validPassword;
}

router.post('/signup', (req, res, next) =>{
	if(validUser(req.body)){
		queries.findUserByEmail(req.body.email)
		.then(account => {
			if(account) {
				next(new Error('Email In Use'));
			} else {
				const account = {
					email: req.body.email
				};
				bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					account.password = hash;
					queries
						.createUser(account)
						.then(account => {
							res.json(account);
						});
				});
			}
		});
	} else {
		next(new Error ('Invalid User'));
	}
});

router.post('/login', (req, res, next) =>{
	if(validUser(req.body)){
		queries.findUserByEmail(req.body.email)
		.then((account) => {
			if(account) {
				bcrypt.compare(req.body.password, account.password)
				.then((result) => {
					if(result){
						res.json({
							account,
							message: 'Andddddd We Are IN!!!'
						});
					} else {
						next(new Error ('Incorrect Password'));
					}
				});
			} else {
				next(new Error('Email Does Not Exist, Please Sign Up With A New Account'));
			}
		});
	} else {
		next(new Error('Information Not Valid'));
	}
});



module.exports = router;
