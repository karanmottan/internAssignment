const User = require('../schema/user');
const Meal = require('../schema/meal');
const services = {};

services.findUser = async(email) => {
    
    const user = await User.findOne({email}).lean();

    return user;
}

services.createUser = async(email,password) => {

    try{
        const user = await User.create({
            email,
            password
        });
        return ({status: 'ok'});
    }catch(error){
        return ({status:'error' , error: error});
    }
}

services.findMeals = async(id) => {
    const meal = await Meal.find({user : id}).lean().sort({createdAt : 1});
    return meal;
}


services.findMeal = async(id, date) => {
    const meal = await Meal.findOne({user: id, createdAt: date}).lean();

    return meal;
}

services.findMealByDate = async(date) => {
    const meal = await Meal.findOne({createdAt: date}).lean();

    return meal;
}

services.addDay = async(id,date) => {
    
    const t = await services.findMeal(id,date);
    if(t) {
        return ({status: 'ok'});
    }
    try{
        
        const meal = await Meal.create({
            user: id,
            createdAt: date,
            
            total : Number(0)
        });
        return({status: 'ok'});
    }catch(error){
        console.log(error);
        return({status: 'error',error: error});
    }
}

services.addMeal = async(date,newMeal,id) => {
    
    try{
        const meal = await services.findMeal(id,date);
        
        if(meal){ 
            const _id = meal._id;
            
            try{   
                await Meal.findOne({_id: _id})
                    .then((doc) => {
                        doc.total += Number(newMeal.calorie);
                        doc.items.push(newMeal);
                        doc.save();
                        
                    }).catch((error) => {
                        console.log(error);
                        return {status: 'error', error: error};
                    });
                    return ({status: 'ok'});    
            }catch(error){
                console.log(error);
                return {status: 'error', error: error};
            }
        }else{
            try{
                const meal = await Meal.create({
                    user: id,
                    createdAt: date,
                    items: newMeal,
                    total : calorie
                });
                return {status: 'ok'};
            }catch(error){
                console.log(error);
                return {status: 'error', error: error};
            }
        }
    }catch(error){
        return {status: 'error', error: error};
    }    
    
}

services.deleteDay = async(dayId,id) => {
    try{
        Meal.deleteOne({_id: dayId,user:id})
        .then()
        .catch((err) => console.log(err))
        return ({status: 'ok'});
    }catch(error){
        return ({status: 'error', error:error});
    }
}

services.deleteMeal = async(date,mealId,cal,id) => {
    try{
        console.log(mealId);
        const meal = await services.findMeal(id,date);
        if(meal){
            const _id = meal._id;
            
            try{
                //console.log(meal[0]);
                Meal.findOne({_id: _id})
                    .then((doc) => {
                        var ind = -1;
                        ind = doc.items.findIndex(function(elem){
                            return elem.mealId === mealId;
                        });
                        console.log(ind);
                        if(ind != -1){
                            if(doc.total >= cal){
                                console.log(`total ${doc.total} and cal ${cal}`);
                                doc.total -= Number(cal);
                            }
                            doc.items.splice(ind,1);
                            doc.save();
                        }
                        
                        return {status: 'ok'};
                    }).catch((error) => {
                        console.log(error);
                        return {status: 'error', error: error};
                    });
                return {status: 'ok'};
                
            }catch(error){
                return {status: 'error', error: error};
            }
        }else{
            return {status: 'error',error: 'Meal does not exist'};
        }
    }catch(error){
        return {status: 'error', error: error};
    }
}






module.exports = services;