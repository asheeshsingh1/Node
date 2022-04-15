const express = require('express')
const restrauntRouter = express.Router()
const db = require('../db/connPostGreSQL')
const Restraunt = require('../models/restrauntModel')
const auth = require('../middleware/auth')

//Restraunt Routes
restrauntRouter.post('/restraunt',auth,async (req,res)=>{
    try {  
        const restraunt = new Restraunt(req.body)
        restraunt.owner = req.vendor._id.toString()
        await restraunt.validate()
        const queryInsertRestraunt = `insert into restraunts(_id,name,open,address,owner,contact) values('${restraunt.id}','${restraunt.name}','${restraunt.open}','${restraunt.address}','${restraunt.owner.toString()}','${restraunt.contact}');`;
        await db.query(queryInsertRestraunt);
        res.status(201).send({status:"Restraunt Created Successfuly",restraunt})
    } catch (e) {
        res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

restrauntRouter.get('/restraunt',auth,async (req,res)=>{
  try{
    const queryRestraunts = `select * from restraunts where owner = '${req.vendor._id}';`
    const restraunt = await db.query(queryRestraunts)
    if(restraunt.rowCount == 0){
        throw new Error('No Restraunt Onboarded')
    }
    res.send({status:"Restraunts fetched Successfuly",restrauntDetails:restraunt.rows})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

restrauntRouter.get('/restraunt/:id',auth,async (req,res)=>{
  try{
    const queryRestraunts = `select * from restraunts where owner = '${req.vendor._id}' and _id = '${req.params.id}';`
    const restraunt = await db.query(queryRestraunts)
    if(restraunt.rowCount == 0){
        throw new Error('No Restraunt Onboarded')
    }
    res.send({status:"Restraunt fetched Successfuly",restrauntDetails:restraunt.rows})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

restrauntRouter.patch('/restraunt/:id',auth,async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['open','contact','address']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    const result = await db.query(`select * from restraunts where owner = '${req.vendor._id}' and _id = '${req.params.id}';`)
    if(result.rowCount == 0){
      throw new Error('No Such Restraunt Onboarded')
    }
    const restraunt = new Restraunt(result.rows[0])
    reqKeys.forEach((update) => restraunt[update] = req.body[update])
    await restraunt.validate()
    await db.query(`update restraunts set open = '${restraunt.open}', contact = '${restraunt.contact}', address = '${restraunt.address}' where _id = '${restraunt._id}';`)
    res.send({status:"Restraunt updated Successfuly",restraunt})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

restrauntRouter.delete('/restraunt/:id',auth, async (req,res)=>{
  try{
    const result = await db.query(`select * from restraunts where owner = '${req.vendor._id}' and _id = '${req.params.id}';`)
    if(result.rowCount == 0){
        throw new Error('No Such Restraunt Onboarded')
    }
    const restraunt = result.rows[0]
    await db.query(`delete from restraunts where _id = '${restraunt._id}';`)
    res.send({status:"Restraunt Deleted Successfully",restraunt})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = restrauntRouter;