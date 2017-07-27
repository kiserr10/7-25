const express = require('express');
const router = express.Router();
const queries = require('../db/queries');


function isValidId(req, res, next){
	if(!isNaN(req.params.id)) return next();
	next(new Error('Invalid ID'));
}
function validPet(pet){
	const hasTitle = typeof pet.name == 'string' && pet.name.trim() != '';
	return hasTitle;
}

router.get('/', (req, res) =>{
	queries.pet.getAll().then(pets =>{
		res.json(pets);
	});
});

router.get('/:id', isValidId, (req, res, next) => {
	queries.pet.getPetById(req.params.id).then(pet =>{
		if(pet){
			res.json(pet);
		} else {
			next();
		}
	});
});

router.post('/', (req, res, next) =>{
	if(validPet(req.body)){
		queries.pet.addPet(req.body).then(pets =>{
			res.json(pets);
		});
	} else {
		next(new Error('Invalid Pet'));
	}
});

router.delete('/:id', isValidId, (req, res) =>{
	queries.pet.delete(req.params.id).then(() =>{
		res.json({
			deleted: true
		});
	});
});

router.put('/:id', isValidId, (req, res, next) =>{
	if(validPet(req.body)){
		queries.pet.editPet(req.params.id, req.body).then(pet =>{
			res.json(pet[0]);
		});
	} else {
		next(new Error('Invalid Pet'));
	}
});


module.exports = router;
