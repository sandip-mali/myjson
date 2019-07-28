module.exports =(app) => {

    const controller = require('../controllers/json.controller.js');

//create new json
app.post('/myjson', controller.create);

// retrieve new myjson
app.get('/myjson', controller.findAll);

// retrieve a single one json with jsonId
app.get('/myjson/:jsonId', controller.findOne);

// update a json with jsonId
//app.put('/myjson/:jsonId', controller.update);

// delete a json
app.delete('/myjson/:jsonId', controller.delete);

}