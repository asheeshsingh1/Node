const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    food_item_name:{
        type: String,
        trim : true,
        required: true
    },
    offerings:[{
            quantity:{
                type:Number,
                required:true
            },
            weight:{
                type:Number,
                required:true
            },
            availability:{
                type:Boolean,
                required: true,
                default: false
            }
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    },
    ref_restraunt:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restraunt'
    }
})

const Menu = mongoose.model('Menu',menuSchema)

module.exports = Menu;