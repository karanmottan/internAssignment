import {deleteMeal,createMeal,deleteDay} from '../apiCalls/Apicalls';


export const handleToggle = (e) => {
    if(e.target.innerText === '+ Add Meal'){
        e.target.innerText = '-';
    }else{
        e.target.innerText = '+ Add Meal';
    }

    e.target.nextElementSibling.classList.toggle('activeArea');
}

export const handleOpen = (e) => {
    e.target.nextElementSibling.classList.toggle('activeArea');
}

export const handleDayDelete = async(e,items,changeState,id,token) => {

    if(window.confirm('Are you sure you want to delete this day')){
        const dayId = e.target.dataset.id
    
        const result = await deleteDay(dayId,id,token);
        console.log(result);
        if(result.status === 'ok'){
            var ind = items.findIndex(function(element){
                return element._id===dayId;
            });
            if(ind!==-1){
                items.splice(ind, 1)
                }

                changeState(items);
        }else alert('Not done');
    }
}

export const handleDelete = async(e,items,changeState,id,token) => {
    const date = e.target.dataset.date;
    
    const mealId = e.target.dataset.mealid;
    console.log(mealId);
    const cal = e.target.dataset.cal;
    
    const result = await deleteMeal(date,mealId,cal,token,id);
    if(result.status === 'ok'){
        items.some(function(a){
            if(a.createdAt === date){
                console.log(date);
                return a.items.some(function(b,i,bb){
                    if(b.mealId === mealId){
                        a.total -= b.calorie;
                        bb.splice(i, 1);
                        return true;
                    }
                })
            }
        
        });
        changeState(items);
    }else{
        alert('Delete Failed');
    }
    
}

export const handleAdd = async(e,items,changeState,id,token) => {
    e.preventDefault();
    
    const date = e.target.dataset.date;
    const title = e.target[0].value;
    const cal = e.target[1].value;
    
    const mealId = Math.random().toString(36).substr(2, 10);
    console.log(mealId);
    const newMeal = {title: title, calorie: cal, mealId: mealId};
    
    const result = await createMeal(date,title,cal,mealId,token,id);
    if(result.status === 'ok'){
        items.some(function(a){
            if(a.createdAt === date){
                a.items.push(newMeal);
                a.total += Number(cal);
            }
        });
        e.target[0].value = '';
        e.target[1].value = '';
    changeState(items);
    }else{
        alert('Add Failed');
    }
}

export const handleEdit = async(e,items,changeState,id,token) =>{
    e.preventDefault();
    
    const date = e.target.dataset.date;
    
    const mealId = e.target.dataset.mealid;
    console.log(mealId);
    const oldTitle = e.target.dataset.title;
    const newTitle = e.target[0].value || oldTitle;
    const oldCal = e.target.dataset.cal; 
    const newCal = Number(e.target[1].value) || Number(oldCal);
    console.log(oldCal + ' here ' + newCal);
    const deleteResult = await deleteMeal(date,mealId,oldCal,token,id);
    if(deleteResult.status === 'ok'){
        
        const newmealId = Math.random().toString(36).substr(2, 10);
        
        
        const newMeal = {title: newTitle, calorie: newCal, mealId: newmealId};
        const addResult = await createMeal(date,newTitle,newCal,newmealId,token,id);
        if(addResult.status === 'ok' && deleteResult.status === 'ok'){
            console.log('here');
            items.some(function(a){
                if(a.createdAt === date){
                    return a.items.some(function(b,i,bb){
                        if(b.mealId === mealId){
                            a.total -= Number(b.calorie);
                            
                            bb.splice(i, 1);
                            return true;
                        }
                    })
                }
            });
            items.some(function(a){
                if(a.createdAt === date){
                    a.items.push(newMeal);
                    
                    a.total += Number(newCal);
                }
            });
            e.target[0].value = '';
            e.target[1].value = '';
            changeState(items);
        
        }else{
            alert('Add Failed');
        }
    }
}