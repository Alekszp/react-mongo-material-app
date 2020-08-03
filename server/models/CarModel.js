const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bodyTypes: {
        type: Array,
        default: [],
        required: true
    },
    input1: {
        type: String,
        default: '',
        required: true
    },
    input2: {
        type: String,
        default: '',
        required: true
    }
}, {
    versionKey: false,
    collection: 'cars'
})

module.exports = mongoose.model('cars', CarSchema)