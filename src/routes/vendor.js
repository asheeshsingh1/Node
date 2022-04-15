const express = require('express')
const vendorRouter = express.Router()
const db = require('../db/connPostGreSQL')
const Vendor = require('../models/vendorModel')
const auth = require('../middleware/auth')

//Vendor Routes
vendorRouter.post('/vendor',async (req,res)=>{
    try {  
        const vendor = new Vendor(req.body)
        await vendor.generateJWT()
        await vendor.validate()
        const queryInsertVendor = `insert into vendors(_id,name,email,password,token) values('${vendor._id}','${vendor.name}','${vendor.email}','${vendor.password}','${vendor.token}');`;
        await db.query(queryInsertVendor);
        res.status(201).send({status:"Success",vendor})
    } catch (e) {
        res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

vendorRouter.post('/vendor/login',async (req, res)=>{
    try{
      const result = await Vendor.findByCredentials(req.body.email,req.body.password)
      const vendor = new Vendor(result);
      await vendor.generateJWT()
      const queryUpdateToken = `update vendors set token = '${vendor.token}' where email = '${vendor.email}';`;
      await db.query(queryUpdateToken);
      res.send({status:"Logged in Successfully",vendor})
    }catch(e){
      res.status(400).send({
          message:"Invalid Credentials"
        })
    }
})

vendorRouter.get('/vendor/myprofile',auth, async (req,res)=>{
  const vendor = new Vendor(req.vendor);
  res.send({status:"Fetched Consumer Data Successfully",vendor:vendor})
})

vendorRouter.post('/vendor/logout',auth,async (req, res)=>{
    try{
        const vendor = new Vendor(req.vendor)
        vendor.token = undefined
      await db.query(`update vendors set token = null where _id = '${vendor._id}';`)
      res.send({status:"Logged out Successfully",vendor})
    }catch(e){
      res.status(500).send({
          message:"Logout Failed"
        })
    }
})

vendorRouter.patch('/vendor/myprofile',auth, async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['name','password']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    const vendor = new Vendor(req.vendor)
    reqKeys.forEach((update) => vendor[update] = req.body[update])
    await vendor.validate()
    await db.query(`update vendors set name = '${vendor.name}', password = '${vendor.password}' where _id = '${vendor._id}';`)
    res.send({status:"Vendor Updated Successfully",vendor})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

vendorRouter.delete('/vendor/myprofile',auth, async (req,res)=>{
  try{
    const vendor = new Vendor(req.vendor)
    await db.query(`delete from vendors where _id = '${vendor._id}';`)
    res.send({status:"Vendor Deleted Successfully",vendor})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = vendorRouter;