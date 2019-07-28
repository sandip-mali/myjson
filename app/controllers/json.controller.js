const pool = require('../models/queries.js');
const properties = require('../config/properties.js');
// create and save new json
exports.create = (req, res)=>{
    //validate request
    console.log(req.body, req.body.content);
    if(!req.body){
        return res.status(400).send({
            message : 'JSON content can not be empty'
        })
    }
    const {componentname, jsondata} = req.body;
    const strjsondata = JSON.stringify(jsondata);
    console.log(strjsondata);

    pool.query('INSERT INTO componentjson (componentname, jsondata ) VALUES ($1, $2) returning *', [componentname, strjsondata]).
    then (result => {
        //console.log(result.rows[0]);
        const id = result.rows[0].id;
        res.status(201).send(`User added with ID: ${id}. Data is available at ${properties.basepath}/${id}`);
    }).catch(err =>{
        if (err) {
            console.log(err);
            res.status(400).send(`Error occured while inserting data: ${err.message}`);
        } 
    });
    /*console.log('json', req.body);
    // create a json
    const json = new Note(req.body);

    // Save json in the database
    json.save()
    .then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(400).send({
            message:err.message ||'error occured while saving the json'
        });
    });*/
};

// retrieve and return all json from database
exports.findAll= (req,res )=>{
    pool.query('SELECT * FROM componentjson ORDER BY id ASC', (error, results) => {
        if (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrieving jsons'
            });
        }
        res.status(200).json(results.rows);
      });    
};

// find a single json with jsonId
exports.findOne = (req, res) => {
    const id = parseInt(req.params.jsonId);

    pool.query('SELECT * FROM componentjson WHERE id = $1', [id]).
    then(results =>{
        res.status(200).json(results.rows)
    }).catch(error =>{
        if (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while retrievin jsons'
            });
          }
    });    
   /* Note.findById(req.params.jsonId)
    .then(json =>{
        if(!json) {
            return res.status(404).send({
                message: 'JSON not found with id'
            });
        }
        res.send(json);
    }).catch(err =>{
        if(err.kind == ObjectId){
            return res.status(404).send({
                message: 'JSON not found with Id ' + req.params.jsonId
            })
        }
        return res.status(500).send({
            message: 'error retrieving json with id'+res.params.jsonId
        });
    }); */
};

/*
// update a json specified with jsonId in the request
exports.update = (req, res) => {
    // validating request
    if(!req.body.content){
        return res.status(400).send({
            message: 'JSON content can not be empty'
        });
    }
    // find json and update it with the request body content
    Note.findByIdAndUpdate(req.params.jsonId,{
        title: req.body.title || 'untitled JSON',
        content: req.body.content
    },{new:true})
    .then(json => {
        if(!json) {
            return res.status(404).send({
               message: 'JSON not found with id'+req.params.jsonId 
            });
        }
        res.send(json);
    }).catch(err =>{
        if(err.kind=== 'ObjectId'){
            return res.status(404).send({
                message: 'JSON not found with id'
            });
        }
        return res.status(500).send({
            message:'Error updating JSON with id'+req.params.jsonId
        });
    });
}; */

// Delete a json with specified json in the request.
exports.delete = (req,res) => {
    //console.log("within delete");
  const id = parseInt(req.params.jsonId);
  //console.log(id);
  pool.query('DELETE FROM componentjson WHERE id = $1', [id])
  .then(result => {
    res.status(200).send(`json deleted with ID: ${id}`);
  }).catch(error => {
      console.log(error);
    if (error) {
        throw error
      }
  });
    /*Note.findByIdAndRemove(req.params.jsonId)
    .then(josn => {
        if(!json){
            return res.status(400).send({
                message: "Json is not found with Id"
            })
        }
        return res.send({message:"josn deleted successfully"});
    }).catch(err => {
        if(err.kind==='ObjectId' || err.name === "NotFound"){
            return res.status(400).send({
                message:'json not found with id'+req.params.jsonId
            });
        }
        return res.status(500).send({
            message: 'Could not delete json with id '+req.params.jsonId
        });
    });*/
};