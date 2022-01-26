const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    items:[
        {
            title: String,
            calorie: Number,
            mealId: String
        }
    ],
    total:{
        type: Number
    }
    
},{collection: 'meals'});

const model = mongoose.model('MealSchema', MealSchema);

module.exports = model;