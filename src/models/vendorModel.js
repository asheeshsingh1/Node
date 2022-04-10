const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const db = require('../db/connPostGres');
const jwt = require('jsonwebtoken')

//Vendor Data Model
const vendorSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isLength(value,6)){
                throw new Error('Password must be between 6 to 25 characters long');
            }
            if(validator.isEmpty(value)){
                throw new Error('Password can not be empty')
            }
            else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password should not be password!')
            }
            else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not Valid');
            }
        }
    },
    token:{
        type: String,
        required: true,
    }
})

vendorSchema.methods.toJSON = function(){
    const user = this
    const vendorSchemaObject = user.toObject()
    delete vendorSchemaObject.password
    return vendorSchemaObject;
}

vendorSchema.post('validate', async function (){
    const vendor = this
    if(vendor.isModified('password')){
        vendor.password = await bcrypt.hash(vendor.password,8);
    }
})

vendorSchema.statics.findByCredentials = async (email,password) =>{
    const vendor = await db.query(`select * from vendors where email = '${email}'`);
    if(!vendor.rowCount){
        throw new Error('Invalid Credentials');
    }
    const correctVendorCreds = await bcrypt.compare(password,vendor.rows[0].password)
    if(!correctVendorCreds){
        throw new Error('Invalid Credentials');
    }
    return vendor.rows[0];
}

vendorSchema.methods.generateJWT = async function(){
    const vendor = this
    const token = jwt.sign({_id: vendor.id.toString()}, process.env.JWT_TOKEN_HASH)
    vendor.token = token
    return token;
}

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor;