const services = require('../services/services');

const mealController = {};


mealController.getMeals = async(req,res) => {
    const id = req.query.id;
    
    try{
        const meal = await services.findMeals(id);
        res.send({status: 'ok', meal: meal});
    }catch(error){
        res.send({status: 'error', error: error});
    }
}

mealController.addMeal = async(req,res) => {
    const {title,cal,date,id,mealId} = req.body;
    
    const newMeal = {title: title, calorie: cal,mealId : mealId};
    const result = await services.addMeal(date,newMeal,id);
    
    res.send(result);
}

mealController.deleteMeal = async(req,res) => {
    
    const {date, mealId,cal,id} = req.body;
    
    const result = await services.deleteMeal(date,mealId,cal,id);
    
    res.send(result);
}

mealController.createDay = async(req,res) => {
    const {id,date} = req.body;
    const result = await services.addDay(id,date);
    console.log(result);
    res.send(result);
}

mealController.deleteDay = async(req,res) => {
    const {dayId, id} = req.body;
    
    const result = await services.deleteDay(dayId,id);
    
    res.send(result);
}

module.exports = mealController;