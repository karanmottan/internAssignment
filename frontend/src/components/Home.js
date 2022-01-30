import React, { useEffect, useState} from 'react';
import '../styles/home.css';
import {useSelector} from 'react-redux';
import Display from '../components/Display';
import {url} from '../constants/constants';
import {addDay} from '../apiCalls/Apicalls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


function Home(){

    const [meals,setMeals] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const id = useSelector((state) => state.user.id) || window.sessionStorage.getItem('id');
    const token = useSelector((state) => state.user.token) || window.sessionStorage.getItem('token');
    const getMeals = async() =>{
        const res = await fetch(`${url}/getmeals?id=${id}&token=${token}`);
        const temp = await res.json();
        
        setMeals({
            meals : temp.meal
        })
        
    }
    useEffect(()=>{
        //createMeal();
        getMeals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    },[]);

    const handleDayAdd = async(e) => {
        e.preventDefault();
        const date = e.target[0].value;
        console.log(date);
        
        const result = await addDay(token,id,date);
        if(result.status === 'ok'){
            getMeals();
        }
    }

    const handleDate = (date) => {
        
        setStartDate(date);
        console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)
    }

    return(
            
            <div className='Container'>
                {id && token ? 
                <div>
                    <h1 className='title'>Calorie Tracker 
                    <div className='logout'><a href='/' style={{textDecoration:'none'}} onClick={()=>{
                        window.sessionStorage.setItem("id",'');
                        window.sessionStorage.setItem("token",'');
                    }}>Logout</a></div>
                    </h1>
                    <div className='addDayArea'>
                        <form onSubmit={handleDayAdd} className='addDayForm'>
                            {/* <input type='date' required={true} max={new Date().toISOString().split('T')[0]}></input> */}
                            <DatePicker selected={startDate} onChange={handleDate} className='datepicker' maxDate={new Date()}/>
                            <button className='addDayButton'>Add Day</button>
                        </form>
                    </div>
                    {meals ? <Display meals={meals}/> : <h1></h1>}
                </div>
                : <h1>Please Login first</h1>    
            }
            </div>
        
    );
}

// function Display({meals}){
//     const [value, setValue] = useState(0);
//     function forceUpdate(){
//          // integer state
//         setValue(value + 1);

//     }
//     const items = meals.meals;
    
//     const token = useSelector((state) => state.user.token);
//     const deleteMeal = async(date,mealId,cal)=>{
//         const result = await fetch(`${url}/deletemeal`,{
//             method: 'POST',
//             headers:{
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify({
//                 date,  
//                 mealId,
//                 token,
//                 cal
//             })
//         }).then((res) => res.json());
        
//         return result;
//     }
    
//     const handleDelete = async(e) => {
//         const date = e.target.dataset.date;
        
//         const mealId = e.target.dataset.mealid;
//         const cal = e.target.dataset.cal;
//         const result = await deleteMeal(date,mealId,cal);
//         if(result.status === 'ok'){
//             items.some(function(a){
//                 if(a.createdAt === date){
//                     return a.items.some(function(b,i,bb){
//                         if(b._id === mealId){
//                             a.total -= b.calorie;
//                             bb.splice(i, 1);
//                             return true;
//                         }
//                     })
//                 }
                
//             });
//         forceUpdate();
//         }else{
//             alert('Delete Failed');
//         }
        
//     }

//     const createMeal = async(date,title,cal)=>{
//         const result = await fetch(`${url}/addmeal`,{
//             method: 'POST',
//             headers:{
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify({
//                 date,
//                 title : title,
//                 cal: cal,
//                 token
//             })
//         }).then((res) => res.json());
        
//         return result;
//     }


//     const handleAdd = async(e) => {
//         e.preventDefault();
//         console.log(e);
//         const date = e.target.dataset.date;
//         const title = e.target[0].value;
//         const cal = e.target[1].value;
//         const newMeal = {title: title, calorie: cal};
//         const result = await createMeal(date,title,cal);
//         if(result.status === 'ok'){
//             items.some(function(a){
//                 if(a.createdAt === date){
//                     a.items.push(newMeal);
//                     a.total += Number(cal);
//                 }
//             });
//         forceUpdate();
//         }else{
//             alert('Delete Failed');
//         }
//     }

//     return(
//         <div className='listContainer'>
            
//                 {items && items.map(item => {
//                     return(
//                         <div className='listItem' key={item._id} id={item._id}>
//                         <div className={`header ${item.total >= 1000 ? "red" : ""}`} >{item.createdAt}
//                         <div className='addArea'>
//                         <form className='inputForm' onSubmit={handleAdd} data-date={item.createdAt}>
//                             <input type='text' className='name' placeholder='Title' required></input>
//                             <input type='number' className='cal' placeholder='Calorie' required></input>
//                             <button>Add</button>
//                         </form>
//                         </div>
//                         </div>
//                         <div className='info'>
//                             {item.items && item.items.map((sin) => {
//                                 return(
//                                     <div key={sin._id} className='item'>
//                                     <div style={{marginTop:'1rem'}}>{sin.title}</div>
//                                     <div style={{marginTop:'3rem'}}>{sin.calorie}</div>
//                                     <div className='deleteButton' onClick={handleDelete} data-date={item.createdAt} data-mealid={sin._id} data-cal={sin.calorie} style={{marginTop:'4rem'}}>Delete</div>
//                                     </div>
                                    
//                                 )
//                             })}
                            
                            
//                         </div>
//                         </div>
//                     )                
//                 })}
            
//         </div>
//     )
    
// }

export default Home;