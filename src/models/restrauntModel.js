const mongoose = require('mongoose')

const openState = Object.freeze({
  Open: 'OPEN',
  Close: 'CLOSED'
});

const restrauntSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true
    },
    open:{
        type: String,
        enum: Object.values(openState),
        default: openState.Close,
    },
    address:{
        type: String,
        required: true,
        trim : true
    },
    contact:{
        type: Number,
        trim: true,
        required: [true, 'Contact required'],
        validate(value){
            if(value > 9999999999){
                throw new Error('Invalid Contact');
            }
            if(value.toString().length < 10 || value.toString().length > 10){
                throw new Error('Invalid Contact');
            }
        }

    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    }
})

const Restraunt = mongoose.model('Restraunt',restrauntSchema)

module.exports = Restraunt;