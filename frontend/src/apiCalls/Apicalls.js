import {url} from '../constants/constants';


export const LoginCall = async(email,password) => {
    
    const result = await fetch(`${url}/login`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json());
    return result;
}

export const RegisterCall = async(email,password)=>{
    const result = await fetch(`${url}/register`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json());

    return result;
}

export const deleteMeal = async(date,mealId,cal,token,id)=>{
    const result = await fetch(`${url}/deletemeal`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            date,  
            mealId,
            token,
            cal,
            id
        })
    }).then((res) => res.json());
    
    return result;
}

export const addDay = async(token,id,date) => {
    const result = await fetch(`${url}/createday`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            token,
            id,
            date
        })
    }).then((res) => res.json());
    return result;
}

export const createMeal = async(date,title,cal,mealId,token,id)=>{
    
    const result = await fetch(`${url}/addmeal`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            date,
            title : title,
            cal: cal,
            mealId: mealId,
            token,
            id
        })
    }).then((res) => res.json());
    
    return result;
}

export const deleteDay = async(dayId,id,token) => {
    const result = await fetch(`${url}/deleteday`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            dayId,
            token,
            id
        })
    }).then((res) => res.json());
    
    return result;
}