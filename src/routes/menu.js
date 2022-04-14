const express = require('express')
const menuRouter = express.Router()
const db = require('../db/connPostGres')
const Menu = require('../models/menuModel')
const auth = require('../middleware/auth')
const validRestraunt = require('../validators/customValidateRestraunt')

menuRouter.post('/menu',auth,async (req,res)=>{
    try {  
        const menu = new Menu(req.body)
        menu.owner = req.vendor._id.toString()
        const isValidRestraunt= await validRestraunt(menu.ref_restraunt,menu.owner);
        if(!(isValidRestraunt) || !menu.offerings.length){
            throw new Error('Bad Request')
        }
        await menu.validate()
        const queryInsertMenu = `insert into menu(_id,food_item_name,offerings,ref_restraunt,owner) values('${menu.id}','${menu.food_item_name}','${JSON.stringify(menu.offerings)}','${menu.ref_restraunt}','${menu.owner}');`;
        await db.query(queryInsertMenu);
        res.status(201).send({status:"Menu Created Successfuly",menu})
    } catch (e) {
        res.status(400).send({
          status:e.name,
          statusMessage:e.message
        })
    }
})

menuRouter.get('/menu',auth,async (req,res)=>{
  try{
    const menu = await db.query(`select * from menu where owner = '${req.vendor._id}';`)
    if(menu.rowCount == 0){
        throw new Error('No Record Found');
    }
    res.send({status:"Menu Fetched Successfuly",menu:menu.rows})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

menuRouter.get('/menu/:id',auth,async (req,res)=>{
  const _id = req.params.id;
  try{
    const menu = await db.query(`select * from menu where owner = '${req.vendor._id}' and _id = '${_id}';`)
    if(menu.rowCount == 0){
      throw new Error('No Record Found');
    }
    res.send({status:"Menu Item Fetched Successfuly",menu:menu.rows[0]})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

menuRouter.patch('/menu/:id',auth,async (req,res)=>{
  const reqKeys = Object.keys(req.body)
  const allowedKeys = ['food_item_name','offerings']
  const isValidKey = reqKeys.every((update)=> allowedKeys.includes(update))

  if(!isValidKey){
    return res.status(404).send({"errorMessage":"Invalid Key Present"})
  }
  try{
    const result = await db.query(`select * from menu where owner = '${req.vendor._id}' and _id = '${req.params.id}';`)
    if(result.rowCount == 0){
      throw new Error('No Such Menu Exists')
    }
    const menu = new Menu(result.rows[0])
    reqKeys.forEach((update) => menu[update] = req.body[update])
    if(!menu.offerings.length){
            throw new Error('Bad Request')
    }
    await menu.validate()
    await db.query(`update menu set food_item_name = '${menu.food_item_name}', offerings = '${JSON.stringify(menu.offerings)}' where _id = '${menu._id}';`)
    res.send({status:"Menu updated Successfuly",menu})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

menuRouter.delete('/menu/:id',auth, async (req,res)=>{
  try{
    const result = await db.query(`select * from menu where owner = '${req.vendor._id}' and _id = '${req.params.id}';`)
    if(result.rowCount == 0){
        throw new Error('No Such Menu item Exists')
    }
    const menu = result.rows[0]
    await db.query(`delete from menu where _id = '${menu._id}';`)
    res.send({status:"Menu Deleted Successfully",menu})
  }catch(e){
    res.status(400).send({
        status:e.name,
        statusMessage:e.message
      })
  }
})

module.exports = menuRouter;