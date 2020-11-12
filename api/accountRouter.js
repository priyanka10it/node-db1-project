const express = require('express');

const router = express.Router();

const db = require('../data/dbConfig.js');

//CREATE
function insert(account){
    return db('accounts').insert(account)
}
router.post('/',(req,res)=>{
    insert(req.body)
    .then(res.status(200).json({message:"Account Added"}))
    .catch(error=>{
        res.status(500).json(error);
    })

})

//READ
function get(){
    return db('accounts');
}

router.get('/',(req,res)=>{
    get()
    .then(accounts=>{
        res.status(200).json(accounts)
    })
    .catch(error=>{
        res.status(500).json(error);
    })
})

//UPDATE
function update(id,changes){
    return db('accounts').where({id}).update(changes)
}

router.put('/:id',(req,res)=>{
    update(Number(req.params.id), req.body)
    .then(res.status(200).json({message:"Account updated"}))
    .catch(error=>{
        res.status(500).json(error);
    })
})

//DELETE
function remove(id){
    return db('accounts').where({id}).del();
}
router.delete('/:id',(req,res)=>{
    remove(Number(req.params.id))
    .then(res.status(200).json({message:"Account deleted"}))
    .catch(error=>{
        res.status(500).json(error);
    })
})

module.exports=router;